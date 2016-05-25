
# etcdjs-promise

> Promisifies get, set and delete operations for etcd

## Install

Requires [etcdjs](github.com/mafintosh/etcdjs) as a backend.

```sh
npm i -S etcdjs-promise etcdjs
```

## Usage

```js
const Etcd = require( 'etcdjs' )
const Store = require( 'etcdjs-promise' )

const etcd = Etcd()
const store = Store( etcd )

store.set( 'foo', 'bar' )
  .then( res => {
  })
  .catch( err => {
  })

store.get( 'foo' )
  .then( res => {
    console.log( res.node.value )
  })

store.del( 'foo' )
```

## License

MIT
