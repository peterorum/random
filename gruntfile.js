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
                tasks: ['protractor:test'],
                options:
                {
                    spawn: false,
                    debounceDelay: 250,
                },
            },
        }

    });

    grunt.loadNpmTasks('grunt-phantom');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.task.run('phantom:test');

};
