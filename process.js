(
    // process configuration

    function()
    {
        "use strict";

        var util = require('util');

        var getConfig = function()
        {

            var config = {};

            config.currentDirectory = process.cwd();
            config.environmentSettings = process.env;
            config.nodeArgs = process.argv;
            config.executionPath = process.execPath;
            config.executionArgs = process.execArgv;
            config.nodeVersion = process.version;
            config.moduleVersions = process.versions;
            config.processId = process.pid;
            config.title = process.title;
            config.platform = process.platform;
            config.architecture = process.arch;
            config.memoryUsage = util.inspect(process.memoryUsage());
            config.nodeUptime = process.uptime;

            return config;
        };

        exports.getConfig = function()
        {
            return getConfig();
        };


    }());
