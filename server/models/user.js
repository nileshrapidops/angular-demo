var Schema = GLOBAL.mongoose.Schema;
var mongoose = require('mongoose');

var UserSchema = new Schema({
	firstName : {type: String},
	lastName  : {type: String},
	email     : {type: String},
	mobile    : {type: String},
	password  : {type: String},
	lastLogin : {type: Number}
},{
	collection:'users',
	versionKey: false
});

mongoose.model('User', UserSchema);
var User = mongoose.models.User;
GLOBAL.User = User;

User.checkLogin = function(email, password, callback) {
	User.findOne({email: email, password: password}, function(err, result){
		if(err) {
			callback(err);
		} else {
			callback(null, result);
		}
	});
}
// var data = {
// 	'firstName': 'admin',
// 	'lastName': 'admin',
// 	'email': 'test@admin.com',
// 	'mobile': '8401434544',
// 	'password': 'admin'
// };
// var user = new User(data);
// user.save(function(err, res){
// 	console.log(res);
// });