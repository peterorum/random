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

    var isAtMostLengthN = R.curry(function(n, w)
    {
        return w.length <= n;
    });

    var isAtLeastLength3 = isAtLeastLengthN(3);

    var isAtMostLength4 = isAtMostLengthN(4);
    var isAtMostLength5 = isAtMostLengthN(5);

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

    // q with u. skip plurals
    var hasQNoU = function(w)
    {
        return /q/i.test(w) && !/u/i.test(w) && ! /s$/.test(w);
    };

    // 2 us
    var has2Us = function(w)
    {
        var us = w.match(/u/g);

        return us && us.length >= 2  && ! /s$/.test(w);
    };

    // begins with y consonant
    var hasYconsonant = function(w)
    {
        return /^y[^aeiou]/.test(w)  && ! /s$/.test(w);
    };

    // begins with ch
    var hasCh = function(w)
    {
        return /ch/.test(w) && ! /s$/.test(w);
    };

    // want 3-letter words with a valuable character, or no vowel
    var pick1 = R.allPass([isLength3, R.anyPass([hasValuableChar, hasNoVowely])]);
    var pick2 = R.allPass([isAtLeastLength3, hasNoConsonant]);
    var pick3 = R.allPass([hasQNoU]);
    var pick4 = R.allPass([isAtMostLength4, has2Us]);
    var pick5 = R.allPass([isAtMostLength5, hasYconsonant]);
    var pick6 = R.allPass([isAtMostLength4, hasCh]);
    var pick = R.anyPass([/*pick1, pick2, pick3, pick4, pick5 */ pick6]);

    // get short valuable words
    var w3valuable = R.filter(pick, words);

    // dump all
    // redirect to a text file or subl & copy into jzx-dict.js
    console.log(w3valuable);


}());
