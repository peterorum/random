(function()
{
    "use strict";

    var fs = require('fs');

    // https://scrabblehelper.googlecode.com/svn-history/r20/trunk/ScrabbleHelper/src/dictionaries/sowpods.txt

    var dict = "./words.txt";

    // dummy init
    var words = ['fish'];

    // load all words
    var readWords = function()
    {
        var data = fs.readFileSync(dict,
        {
            encoding: 'utf8',
            flag: 'r'
        });

        words = data.split(/\r?\n/);
    };

    // init loading of the words
    readWords();

    //--------- exports

    // returns a random word

    exports.getWord = function()
    {
        var count = words.length;

        var r = Math.floor(Math.random() * count);

        return (words[r]);
    };


    // returns all words

    exports.getWords = function()
    {
        return words;
    };

}());
