(function()
{
    "use strict";

    var fp = require('lodash-fp');
    var fs = require('fs');
    var Twit = require('twit');

    var words = [];

    var dict = "jzx/jzx-words.txt";

    // load all words
    var readWords = function()
    {
        var data = fs.readFileSync(dict,
        {
            encoding: 'utf8',
            flag: 'r'
        });

        words = data.split(/\r?\n/);
    };

    // init loading of the words
    readWords();

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
    var word = words[fp.random(0, words.length - 1)];

    console.log(word);

    // tweet(word);

}());

/*
{ created_at: 'Sun Jan 18 00:37:34 +0000 2015',
  id: 556611318518538240,
  id_str: '556611318518538240',
  text: 'rax',
  source: '<a href="https://github.com/peterorum/random" rel="nofollow">Daily Jsx</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user:
   { id: 2987548794,
     id_str: '2987548794',
     name: 'Daily Jzx',
     screen_name: 'DailyJzx',
     location: '',
     profile_location: null,
     description: '',
     url: null,
     entities: { description: [Object] },
     protected: false,
     followers_count: 1,
     friends_count: 0,
     listed_count: 0,
     created_at: 'Sat Jan 17 22:50:30 +0000 2015',
     favourites_count: 0,
     utc_offset: 39600,
     time_zone: 'Sydney',
     geo_enabled: false,
     verified: false,
     statuses_count: 1,
     lang: 'en',
     contributors_enabled: false,
     is_translator: false,
     is_translation_enabled: false,
     profile_background_color: '000000',
     profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
     profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
     profile_background_tile: false,
     profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_6_normal.png',
     profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_6_normal.png',
     profile_link_color: 'ABB8C2',
     profile_sidebar_border_color: '000000',
     profile_sidebar_fill_color: '000000',
     profile_text_color: '000000',
     profile_use_background_image: false,
     default_profile: false,
     default_profile_image: true,
     following: false,
     follow_request_sent: false,
     notifications: false },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  retweet_count: 0,
  favorite_count: 0,
  entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
  favorited: false,
  retweeted: false,
  lang: 'und' }
*/
