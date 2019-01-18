const { Ok, Error } = require('folktale/result')

const _tryCatch = f => {
  try {
    return Ok(f())
  } catch (e) {
    return Error(e)
  }
}

module.exports = {
  _tryCatch
}
