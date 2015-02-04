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

/*
prefixes

[ { letters: 's', count: 3843 },
  { letters: 'c', count: 2771 },
  { letters: 'p', count: 2524 },
  { letters: 'b', count: 2290 },
  { letters: 't', count: 1937 },
  { letters: 'r', count: 1837 },
  { letters: 'm', count: 1818 } ]

[ { letters: 're', count: 901 },
  { letters: 'co', count: 759 },
  { letters: 'ca', count: 621 },
  { letters: 'un', count: 562 },
  { letters: 'ma', count: 525 },
  { letters: 'st', count: 507 },
  { letters: 'de', count: 499 } ]

[ { letters: 'out', count: 218 },
  { letters: 'pre', count: 173 },
  { letters: 'cha', count: 158 },
  { letters: 'mis', count: 145 },
  { letters: 'pro', count: 140 },
  { letters: 'car', count: 134 },
  { letters: 'sta', count: 128 } ]

[ { letters: 'over', count: 65 },
  { letters: 'comp', count: 30 },
  { letters: 'char', count: 30 },
  { letters: 'outs', count: 28 },
  { letters: 'anti', count: 27 },
  { letters: 'cant', count: 26 },
  { letters: 'gall', count: 25 } ]

suffixes

[ { letters: 's', count: 11036 },
  { letters: 'e', count: 3501 },
  { letters: 'd', count: 3497 },
  { letters: 'r', count: 2764 },
  { letters: 'g', count: 2263 },
  { letters: 't', count: 1781 },
  { letters: 'y', count: 1752 } ]

[ { letters: 'es', count: 3190 },
  { letters: 'ed', count: 2853 },
  { letters: 'er', count: 2382 },
  { letters: 'ng', count: 2166 },
  { letters: 'rs', count: 1677 },
  { letters: 'ns', count: 941 },
  { letters: 'ts', count: 932 } ]

[ { letters: 'ing', count: 2116 },
  { letters: 'ers', count: 1347 },
  { letters: 'ier', count: 743 },
  { letters: 'ies', count: 720 },
  { letters: 'led', count: 470 },
  { letters: 'les', count: 462 },
  { letters: 'ted', count: 396 } ]

[ { letters: 'ting', count: 261 },
  { letters: 'ling', count: 221 },
  { letters: 'ters', count: 212 },
  { letters: 'king', count: 204 },
  { letters: 'ings', count: 193 },
  { letters: 'ping', count: 152 },
  { letters: 'ning', count: 151 } ]

*/