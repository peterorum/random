( function ()
{
    "use strict";

    // osx dictionary
    var dict = "/usr/share/dict/words";

    var fs = require( 'fs' );

    var writeWord = function (word)
    {
        fs.open( 'words.txt', 'a', function ( err, fd )
        {
            fs.write( fd, word + '\n', null, null, function ( err )
            {
                fs.close( fd );
            } );
        } );
    };

    writeWord('fish');
}() );
