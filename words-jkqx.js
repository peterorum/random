(function()
{
    "use strict";

    var _ = require('lodash');
    var w = require('./get-word');

    // takes an array of functions and applies it to the single value
    // returns true if they are all true
    _.allPredicates = function(x, predicates)
    {
        return _.all(predicates, function(p)
        {
            return p(x);
        });
    };

    // takes an array of functions and applies it to the single value
    // returns true if they any are true
    _.anyPredicates = function(x, predicates)
    {
        return _.any(predicates, function(p)
        {
            return p(x);
        });
    };

    // load the words array
    var words = w.getWords();

    // true if length 3
    var isLengthN = function(n, w)
    {
        return w.length === n;
    };

    var isLength3 = _.curry(isLengthN, 3);

    // true if has valuable letter
    var hasJkqx = function(w)
    {
        return /j|k|q|x/.test(w);
    };

    // want 3-letter words with a valuable character
    var desired = function(w)
    {
        return _.allPredicates(w, [isLength3, hasJkqx]);
    };

    // get short valuable words
    var w3jkqx = _.filter(words, desired);

    // dump all
    // console.log(w3jkqx);

    var word = w3jkqx[_.random(0, w3jkqx.length)];

    console.log(word);

}());
