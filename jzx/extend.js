(function()
{
    "use strict";

    var graph = require('fbgraph');

    // jshint camelcase:false

    graph.setAccessToken(process.env.fb_dj_access_token);

    graph.extendAccessToken(
    {
        "access_token": process.env.fb_dj_access_token,
        "client_id": process.env.fb_dj_app_id,
        "client_secret": process.env.fb_dj_app_secret
    }, function(err, facebookRes)
    {
        console.log(facebookRes);
    });

})();
