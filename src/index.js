const { fromNullable } = require('folktale/maybe')
const { Ok, Error } = require('folktale/result')
const { _tryCatch } = require('./utils')

function Storage({ storage, getPrefix }) {
  let inMemoryStorage = {}

  function isStorageSupported() {
    return _tryCatch(() => {
      const testKey = 'key'
      storage.setItem(testKey, testKey)
      storage.removeItem(testKey)
    })
  }

  function clear() {
    return isStorageSupported()
      .map(() => storage.clear())
      .orElse(() => {
        inMemoryStorage = {}
      })
  }

  function getItem(name) {
    return isStorageSupported()
      .chain(() => {
        const value = storage.getItem(getPrefix(name))
        return fromNullable(value).map(JSON.parse)
      })
      .orElse(() => {
        if (inMemoryStorage.hasOwnProperty(name)) {
          return Ok(inMemoryStorage[name])
        }
        return Error(`property '${getPrefix(name)}-${name}' not found`)
      })
  }

  function key(index) {
    return isStorageSupported()
      .chain(() => fromNullable(storage.key(index)))
      .orElse(() => Object.keys(inMemoryStorage)[index] || null)
  }

  function removeItem(name) {
    return isStorageSupported()
      .map(() => storage.removeItem(getPrefix(name)))
      .orElse(() => {
        delete inMemoryStorage[name]
      })
  }

  function setItem(name, value) {
    return isStorageSupported()
      .orElse(() => {
        inMemoryStorage[name] = JSON.stringify(value)
        return Error('Saved on storage fallback')
      })
      .chain(() => {
        const namePrefixed = getPrefix(name)
        const saveOnStorage = () => {
          storage.setItem(namePrefixed, JSON.stringify(value))
          return { name, value }
        }

        return _tryCatch(saveOnStorage)
      })
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key
  }
}

function safestorage ({ prefix = 'safe' }) {
  const getPrefix = (name) => `${prefix}-${name}`

  return {
    local: Storage({ storage: window.localStorage, getPrefix }),
    session: Storage({ storage: window.sessionStorage, getPrefix }),
    createDefaultStorage: () => Storage({}, getPrefix),
    Storage
  }
}

module.exports = safestorage
