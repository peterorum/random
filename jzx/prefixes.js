(function()
{
    "use strict";

    // works out the most commn 1, 2, 3 & 4 letter starts to 7-letter words

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

    var isLength7 = isLengthN(7);

    // get the left n chars
    var prefixn = fp.curry(function(n, w)
    {
        return w.substr(0, n);
    });

    // get the left n chars
    var suffixn = fp.curry(function(n, w)
    {
        return w.substr(w.length - n);
    });

    // get all 7 letter words
    var w7 = fp.filter(isLength7, words);

    // count occurences of string [{prefix: 'out', count: 12}, ... ]
    var count = fp.curry(function(freq, n, w)
    {
        // see if alreay counting
        var c = fp.find(function(x)
        {
            return x.letters === w;
        }, freq);

        if (c)
        {
            // increment
            c.count += 1;
        }
        else
        {
            // init
            freq.push(
            {
                letters: w,
                count: 1
            });
        }
    });

    [prefixn, suffixn].forEach(function(fixn)
    {
        // do 1-4 letters
        fp.range(1, 5).forEach(function(n)
        {
            // init counts
            var freq = [];

            // prefix function for this many letters
            var fix = fixn(n);

            // counter function. count the prefix.
            var counter = fp.compose(count(freq, n), fix);

            // count each word
            fp.forEach(counter, w7);

            var common = fp.sortBy('count', freq).reverse();

            var mostCommon = fp.take(7, common);

            console.log(mostCommon);
        });
    });
}());
