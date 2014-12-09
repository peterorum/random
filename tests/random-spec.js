describe( 'Random project', function ()
{
    it( 'should have a title', function ()
    {
        browser.get( '' );

        expect( browser.getTitle() ).toEqual( 'Random Inspiration' );
    } );
} );
