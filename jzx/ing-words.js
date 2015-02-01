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

    var endsWithIng = fp.endsWith('ing');

    var isLength7 = isLengthN(7);

    // want 7 letter words ending with ing
    var pick = fp.allOf([isLength7, endsWithIng]);

    var ing7s = fp.filter(pick, words).map(function(w)
    {
        return w.substr(0, 4);
    });

    var countLetters = fp.curry(function(freq, w)
    {
        fp.forEach(function(l)
        {
            freq[l] = freq[l] ? freq[l] + 1 : 1;

        }, w);
    });

    var freq = {};

    var countLettersFreq = countLetters(freq);

    fp.forEach(countLettersFreq, ing7s);

    freq = fp.invert(freq);

    fp.keys(freq).forEach(function(k)
    {
        console.log(freq[k], _s.repeat('*', k / 10));
    });

    // result: still end up with relations

    // dump all
    // console.log(ing7s);
    // console.log(ing7s.length);

}());
