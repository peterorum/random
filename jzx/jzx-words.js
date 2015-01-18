(function()
{
    "use strict";

    var R = require('ramda');
    var w = require('../get-word');

    // custom R functions
    var r = {};

    // make function that tests if a word contains a character
    r.strContains = R.curry(function(ch, word)
    {
        return R.strIndexOf(ch, word) >= 0;
    });

    // create random function
    r.random = function(n)
    {
        return Math.floor(Math.random() * n);
    };

    // load the words array
    var words = w.getWords();

    // make function to test if a word os a particular length
    var isLengthN = R.curry(function(n, w)
    {
        return w.length === n;
    });

    var isLength3 = isLengthN(3);

    // test for j,k, q, x & z
    var hasValuableChar = R.anyPredicates([r.strContains('j'), r.strContains('k'), r.strContains('q'), r.strContains('x'), r.strContains('z')  ]);

    // also test for no vowel
    var hasAVowely = R.anyPredicates([r.strContains('a'), r.strContains('e'), r.strContains('i'), r.strContains('o'), r.strContains('u'), r.strContains('y')  ]);
    var hasNoVowely = R.not(hasAVowely);

    // want 3-letter words with a valuable character, or no vowel
    var pick = R.and(isLength3, R.or(hasValuableChar, hasNoVowely));

    // get short valuable words
    var w3valuable = R.filter(pick, words);

    // dump all
    console.log(w3valuable);
    console.log(w3valuable.length);

    // pick one at random
    var word = w3valuable[r.random(w3valuable.length)];

    console.log(word);
}());
