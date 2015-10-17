function Response(){
	var that=this;
	this.handler=function(){
		return function(req,res,next){
			var respHandler=new ResponseHandler(req,res);
			respHandler.startTime=(new Date()).getTime();
			res.sendResponse=respHandler.sendResponse;
			res.sendError=respHandler.sendError;
			return next();
		};
	}
	this.authHandler=function(){
		return function(req,res,next){
			if(req.originalMethod == 'OPTIONS'){
				return next();
			}
		}
	}
}

exports.Response=Response;

function ResponseHandler(req,resp){
	var response=resp;
	var request=req;
	this.startTime=0;
	this.responseTime=0;
	this.path='';
	this.inputParameters={};
	this.applicationUser='';
	this.user='';
	var that =this;
	this.sendResponse=function(resp,notSendNoRecords){
		if(Object.keys(resp).length>0 || notSendNoRecords){
			var str = Utils.unescape(JSON.stringify(resp));
			str = str.replace(/&<[^>]*>/g, ' ');
			str = str.replace(/  /g,'');
			resp = JSON.parse(str);
			response.send({
				Status:'success',
				Data:resp
			});
		}
		else{
			response.send({
				Status:'success',
				Data:resp,
				Message:'No records found'
			});
		}
	
		// that.responseTime=(new Date()).getTime()-that.startTime;
		// that.path=request.route.path;

		// for(key in request.params){
		// 	that.inputParameters[key]=request.params[key];
		// }
		// for(key in request.query){
		// 	that.inputParameters[key]=request.query[key];
		// }
		// for(key in request.body){
		// 	that.inputParameters[key]=request.body[key];
		// }
		
		// if(req.user)
		// 	that.applicationUser=req.user.id;
		// else
		// 	that.applicationUser=0;

		// if(request.params.email)
		// 	that.user=request.params.email;
		// else if (request.query.email)
		// 	that.user=request.query.email;
		// else if (request.query.Email)
		// 	that.user=request.query.Email;
		// else if (request.body.email)
		// 	that.user=request.body.email;
		// else if (request.body.Email)
		// 	that.user=request.body.Email;

		// var log = that.getAccessLog();
		// var access_log = new AccessLog();
		// access_log.set('api', log.api);
		// access_log.set('startTime', log.startTime);
		// access_log.set('responseTime', log.responseTime);
		// access_log.set('inputParameters', log.inputParameters);
		// access_log.set('applicationUser', log.applicationUser);
		// access_log.set('user', log.user);
		// access_log.set('type','success');
		// access_log.set('output',resp);
		// access_log.set('method',request.route.method);
		// access_log.save(function(err, ac) {
  // 			if(that.user!='' && that.user!=undefined){
		// 		var user_tracking=new UserTracking();
		// 		user_tracking.trackUser(that.user,log.api,log.startTime,log.applicationUser,ac._id,that.isSecureLogin);
		// 	} 
  // 		});
	}
	// this.getAccessLog=function(){
	// 	return {
	// 		api:that.path,
	// 		startTime:that.startTime,
	// 		responseTime:that.responseTime,
	// 		inputParameters:that.inputParameters,
	// 		applicationUser: that.applicationUser,
	// 		user:that.user
	// 	};
	// }
	this.sendError=function(e){
		var err;
		if(e.http_code){
			response.status(e.http_code);
		} else{
			response.status(400);
		}

		if(e instanceof Exception){
			err=e.getError();
		}else{
			err=e;
		}
		response.json({
			Status:'failure',
			Error:err
		});

		// if(request.route){
		// 	that.responseTime=(new Date()).getTime()-that.startTime;
		// 	if(request.route)
		// 		that.path=request.route.path;
		// 	else that.path='NA';

		// 	for(key in request.params){
		// 		that.inputParameters[key]=request.params[key];
		// 	}
		// 	for(key in request.query){
		// 		that.inputParameters[key]=request.query[key];
		// 	}
		// 	for(key in request.body){
		// 		that.inputParameters[key]=request.body[key];
		// 	}
		// 	if(req.user)
		// 	that.applicationUser=req.user.id;
		// 	else that.applicationUser=0;

		// 	if(request.params && request.params.email)
		// 		that.user=request.params.email;
		// 	else if (request.query && request.query.email)
		// 		that.user=request.query.email;
		// 	else if (request.query && request.query.Email)
		// 		that.user=request.query.Email;
		// 	else if (request.body && request.body.email)
		// 		that.user=request.body.email;
		// 	else if (request.body && request.body.Email)
		// 		that.user=request.body.Email;
		// 	else that.user='';

		// 	// console.log(that.getAccessLog());
		// 	if(req.query)
		// 		that.isSecureLogin=req.query.___isSecureLogin___==true?true:false;
		// 	else that.isSecureLogin=false;

			
		// 	var log = that.getAccessLog();
		// 	var access_log = new AccessLog();
		// 	access_log.set('api', log.api);
		// 	access_log.set('startTime', log.startTime);
		// 	access_log.set('responseTime', log.responseTime);
		// 	access_log.set('inputParameters', log.inputParameters);
		// 	access_log.set('applicationUser', log.applicationUser);
		// 	access_log.set('user', log.user);
		// 	access_log.set('type','error');
		// 	access_log.set('output',err);
		// 	access_log.set('method',request.route.method);
		// 	access_log.save(function(err, ac) {
				
	 //  		});
		// }
	}
}
