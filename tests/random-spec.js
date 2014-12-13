describe('Random project', function()
{
    it('should have a title', function()
    {
        browser.get('/');

        expect(browser.getTitle()).toEqual('Random Inspiration');
    });

    it('should have config', function()
    {
        browser.get('/config');

        expect(element(by.css('pre')).getText()).toMatch(/currentDirectory/);
    });
});
