var gameSparks = new require('./node_modules/gamesparks-node/GameSparks.js');
try {
  var async      = require( "./node_modules/async" );
} catch( err ) {
  console.log( "FATAL: Please run \"npm install async\" before trying to run this script." );
  process.exit(1);
}
function onMessage( msg ) {
  console.log( "-------------------------------------------------------------" );
  console.log( "received a message:", JSON.stringify( msg, null, 2 ) );
}
gameSparks.initPreviewListener("b313224GR9BB", "S04jTWsern5iJVCvqaRfVgqV32hA9X4m", 10, onMessage, app, function( err ) {
  console.log( "initializing preview listener:", err );
  process.exit( 1 );
});

function app() {
  console.log( "Gamesparks ready!" );

  async.waterfall([
    function( cb ) {
      // Authenticate
      gameSparks.sendAs( null, ".AuthenticationRequest", {
	userName: "test1",
	password: "12345"
      }, function( err, user ) {
	if ( err ) return cb( err );
	else return cb( null, user );
      });
    },
    function( user, cb ) {
      // Get the user's account details
      gameSparks.sendAs( user.userId, ".AccountDetailsRequest", {}, function( err, res ) {
	if ( err ) return cb( err );
	console.log( "account details:", JSON.stringify( res, null, 2 ) );
	cb( null, user );
      });
    },
  ], function( err ) {
    if ( err ) console.log( err );

    // If you want to listen for messages back from the Gamesparks server, then do
    // not exit() here.  Just sit around and wait ...
    
    //process.exit(0);
  });
  
}