(function()
{
    "use strict";

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
    };

    describe('Random project', function()
    {
        it('should have a title', function()
        {
            var randomPage = new RandomPage();
            randomPage.get();

            expect(randomPage.getTitle()).toEqual('Random Inspiration');
        });

    });
})();
