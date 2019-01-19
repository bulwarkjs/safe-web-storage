![](https://github.com/victorvoid/safe-web-storage/blob/master/safe-web-storage.svg)

safe-web-storage is a safe way for you to work with web storage using a purer functional style.

## Installation

`safe-web-storage` is available from `npm`.

```
$ npm install safe-web-storage -S
```

## Why Safe ?

The idea is to use  data structure called [Result](https://folktale.origamitower.com/api/v2.3.0/en/folktale.result.html) from [folktale](https://folktale.origamitower.com/) that models the result of operations that may fail. You don't need to check if the value exists, because it will only come in `.map` when you have it.

### Features

- Fallback (in-memory implementation if default browser implementations aren't available).
- Prefix (Set a default prefix)
- `JSON.parse` by default when you get item
- `JSON.stringify` by default when you set item

## Overview


```js
const safestorage = require('safe-web-storage')
const storage = safestorage({ prefix: 'safe' })

storage
  .local
  .setItem('name', 'victor igor') //saved on 'safe-name' on localStorage
  .map(_ => console.log('saved: ', _)) //{name: "name", value: "victor igor"}

storage
  .local
  .getItem('name')
  .map(console.log) //victor igor
  
storage
  .local
  .key(0)
  .map(console.log) //safe-name
  
storage
  .local
  .removeItem('name')
  .map(() => console.log('removed'))
  
storage
  .local
  .clear() /clean localStorage
```

## How it works

You can use to session or local storage.

```js
const safestorage = require('safe-web-storage')
const storage = safestorage({ prefix: 'safe' })
const local = storage.local
const session = storage.session

local
  .setItem('name', 'victor igor') //saved on 'safe-name' on localStorage
  .map(_ => console.log('saved: ', _)) //{name: "name", value: "victor igor"}

session
  .setItem('name', 'victor igor') //saved on 'safe-name' on localStorage
  .map(_ => console.log('saved: ', _)) //{name: "name", value: "victor igor"}
```

## More examples

### Picking up value when you have not saved

```js
const safestorage = require('safe-web-storage')
const storage = safestorage()
const local = storage.local

const nameFormatted = local.getItem('name').getOrElse('Victor') //victor
```

### Mapping values

```js
const safestorage = require('safe-web-storage')
const storage = safestorage()
const local = storage.local

local
  .setItem('age', 20)
  
  
const maxAge = local.getItem('age')
  .map(age => age + 10)
  .getOrElse(10) //30
```

## See too

- [safedom](https://github.com/victorvoid/safedom)

License
-------

The code is available under the [MIT License](LICENSE.md).
