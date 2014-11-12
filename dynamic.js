(
    // serve up dynamic content

    function ()
    {
        // this code returns a web page with a word, ignoring the path

        "use strict";

        var http = require( 'http' );
        var _ = require( 'lodash' );

        var words = [ 'fish', 'milkshake', 'garlic' ];

        http.createServer( function ( request, response )
        {
            response.setHeader( "Content-Type", "text/html" );
            response.writeHead( 200 );
            response.write( '<html><head><title>Random Inspiration</title></head>' );
            response.write( '<body>' );

            var w = words[_.random(words.length - 1)];

            response.write( '\n<h1>' );
            response.write( w );
            response.write( '</h1>' );

            response.end('</body></html>');

        } ).listen( 8888 );
    }() );
