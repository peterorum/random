// create a module so that the phantom script can be run from node & grunt
//http://alistapart.com/blog/post/driving-phantom-from-grunt

var path = require("path");
var execFile = require("child_process").execFile;
var phantomPath = 'phantomjs'; // require("phantomjs").path;
var phantomscript = path.resolve(path.join(__dirname, "phantom-save-screenshot.js"));

exports.takeShot = function(url, output, cb)
{
    "use strict";

    execFile(phantomPath, [phantomscript, url, output], function(err, stdout, stderr)
    {
        if (err)
        {
            throw err;
        }
        if (stderr)
        {
            console.error(stderr);
        }
        if (stdout)
        {
            console.log(stdout);
        }
        if (cb)
        {
            cb();
        }
    });
};
