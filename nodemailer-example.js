"use strict";

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport

var transporter = nodemailer.createTransport(
{
    service: 'SendGrid',
    port: 587,
    auth:
    {
        user: process.env.smtpUser,
        pass: process.env.smtpPass
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Peter Testing <peter@seraline.com>', // sender address
    to: 'peter@peterorum.com', // csv list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
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
