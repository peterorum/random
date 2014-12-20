(function()
{
    "use strict";

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

        it('example for chrome driver', function()
        {
            browser.debugger();

            // then in the chrome dev console...
            // to get an element...
            // window.clientSideScripts.findInputs('fieldName');
            // to limit scope...
            // window.clientSideScripts.findInputs('fieldName', document.getElementById('#el'));

            // or separately..
            // cd ~/Projects/random/node_modules/protractor/bin
            // node elementexplorer.js http://localhost:8888
            // press tab to see the options
            // eg element(by.id(''))

        });
    });
})();
