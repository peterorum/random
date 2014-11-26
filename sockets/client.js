(
    // web socket - client side

    function()
    {
        // this code writes to a web socket server

        "use strict";

        var net = require('net');

        var getConnection = function(conn)
        {
            var client = net.connect(
                {
                    // port & host to connect to
                    port: 8107,
                    host: 'localhost'
                },
                function()
                {
                    // handle connection

                    console.log(conn, 'connected');
                    console.log('    local = %s:%s', this.localAddress, this.localPort);
                    console.log('    remote = %s:%s', this.remoteAddress, this.remotePort);

                    this.setTimeout(500);
                    this.setEncoding('utf8');

                    this.on('data', function(data)
                    {
                        console.log(conn, ' from server:', data.toString());

                        // process data

                        this.end();
                    });

                    this.on('end', function()
                    {
                        console.log(conn, ' client disconnected');
                    });

                    this.on('error', function(err)
                    {
                        console.log('socket error', JSON.stringify(err));
                    });

                    this.on('timeout', function()
                    {
                        console.log('socket timed out');
                    });

                    this.on('close', function(err)
                    {
                        console.log('socket closed');
                    });
                }
            );

            return client;
        };

        var writeData = function(socket, data)
        {

            var success = !socket.write(data);

            if (!success)
            {
                // error, so rewrite
                (function(socket, data)
                {
                    socket.once('drain', function()
                    {
                        writeData(socket, data);
                    });
                })(socket, data);
            }
        };

        var channel1 = getConnection('channel1');
        var channel2 = getConnection('channel2');
        var channel3 = getConnection('channel3');

        writeData(channel1, 'Message 1');
        writeData(channel2, 'Message 2');
        writeData(channel3, 'Message 3');
    }()
);
