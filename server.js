(
    function()
    {
        "use strict";

        var express = require('express');
        var app = express();

        app.disable('view cache');

        var http = require('http');
        var url = require('url');
        var path = require('path');
        var fs = require('fs');

        var rword = require('./get-word.js');
        var config = require('./process.js');

        http.createServer(app).listen(process.env.PORT || 8888);

        var handleError = function(res, errNo, err)
        {
            res.writeHead(errNo,
            {
                "Content-Type": "text/plain"
            });
            res.write(errNo + " " + err + "\n");
            res.end();
            return;
        };

        var htmlHead = function(res)
        {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);

            res.write('<html ng-app="randomApp">\n');

            // head
            res.write('<head>\n');
            res.write('<title>Random Inspiration</title>\n');
            res.write('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />\n');

            res.write('</head>\n');

            // body
            res.write('<body>\n');
        };

        var htmlEnd = function(res)
        {
            res.write('<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js"></script>\n');

            res.write('<script src="app/app.js"></script>\n');
            res.write('<script src="controllers/random.js"></script>\n');


            res.write('</body>\n');

            // end
            res.end('</html>\n');
        };

        // javascript files
        app.get(/\.js$/, function(req, res)
        {
            var uri = url.parse(req.url, true, false);
            var filename = path.join(process.cwd(), uri.pathname);

            fs.readFile(filename, "binary", function(err, file)
            {
                if (err)
                {
                    handleError(res, 404, "Not found " + err);
                }
                else
                {
                    res.setHeader("Content-Type", "application/javascript");
                    res.writeHead(200);
                    res.write(file, "binary");
                    res.end();
                }
            });
        });


        app.get('/', function(req, res)
        {
            htmlHead(res);

            // start container
            res.write('<div class="container ng-cloak"  ng-controller="RandomController" >\n');

            // heading
            res.write('<div class="row">\n');
            res.write('<div class="col-xs-12">\n');

            res.write('<h1 class="text-center">Random Inspiration</h1>');

            res.write('</div>\n');
            res.write('</div>\n');

            // content
            res.write('<div class="row">\n');
            res.write('<div class="col-xs-12">\n');

            res.write('<h2 class="text-center">');
            // output the word from angular scope
            res.write('<a href="http://www.thefreedictionary.com/{{text}}" target="_blank">{{text}}</a>');

            res.write('</h2>\n');

            res.write('</div>\n');
            res.write('</div>\n');

            // button
            res.write('<div class="row">\n');
            res.write('<div class="col-xs-12 text-center">\n');

            res.write('<div class="btn btn-primary" ng-click="getWord();">');
            res.write('again');

            res.write('</div>\n');

            res.write('</div>\n');
            res.write('</div>\n');

            // end container
            res.write('</div>\n');

            htmlEnd(res);
        });

        // get random word via json
        app.get('/word', function(req, res)
        {
            // format for readability
            // app.set('json spaces', 4);

            var word = rword.getWord();

            res.json(
            {
                'word': word
            });

        });

        // test dump of available info
        app.get('/test/:id', function(req, res)
        {
            console.log("URL:\t   " + req.originalUrl);
            console.log("Protocol:  " + req.protocol);
            console.log("IP:\t   " + req.ip);
            console.log("Path:\t   " + req.path);
            console.log("Host:\t   " + req.hostname);
            console.log("Method:\t   " + req.method);
            console.log("Query:\t   " + JSON.stringify(req.query));
            console.log("Fresh:\t   " + req.fresh);
            console.log("Stale:\t   " + req.stale);
            console.log("Secure:\t   " + req.secure);
            console.log("UTF8:\t   " + req.acceptsCharsets('utf8'));
            console.log("Connection: " + req.get('connection'));
            console.log("Headers: " + JSON.stringify(req.headers, null, 2));

            res.send("Test request");

            console.log('Response finished', res.finished);
            console.log('Header sent', res.headerSent);

        });


        // test dump of available environment info
        app.get('/config', function(req, res)
        {
            console.log(JSON.stringify(config.getConfig(), null, 4));
            res.send("Config request");
        });


    }());
