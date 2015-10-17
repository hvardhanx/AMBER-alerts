var mongoose=require('mongoose');
mongoose.connect('mongodb://cfinoida:cfinoida@ds051923.mongolab.com:51923/cfinoida');
var db=mongoose.connection;
var userSchema=mongoose.Schema({
	Name:{
		type:String,
		default:null
	},
	emailId:{
		type:String,
		default:null
	},
	phoneNumber:{
		type:Number,
		default:0
	},
	address:{
		type:String,
		default:null
	},
	cityName:{
		type:String,
		default:null
	},
	loc: { 
		type: { type: String },
		coordinates: [ ] 
	},
	posts:[{
		name:{
			type:String,
			default:null
		},
		date:{
			type:Date,
			default:Date.now
		},
		status:{
			type:Number,
			default:0
		},
		loc: { 
			type: { type: String },
			coordinates: [ ] 
		},
		contactNumber:{
			type:Number,
			default:0
		},
		contactMail:{
			type:String,
			default:null
		},
		Notice:{
			type:String,
			default:null
		},
		posterURL:{
			type:String,
			default:null
		}
	}]
});
var users=mongoose.model('users',userSchema);
db.on('error',console.error.bind(console,"connection error"));
db.on('open',function(){
	console.log('Yo Yo!');
});
exports.getStatsForMonth=function(req,res){
	var yr=req.params.yr;
	var month=req.params.month;
	users.find({posts:{"$in":[{date:new Date(yr,month,1)}]}},function(err,doc){
		console.log(doc);
		if(err)
			res.send(err);
		else
			res.render('statsByTime',{data:doc});
	});
}
exports.getStatsForLocation=function(req,res){
	var lat=req.params.latitude;
	var lng=req.params.longitude;
	/*users.find({loc:{
		$nearSphere: msg.loc.coordinates,
        $maxDistance: 0.01
	}},function(err,docs){
		if (err) {
          res.send(err);
        }*/
        res.render('statsForLocation',{data:doc});
	});

}