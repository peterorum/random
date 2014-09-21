module.exports = function( grunt )
{
    grunt.initConfig(
    {
        protractor_webdriver:
        {
            options:
            {
                // leave the webdriver open between tests
                keepAlive: true

            },
            test:
            {}
        },

        protractor:
        {
            options:
            {
                // default node config file
                configFile: "node_modules/protractor/referenceConf.js",
                keepAlive: true,
                noColor: false,
                args:
                {}
            },
            test:
            {
                options:
                {
                    // our local config file
                    configFile: "protractor-conf.js",
                    args:
                    {
                        // the port & path (if any) of the web server being used
                        baseUrl: "http://localhost:8080"
                    }
                }
            },
        },

        'http-server':
        {
            'test':
            {
                // run form the current folder
                root: './',

                // port to usr
                port: 8080,

                // local host
                host: "127.0.0.1",

                // disable cahcing
                cache: -1,
                showDir: true,
                autoIndex: true,

                ext: "html",

                runInBackground: true
            }

        },

        watch:
        {
            configFiles:
            {
                // realod grunt when this gruntfile changes
                files: [ 'gruntfile.js' ],
                options:
                {
                    reload: true
                }
            },
            scripts:
            {
                // execute when our js or html changes
                files: [ '**/*spec.js', '**/*.html' ],
                // run the protractor test task
                tasks: [ 'protractor:test' ],
                options:
                {
                    spawn: false,
                    debounceDelay: 250,
                },
            },
        },

    } );

    grunt.loadNpmTasks( 'grunt-http-server' );
    grunt.loadNpmTasks( 'grunt-protractor-webdriver' );
    grunt.loadNpmTasks( 'grunt-protractor-runner' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // start the web server and selenium server when grunt starts so they are always running for the test
    grunt.task.run( 'http-server:test' );
    grunt.task.run( 'protractor_webdriver:test' );
};