(function()
{
    "use strict";

    var fp = require('lodash-fp');
    var w = require('../get-word');
    var _s = require('underscore.string');

    var pfp = require('../plus-fp/plus-fp');
    fp.mixin(pfp, fp);

    // load the words array
    var words = w.getWords();

    // make function to test if a word os a particular length
    var isLengthN = fp.curry(function(n, w)
    {
        return w.length === n;
    });

    var isLength7 = isLengthN(7);

    var w7 = fp.filter(isLength7, words);

    var countLetters = fp.curry(function(freq, w)
    {
        fp.forEach(function(l)
        {
            freq[l] = freq[l] ? freq[l] + 1 : 1;

        }, w);
    });

    var freq = {};

    var countLettersFreq = countLetters(freq);

    fp.forEach(countLettersFreq, w7);

    freq = fp.invert(freq);

    fp.keys(freq).forEach(function(k)
    {
        console.log(freq[k], _s.repeat('*', k / 300));
    });

}());
