describe( 'angularjs homepage todo list', function ()
{
    it( 'should work', function ()
    {
        browser.get( 'index.html' );

        expect( browser.getTitle() ).toEqual( 'Random' );
    } );
} );
