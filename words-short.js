(function()
{
    "use strict";

    var _ = require('lodash-fp');
    var w = require('./get-word');
    var mail = require('./sendmail');

    _.anyOf = _.curry(function(arr, w)
    {
        return _.any(function(f)
        {
            return f(w);
        }, arr);
    });

    _.allOf = _.curry(function(arr, w)
    {
        return _.all(function(f)
        {
            return f(w);
        }, arr);
    });

    // load the words array
    var words = w.getWords();

    // var words = ['fish', 'cow', 'horse', 'dog', 'zoa', 'gju'];

    // make function to test if a word os a particular length
    var isLengthN = _.curry(function(n, w)
    {
        return w.length === n;
    });

    var isLength3 = isLengthN(3);

    // test for j,k, q, x & z
    var hasValuableChar = function(w)
    {
        return /[jkqxz]/i.test(w);
    };

    // also test for no vowel
    var hasNoVowely = function(w)
    {
        return !/[aeiouy]/i.test(w);
    };

    // want 3-letter words with a valuable character, or no vowel
    var pick = _.allOf([isLength3, _.anyOf([hasValuableChar, hasNoVowely])]);

    // get short valuable words
    var w3valuable = _.filter(pick, words);

    // dump all
    // console.log(w3valuable);
    // console.log(w3valuable.length);

    // pick one at random
    var word = w3valuable[_.random(w3valuable.length - 1, 0 )];

    console.log(word);

    mail.send(process.env.mailFrom, process.env.mailTo, 'Wrd of the Day: ' + word, word);

}());
