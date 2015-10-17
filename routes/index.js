var express = require('express');
var router = express.Router();
var async=require('async');
var db=require('../db');
var client = require('twilio')('AC527f6f20315f59a17999fd9eec6ebc93', '031bba489a2f19d928e0ab856f1e1265');
var twitter = require('simple-twitter');
 twitter = new twitter('ESd7bNZnsmkf46EXDFO2Asw0T', //consumer key from twitter api
                       'GgJgSi3d5jS4i2fXoxe6TAymLHY44AKNVuUrurph1nnghorZsu', //consumer secret key from twitter api
                       '3700916413-QHgFm2hvXqI8KHZWxFarOaxuza6Zh2jj2sDqkqw', //acces token from twitter api
                       'nvjuqlM5DFMAOp8JOhKk0MUjrt39Ps1FcBKQKgE5r02CG'//acces token secret from twitter api
                       );
 var nodemailer = require('nodemailer');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'harshvd95@gmail.com',
        pass: 'laxauwftxfcvfwty'
    }
});
var bodyParser=require('body-parser');
// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.render('index');
});
router.post('/submitR',function(req,res){
	async.parallel([
			function(done){
				//twitter
				twitter.post('statuses/update',
	             {'status' : 'Awesome '},
	                function(error, data) {
	                	if(error)
	                		return done(error);
	                	else
	                    	console.log("Successfully Tweeted");
	            		done();
	                    //res.send(data);
	                }
	            );
			},
			function(done){
				//mail
				var mailOptions = {
				    from: 'Harsh Vardhan <harshvd95@gmail.com>', // sender address
				    to: 'harshprime@gmail.com', // list of receivers
				    subject: 'Hello ✔', // Subject line
				    text: 'Hello world ✔', // plaintext body
				    html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
	    			attachments: [{
	        			filename: 'image.jpg',
	        			path: 'images/test.jpg',
	        			cid: 'unique@kreata.ee' //same cid value as in the html img src
	    			}]
				};
	    		// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        return done(error);
				    }
				    console.log('Message sent: ' + info.response);
				    done();
				});

			},
			function(done){
				//msg
				client.sendMessage({
		            to:'+918298083939', // Any number Twilio can deliver to
		            from: '+16572208653', // A number you bought from Twilio and can use for outbound communication
		            body: 'Hello!' // body of the SMS message
		        }, function(err, responseData) { //this function is executed when a response is received from Twilio
		            if(err)
		             return done(err);
		            if (!err) { // "err" is an error received during the request, if any
		                // "responseData" is a JavaScript object containing data received from Twilio.
		                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
		                // http://w...content-available-to-author-only...o.com/docs/api/rest/sending-sms#example-1
		                console.log("From "+responseData.from+ " To "+responseData.to); // outputs "+14506667788"
		                console.log(responseData.body); // outputs "word to your mother.
		                done();
		            }
		        });
			}
		],function(err){
			if(err)
				res.send(err);
			else
				res.render('canvas');
		});
});
var db=require('../db');
// define the about route
router.get('/statsByTime',function(req,res){
	res.render('statsByTime',{data:"kuch B"});
});
router.post('/statsByLocation',function(req,res){
	
});

router.get('/statsByLocation',function(req,res){
	res.render('statsByLocation');
});
router.get('/submitReport',function(req,res){
	res.render('submitReport');
});
router.get('/check',function(req,res){
	res.render('checkfb');
});
router.post('/sendUserData',function(req,res){
    console.log(" int the  user" , req.body);
	res.render('submitReport',{data:req.body});
});/*
routes.post('/submit',function(req,res){
	var 
});*/
router.post('/submit',function(req,res){
	console.log(req.body);
})
module.exports = router;
