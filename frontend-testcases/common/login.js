/*
	Author: Nilesh Mistry
*/
/*
	This function is used for login
	callback : function will execute after complition of login
*/
module.exports.login = function(username, password){
	if(username == null || username == undefined)
		username = "";
	if(password == null || password == undefined)
		password = "";
	return client.setValue('#email', username)
		.setValue('#password', password)
		.click('#loginBtn');
};
