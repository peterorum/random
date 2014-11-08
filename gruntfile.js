module.exports = function(grunt) {
    grunt.initConfig({
        phantom: {
            options: {
                port: 4444
            }
        },

        protractor: {
            options: {
                // default node config file
                configFile: "node_modules/protractor/referenceConf.js",
                keepAlive: true,
                noColor: false,
                args: {}
            },
            test: {
                options: {
                    // our local config file
                    configFile: "protractor-conf.js",
                    args: {
                        // the port & path (if any) of the web server being used
                        baseUrl: "http://localhost:8080"
                    }
                }
            },
        },

        'http-server': {
            'test': {
                // run from the current folder
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

        watch: {
            configFiles: {
                files: ['Gruntfile.js']
            },
            scripts: {
                // execute when our js or html changes
                files: ['**/*spec.js', '**/*.html'],
                // run the protractor test task
                tasks: ['phantom', 'protractor:test'],
                options: {
                    spawn: false,
                    debounceDelay: 250,
                },
            },
        },

    });

    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-phantom');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // start the web server when grunt starts so it's always running for the test
    grunt.task.run('http-server:test');
};
