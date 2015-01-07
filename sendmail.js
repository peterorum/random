(function()
{
    "use strict";

    var nodemailer = require('nodemailer');

    // create reusable transporter object using SMTP transport

    var transporter;

    if (process.env.smtpUser)
    {
        transporter = nodemailer.createTransport(
        {
            service: 'SendGrid',
            port: 587,
            auth:
            {
                user: process.env.smtpUser,
                pass: process.env.smtpPass
            }
        });
    }

    //--------- exports

    exports.send = function(from, to, subject, text, html)
    {
        if (transporter)
        {
            var mailOptions = {
                from: from,
                to: to,
                subject: subject,
                text: text,
                html: html
            };

            transporter.sendMail(mailOptions, function(error, info)
            {
                if (error)
                {
                    console.log(error);
                }
                else
                {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    };
}());
