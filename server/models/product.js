var Schema = GLOBAL.mongoose.Schema;
var mongoose = require('mongoose');

var ProductSchema = new Schema({
	productName  : {type: String},
	productPrice : {type: String},
	productDesc  : {type: String},
	active       : {type: Boolean}
},{
	collection:'products',
	versionKey: false
});

mongoose.model('Product', ProductSchema);
var Product = mongoose.models.Product;
GLOBAL.Product = Product;

Product.productList = function(callback) {
	Product.find({}, function(err, result){
		if(err) {
			callback(err);
		} else {
			callback(null, result);
		}
	});
}
// var data = {
// 	'productName': 'parle-g',
// 	'productPrice': '10.00',
// 	'productDesc': 'For children',
// 	'active': true
// };
// var product = new Product(data);
// product.save(function(err, res){
// 	console.log(res);
// });