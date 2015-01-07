(function()
{
    "use strict";

    var R = require('ramda');
    var w = require('./get-word');
    var mail = require('./sendmail');

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

    // test for j,k, q & x
    var hasValuableChar = R.anyPredicates([r.strContains('j'), r.strContains('k'), r.strContains('q'), r.strContains('x'), r.strContains('z')  ]);

    // want 3-letter words with a valuable character
    var pick = R.and(isLength3, hasValuableChar);

    // get short valuable words
    var w3valuable = R.filter(pick, words);

    // dump all
    // console.log(w3valuable);
    // console.log(w3valuable.length);

    // pick one at random
    var word = w3valuable[r.random(w3valuable.length)];

    console.log(word);

    mail.send(process.env.mailFrom, process.env.mailTo, 'Word of the day: ' + word, word);

}());
