(
    // serve up dynamic content

    function ()
    {
        // this code returns a web page with a word, ignoring the path

        "use strict";

        var http = require( 'http' );
        var rword = require('./get-word.js');

        http.createServer( function ( request, response )
        {
            response.setHeader( "Content-Type", "text/html" );
            response.writeHead( 200 );
            response.write( '<html><head><title>Random Inspiration</title></head>' );
            response.write( '<body>' );

            var w = rword.getWord();

            response.write( '\n<h1>' );
            response.write( w );
            response.write( '</h1>' );

            response.end('</body></html>');

        } ).listen( process.env.PORT || 8888 );
    }() );
