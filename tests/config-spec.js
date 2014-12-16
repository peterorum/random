(function()
{
    "use strict";

    var ConfigPage = function()
    {
        this.get = function()
        {
            browser.get('/config');
        };

        this.pre = element(by.css('pre'));
    };

    describe('Config page', function()
    {
        it('should have config', function()
        {
            var configPage = new ConfigPage();

            configPage.get();

            expect(configPage.pre.getText()).toMatch(/currentDirectory/);
        });
    });
})();
