(
    // serve up dynamic content

    function ()
    {
        // this code returns a web page with a word, ignoring the path

        "use strict";

        var http = require( 'http' );
        var fs = require( 'fs' );

        // var _ = require( 'lodash' );
        // _.templateSettings.interpolate = /{{([\s\S]+?)}}/g; // angular format

        var rword = require( './get-word.js' );
        var config = require( './process.js' );

        http.createServer( function ( request, response )
        {
            var word = rword.getWord();

            response.setHeader( "Content-Type", "text/html" );
            response.writeHead( 200 );
            response.write( '<html>\n' );
            response.write( '<head>\n' );
            response.write( '<title>Random Inspiration</title>\n' );
            response.write( '<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />\n' );
            response.write( '<body>\n' );

            // start container
            response.write( '<div class="container">\n' );

            // heading
            response.write( '<div class="row">\n' );
            response.write( '<div class="col-xs-12">\n' );

            response.write( '<h1 class="text-center">Random Inspiration</h1>' );

            response.write( '</div>\n' );
            response.write( '</div>\n' );

            // content
            response.write( '<div class="row">\n' );
            response.write( '<div class="col-xs-12">\n' );

            response.write( '<h2 class="text-center">' );
            // response.write( _.template( '<a href="http://www.thefreedictionary.com/{{ word }}" target="_blank">{{ word }}</a>',
            // {
            //     word: word
            // } ) );

            response.write( word );
            response.write( '</h2>\n' );

            response.write( '</div>\n' );
            response.write( '</div>\n' );

            // button
            response.write( '<div class="row">\n' );
            response.write( '<div class="col-xs-12 text-center">\n' );

            response.write( '<div class="btn btn-primary" onclick="location.reload();">' );
            response.write( 'again' );
            response.write( '</div>\n' );

            response.write( '</div>\n' );
            response.write( '</div>\n' );

            // end container
            response.write( '</div>\n' );

            //--------------------- config

            response.write( '<pre>\n' );
            response.write(JSON.stringify(config.getConfig(), null, 4));
            response.write( '</pre>\n' );

            response.write( '</body>\n' );

            // end
            response.end( '</html>\n' );

        } ).listen( process.env.PORT || 8888 );
    }() );
