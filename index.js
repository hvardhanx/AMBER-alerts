var app=require('express')();
var cpuCores=require('os').cpus().length;
var cluster=require('cluster');
var request=require('request');
if(cluster.isMaster)
{
	console.log('Master cluster setting up ' + cpuCores + ' workers...');
	for (var i = 0; i < cpuCores; i++) {
        cluster.fork();
    };
    cluster.on('online',function(worker){
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
        cluster.fork();
    });
}else
{
	var urlAadhar="https://ac.khoslalabs.com/hackgate/hackathon/auth/raw";
	var express=require('express')
	var app=express();
	
	bodyParser   = require('body-parser');
  	app.use(bodyParser.urlencoded({ extended: true }));
  	app.use(bodyParser.json());
  	app.set('view engine', 'ejs');
  	app.use(express.static(__dirname + '/public'));
  	app.set('views', __dirname + '/views');
	routes=require('./routes');
  var db=require('./db');
  // define the about route
  app.get('/statsByTime',db.getStatsForMonth);
  app.get('/statsByLocation',db.getStatsForLocation);
	app.use('/',routes);

	app.use('/submit',routes);
	app.listen(8080,function(){
        console.log('Process ' + process.pid + ' is listening to all incoming requests on 8080');
	});
}
