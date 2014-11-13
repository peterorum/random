( function ()
{
    "use strict";

    var fs = require( 'fs' );

    // based on 2of12.txt & neol2007.txt from http://wordlist.aspell.net/12dicts
    // for further copyright, see agid.txt

    var dict = "./words.txt";

    // dummy init
    var words = [ 'fish' ];

    // load all words
    var readWords = function ()
    {
        fs.readFile( dict,
        {
            encoding: 'utf8',
            flag: 'r'
        }, function ( err, data )
        {
            words = data.split( /\n/ );
        } );
    };

    // init loading of the words
    readWords();

    //--------- exports

    exports.getWord = function ()
    {
        var count = words.length;

        var r = Math.floor( Math.random() * count );

        return ( words[ r ] );
    };

}() );
