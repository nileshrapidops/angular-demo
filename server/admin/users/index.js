var router = express.Router();

var controller = require('./users.controller');
router.post('/do-login',controller.CheckLogin);
module.exports=function(app){
	app.use('/admin/users',router);
};