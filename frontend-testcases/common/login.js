/*
	Author: Nilesh Mistry
*/

/*
	This function is used for login
	callback : function will execute after complition of login
*/
module.exports.login = function(username, password, callback){
	if(username == null || username == undefined)
		username = "";
	if(password == null || password == undefined)
		password = "";
	// enter username
	client.setValue('#email', username, function(err){
		errorScreenShot(err, 'Entering user email error should be null');
		// enter password
		client.setValue('#password', password, function(err){
			errorScreenShot(err, 'Entering password error should be null');
			// click on login button
			client.click('#loginBtn', function(err){
				errorScreenShot(err, 'Clicking on login button error should be null');
				client.pause(1000, function(err){
					callback();
				});
			});
		});
	});
};
