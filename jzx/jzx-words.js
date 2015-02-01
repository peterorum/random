(function()
{
    "use strict";

    var fp = require('lodash-fp');
    var w = require('../get-word');

    fp.mixin(require('../plus-fp/plus-fp'));

    // load the words array
    var words = w.getWords();

    // make function to test if a word os a particular length
    var isLengthN = fp.curry(function(n, w)
    {
        return w.length === n;
    });

    var isLength3 = isLengthN(3);

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

    // want 3-letter words with a valuable character, or no vowel
    var pick = fp.allOf([isLength3, fp.anyOf([hasValuableChar, hasNoVowely])]);

    // get short valuable words
    var w3valuable = fp.filter(pick, words);

    // dump all
    console.log(w3valuable);
    console.log(w3valuable.length);

    // pick one at random
    var word = w3valuable[fp.random(0, w3valuable.length)];

    console.log(word);
}());
