// jshint ignore : start

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

        // protractor
        protractor:
        {
            options:
            {
                // default node config file
                configFile: 'node_modules/protractor/referenceConf.js',
                keepAlive: false, // set to false so it shows a growl notification on failure
                noColor: false,
                args:
                {}
            },
            test:
            {
                options:
                {
                    // our local config file
                    configFile: 'protractor-conf.js'
                }
            },
        },

        watch:
        {
            configFiles:
            {
                files: ['gruntfile.js']
            },
            scripts:
            {
                // execute when our js changes
                files: ['tests/*-spec.js', '*.js', 'app/*.js', 'controllers/*.js'],
                // run the protractor test task
                tasks: ['jshint:test', 'protractor:test'],
                options:
                {
                    spawn: false,
                    debounceDelay: 250,
                },
            },
        },

        notify_hooks:
        {
            options:
            {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                success: false, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },

        jshint:
        {
            test: ['./*.js', 'tests/**/*.js']
        }

    });

    grunt.loadNpmTasks('grunt-phantom');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.task.run('phantom:test');
    grunt.task.run('notify_hooks');

};
