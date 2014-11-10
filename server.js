(
    function ()
    {
        "use strict";

        var fs = require( 'fs' );
        var http = require( 'http' );
        var url = require( 'url' );

        var rootDir = './';

        http.createServer( function ( request, response )
        {
            var urlObj = url.parse( request.url, true, false );

            fs.readFile( rootDir + urlObj.pathname, function ( err, data )
            {
                if ( err )
                {
                    response.writeHead( 404 );
                    response.end( JSON.stringify( err ) );
                    return;
                }
                else
                {
                    response.writeHead(200);
                    response.end(data);
                }
            } );
        } ).listen(8888);

    }()
);
