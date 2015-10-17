'use strict';
var User = global.User;

exports.CheckLogin = CheckLogin;

//Check user login.
function CheckLogin(req, res){
	var email = req.body.email;
	var password = req.body.password;

	//validation block of API parameters
	if(email === undefined || email === ''){
		res.sendError(new Exception('ValidationError', 'Please enter user email.'));
		return;
	}
	if(password === undefined || password === ''){
		res.sendError(new Exception('ValidationError', 'Please enter password.'));
		return;
	}

	//check username and password in database.
	User.checkLogin(req.body.email,req.body.password, function(err,result){
		if(err){
			res.sendError(err);
		}else{
			if(result) {
				res.sendResponse(result);
			} else {
				res.sendResponse({});
			}
		}
	});
}