var page = require( 'webpage' ).create();

page.onResourceReceived = function ( response )
{
    if ( response.stage === 'end' )
    {
        console.log( JSON.stringify( response, undefined, 2 ) );
    }
};

page.open( 'http://localhost:8888', function ( status )
{
    if ( status === 'success' )
    {
        console.log( 'All done' );
        phantom.exit();
    }
    else
    {
        console.log( 'Could not open page' );
        phantom.exit( 1 );
    }
} );
