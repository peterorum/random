module.exports = function(grunt)
{
    grunt.initConfig(
    {
        phantom:
        {
            options:
            {
                port: 4444
            },
            test:
            {}
        },

        // nodemon
        nodemon:
        {
            dev:
            {
                script: 'server.js',
                watch: '.'
            }
        },

        // protracctor
        protractor:
        {
            options:
            {
                // default node config file
                configFile: 'node_modules/protractor/referenceConf.js',
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
                    configFile: 'protractor-conf.js',
                    args:
                    {
                        // the port & path (if any) of the web server being used
                        baseUrl: 'http://localhost:8080'
                    }
                }
            },
        },

        'http-server':
        {
            'test':
            {
                // run from the current folder
                root: './',

                // port to usr
                port: 8080,

                // local host
                host: '127.0.0.1',

                // disable cahcing
                cache: -1,
                showDir: true,
                autoIndex: true,

                ext: 'html',

                runInBackground: true
            }

        },

        watch:
        {
            configFiles:
            {
                files: ['gruntfile.js']
            },
            scripts:
            {
                // execute when our js or html changes
                files: ['tests/*-spec.js', '*.html', 'app/*.js', 'controllers/*.js'],
                // run the protractor test task
                tasks: ['protractor:test'],
                options:
                {
                    spawn: false,
                    debounceDelay: 250,
                },
            },
        },

        // run watch and nodemon at the same time
        // start the web server when grunt starts so it's always running for the test
        concurrent:
        {
            options:
            {
                logConcurrentOutput: true
            },
            tasks: ['nodemon:dev', 'watch', 'http-server:test', 'phantom:test']
        }

    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-phantom');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.registerTask('default', ['concurrent']);
};
