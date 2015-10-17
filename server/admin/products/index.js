var router = express.Router();

var controller = require('./products.controller');
router.get('/',controller.ProductList);
router.post('/', controller.SaveProduct);
module.exports=function(app){
	app.use('/admin/products',router);
};