var nodemailer = require('nodemailer');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tarungarg546@gmail.com',
        pass: 'laxauwftxfcvfwty'
    }
});
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Tarun Garg <tarungarg546@gmail.com>', // sender address
    to: '@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};
    // send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
