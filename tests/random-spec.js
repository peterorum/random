(function()
{
    "use strict";

    var fs = require('fs');

    var writeScreenShot = function(data, filename)
    {
        var stream = fs.createWriteStream(filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    };

    var RandomPage = function()
    {
        this.get = function()
        {
            browser.get('/');
        };

        this.getTitle = function()
        {
            return browser.getTitle();
        };

        this.saveScreenshot = function()
        {
            browser.takeScreenshot().then(function(png)
            {
                writeScreenShot(png, 'tests/random.png');
            });

        };
    };

    describe('Random project', function()
    {
        it('should have a title', function()
        {
            var randomPage = new RandomPage();
            randomPage.get();

            expect(randomPage.getTitle()).toEqual('Random Inspiration');

        });

        it('should take a screenshot', function()
        {
            var randomPage = new RandomPage();

            randomPage.saveScreenshot();
        });
    });
})();
