
function promisify( name, etcd ) {
  return function() {
    return new Promise( ( resolve, reject ) => {
      console.log( name )
      etcd[ name ].call( etcd, ...arguments, function( err, res ) {
        if ( err ) {
          reject( err )
          return
        }

        resolve( res )
      })
    })
  }
}

var manifest = [
  'get',
  'set',
  'del'
]

var EtcdPromise = function( etcd ) {
  if ( !( this instanceof EtcdPromise ) ) {
    return new EtcdPromise( etcd )
  }

  manifest.forEach( method => {
    console.log( 'setting', method )
    this[ method ] = promisify( method, etcd )
  })
}

module.exports = EtcdPromise
