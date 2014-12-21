// jshint ignore : start

// run grunt screenshots
//http://alistapart.com/blog/post/driving-phantom-from-grunt

module.exports = function(grunt)
{
    // task to run a phantom script to take screenshots
    // http://alistapart.com/blog/post/driving-phantom-from-grunt

    grunt.initConfig(
    {
        screenshots:
        {
            default_options:
            {
                options:
                {
                    url: 'http://localhost:8888',
                    output: 'screen3'
                }
            }
        }
    });

    var screenshot = require("./take-screenshot.js");

    grunt.registerMultiTask('screenshots', 'Use Grunt and PhantomJS to generate Screenshots of pages', function()
    {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.

        var options = this.options(
        {
            url: '',
            output: ''
        });

        screenshot.takeShot(options.url, options.output, function()
        {
            done();
        });
    });
};
