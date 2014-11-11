(
    // scraper

    function ()
    {
        // this code reads a website & outputs the content received

        "use strict";

        var http = require( 'http' );

        // url
        var site = {
            hostname: 'codeindeed.com',
            port: '80',
            path: '/index.html'
        };

        var handleResponse = function ( response )
        {
            var data = '';

            // accumulate the content as it comes in
            response.on( 'data', function ( chunk )
            {
                data += chunk;
            } );

            // dump the content
            response.on( 'end', function ()
            {
                console.log( data );
            } );
        };

        // start the job, making the request
        http.request( site, function ( response )
        {
            handleResponse( response );
        } ).end();
    }()
);
