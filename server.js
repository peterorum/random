(
    // serve up dynamic content

    function()
    {
        // this code returns a web page with a word, ignoring the path

        "use strict";

        var http = require('http');
        var url = require('url');
        var path = require('path');
        var fs = require('fs');

        var cis = require('./ci-string');
        var rword = require('./get-word.js');
        var config = require('./process.js');

        http.createServer(function(request, response)
        {
            var uri = url.parse(request.url, true, false);
            var filename = path.join(process.cwd(), uri.pathname);

            var handleError = function(errNo, err)
            {
                response.writeHead(errNo,
                {
                    "Content-Type": "text/plain"
                });
                response.write(errNo + " " + err + "\n");
                response.end();
                return;
            };

            if (/\.js$/.test(filename))
            {
                // js

                fs.readFile(filename, "binary", function(err, file)
                {
                    if (err)
                    {
                        handleError(404, "Not found " + err);
                    }
                    else
                    {
                        response.setHeader("Content-Type", "application/javascript");
                        response.writeHead(200);
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
            else
            {
                // html

                response.setHeader("Content-Type", "text/html");
                response.writeHead(200);

                response.write('<html>\n');

                // head
                response.write('<head>\n');
                response.write('<title>Random Inspiration</title>\n');
                response.write('<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />\n');
                response.write('</head>\n');

                // body
                response.write('<body ng-app="randomApp" ng-hint>\n');

                if (uri.pathname === '/config')
                {
                    //--------------------- config

                    response.write('<pre>\n');
                    response.write(JSON.stringify(config.getConfig(), null, 4));
                    response.write('</pre>\n');
                }
                else if (uri.pathname === '/')
                {
                    // can override word using ?word=fish
                    var word = uri.query.word || rword.getWord();

                    // start container
                    response.write('<div class="container">\n');

                    // heading
                    response.write('<div class="row">\n');
                    response.write('<div class="col-xs-12">\n');

                    response.write('<h1 class="text-center">Random Inspiration</h1>');

                    response.write('</div>\n');
                    response.write('</div>\n');

                    // content
                    response.write('<div class="row">\n');
                    response.write('<div class="col-xs-12">\n');

                    response.write('<h2 class="text-center">');
                    response.write(cis.template(
                    {
                        word: word
                    }, '<a href="http://www.thefreedictionary.com/{{ word }}" target="_blank">{{ word }}</a>'));

                    response.write('</h2>\n');

                    response.write('</div>\n');
                    response.write('</div>\n');

                    // button
                    response.write('<div class="row">\n');
                    response.write('<div class="col-xs-12 text-center">\n');

                    response.write('<div class="btn btn-primary" onclick="location.reload();">');
                    response.write('again');

                    response.write('</div>\n');

                    response.write('</div>\n');
                    response.write('</div>\n');

                    // end container
                    response.write('</div>\n');
                }

                response.write('<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js"></script>\n');

                // only hosted locally
                response.write('<script src="node_modules/angular-hint/dist/hint.js"></script>\n');

                response.write('<script src="app/app.js"></script>\n');

                response.write('</body>\n');

                // end
                response.end('</html>\n');
            }
        }).listen(process.env.PORT || 8888);
    }());
