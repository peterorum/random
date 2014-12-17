(function()
{
    "use strict";

    var fs = require('fs');
    var crypto = require('crypto');

    var writeScreenShot = function(data, filename)
    {
        fs.writeFileSync(filename, new Buffer(data, 'base64'));
    };

    var md5 = function(data)
    {
        return crypto
            .createHash('md5')
            .update(data, 'utf8')
            .digest('hex');
    };

    var calcFileMd5 = function(fileName)
    {
        var data = fs.readFileSync(fileName);

        return md5(data);
    };

    var RandomPage = function()
    {
        this.get = function(url)
        {
            browser.get(url || '/');
        };

        this.getTitle = function()
        {
            return browser.getTitle();
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

        it('should match screenshot', function()
        {
            var md5Expected = calcFileMd5("tests/random-expected.png");

            var randomPage = new RandomPage();

            randomPage.get('/?word=fish');

            browser.takeScreenshot().then(function(png)
            {
                var filename = 'tests/random-actual.png';

                writeScreenShot(png, filename);

                var md5Actual = calcFileMd5(filename);

                expect(md5Actual).toEqual(md5Expected);
            });
        });
    });
})();
