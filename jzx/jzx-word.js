(function()
{
    "use strict";

    var math = require('mathjs');
    var Twit = require('twit');
    var graph = require('fbgraph');
    var Q = require('q');
    var R = require('ramda');
    var request = require('request');
    var parseString = require('xml2js').parseString;

    var words = require('./jzx-dict').words;

    var getMeaning = function(word)
    {
        var deferred = Q.defer();

        // / This function grabs the definition of a word in XML format.

        // function grab_xml_definition ($word, $ref, $key)
        //     {   $uri = "http://www.dictionaryapi.com/api/v1/references/" . urlencode($ref) . "/xml/" .
        //                     urlencode($word) . "?key=" . urlencode($key);
        //         return file_get_contents($uri);
        //     };

        // $xdef = grab_xml_definition("test", "collegiate", "9b40c328-3b86-46a7-9927-c27f8138276d");

        var url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + word + '?key=9b40c328-3b86-46a7-9927-c27f8138276d';

        request(url, function(error, response, xml)
        {
            if (!error && response.statusCode === 200)
            {
                parseString(xml, function(err, result)
                {
                    deferred.resolve(result);
                });
            }
        });

        return deferred.promise;
    };

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

    // word = 'elk';

    getMeaning(word).then(function(data)
    {
        // console.log('data', JSON.stringify(data, null, 4));

        var entries = data.entry_list; //jshint ignore:line

        var getDefinition = function(entry)
        {
            var def = [];

            if (entry.def)
            {
                var dt = entry.def[0].dt;

                def = R.map(function(d)
                {
                    // console.log(d, typeof d);

                    var result = '';

                    if (typeof d === "string")
                    {
                        result = d;
                    }
                    else if (d._)
                    {
                        if (R.trim(d._) !== ':')
                        {
                            result += d._;
                        }

                        if (d.it)
                        {
                            result += ' ' + R.trim(d.it[0]);
                        }
                        else if (d.sx)
                        {
                            result = d.sx[0]._ || d.sx[0];
                        }
                    }
                    else if (d.un)
                    {
                        result = d.un[0];
                    }

                    // remove leading color or ()
                    result = R.trim(result.replace(/(^:)|(\(\))/g, ''));

                    // console.log(result);

                    return result;
                }, dt);
            }

            return def;

        };

        var meaning = '';

        if (entries.suggestion)
        {
            // meaning = 'Did you mean: ' + R.join(', ', entries.suggestion);
        }
        else
        {
            var meanings = R.map(getDefinition, entries.entry);

            // remove blanks & too long to tweet
            meanings = R.filter(function(w)
            {
                return !!R.trim(w) && w.length <= 130;
            }, R.flatten(meanings));

            meaning = meanings[math.randomInt(meanings.length)];
        }

        var msg = word;

        if (meaning)
        {
            msg = msg + ': ' + meaning;
        }

        console.log(msg);

        // twitter
        tweet(msg);

        // facebook
        // jshint camelcase:false
        graph.setAccessToken(process.env.fb_dj_access_token);

        // get page accounts
        graph.get("me/accounts", function(err, res)
        {
            // find relevant age to get access token for it
            var dj = R.find(R.propEq('name', 'Daily Jzx'), res.data);

            // console.log(dj);

            // change access token to page's
            graph.setAccessToken(dj.access_token);

            //------------ post via url using local server

            // create message & serve up local file
            var post = {
                message: msg
            };

            // post to page photos
            graph.post("/" + dj.id + "/feed", post, function(err, res)
            {
                console.log(res); // { id: xxxxx}
            });
        });

    });
}());
