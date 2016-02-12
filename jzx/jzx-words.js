(function()
{
    "use strict";

    var R = require('ramda');
    var math = require('mathjs');
    var w = require('../get-word');

    // load the words array
    var words = w.getWords();

    // make function to test if a word os a particular length
    var isLengthN = R.curry(function(n, w)
    {
        return w.length === n;
    });

    var isLength3 = isLengthN(3);

    var isAtLeastLengthN = R.curry(function(n, w)
    {
        return w.length >= n;
    });

    var isAtLeastLength3 = isAtLeastLengthN(3);

    // test for j,k, q, x & z
    var hasValuableChar = function(w)
    {
        return /[jkqxz]/i.test(w);
    };

    // also test for no vowel or y
    var hasNoVowely = function(w)
    {
        return !/[aeiouy]/i.test(w);
    };

    // also test for no consonants
    var hasNoConsonant = function(w)
    {
        return !/[bcdfghjklmnpqrstvwxyz]/i.test(w);
    };

    // want 3-letter words with a valuable character, or no vowel
    var pick1 = R.allPass([isLength3, R.anyPass([hasValuableChar, hasNoVowely])]);
    var pick2 = R.allPass([isAtLeastLength3, hasNoConsonant]);
    var pick = R.anyPass([pick1, pick2]);

    // get short valuable words
    var w3valuable = R.filter(pick, words);

    // dump all
    // redirect to a text file or subl & copy into jzx-dict.js
    console.log(w3valuable);
    // console.log(w3valuable.length);

    // todo q words without u

}());
