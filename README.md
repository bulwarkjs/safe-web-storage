# safe web storage

safe-web-storage is a safe way for you to work with web storage using a purer functional style.

## Installation

`safe-web-storage` is available from `npm`.

```
$ npm install safe-web-storage -S
```

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


License
-------

The code is available under the [MIT License](LICENSE.md).
