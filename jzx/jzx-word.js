(function()
{
    "use strict";

    var math = require('mathjs');
    var Twit = require('twit');

    var words = require('./jzx-dict').words;

    var tweet = function(text)
    {
        var T = new Twit(
        {
            // jshint ignore:start
            consumer_key: process.env.twitterConsumerKey,
            consumer_secret: process.env.twitterConsumerSecret,
            access_token: process.env.twitterAccessToken,
            access_token_secret: process.env.twitterAccessTokenSecret
            // jshint ignore:end
        });

        T.post('statuses/update',
        {
            status: text
        }, function(err /*, data, response */ )
        {
            if (err)
            {
                console.log(err);
            }

            // console.log(data);
        });
    };

    // pick one at random
    var word = words[math.randomInt(0, words.length)];

    console.log(word);

    tweet(word);

}());

