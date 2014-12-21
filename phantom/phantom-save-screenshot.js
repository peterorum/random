"use strict";

// run using: phantomjs save-screenshot.js  http://localhost:8888 screen1

var page = require("webpage").create();
var site = phantom.args[0];
var output = phantom.args[1];

page.open(site, function(status)
{
    if (status !== "success")
    {
        phantom.exit(1);
    }

    page.render(output + ".png");

    phantom.exit(0);
});
