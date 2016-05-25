
import test from 'ava'
import Etcd from 'etcdjs'
import EtcdPromise from '../'

var etcd = Etcd( process.env.ETCD_HOST )

function delay( ms ) {
  return {
    then: cb => setTimeout( cb, ms )
  }
}

test( 'should get a value from the store', async t => {
  const store = EtcdPromise( etcd )

  await store.set( 'foo', 'bar' )
  let res = await store.get( 'foo' )
  t.is( res.node.value, 'bar' )
  await store.del( 'foo' )
})

test( 'should set a value in the store', async t => {
  const store = EtcdPromise( etcd )

  await store.set( 'quux', 'bar' )
  let res = await store.set( 'quux', 'baz' )
  t.is( res.prevNode.value, 'bar' )
  t.is( res.node.value, 'baz' )
  await store.del( 'quux' )
})

test( 'should delete a value from the store', async t => {
  const store = EtcdPromise( etcd )

  await store.set( 'fred', 'bar' )
  await store.del( 'fred' )
  let res = await store.get( 'fred' )
  t.is( typeof res, 'undefined' )
})
