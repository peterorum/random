( function ()
{
    "use strict";

    var fs = require( 'fs' );

    // based on 2of12.txt & neol2007.txt from http://wordlist.aspell.net/12dicts
    // for further copyright, see agid.txt

    var dict = "words.txt";

    var readWords = function ( callback )
    {
        fs.readFile( dict,
        {
            encoding: 'utf8',
            flag: 'r'
        }, function ( err, data )
        {
            var words = data.split( /\n/ );

            callback( words );
        } );
    };

    var chooseWord = function ( words )
    {
        var count = words.length;

        var r = Math.floor( Math.random() * count );

        console.log( words[ r ] );
    };

    readWords( chooseWord );

}() );
