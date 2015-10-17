'use strict';
var Product = global.Product;

exports.ProductList = ProductList;
exports.SaveProduct = SaveProduct;

function ProductList(req, res){
	Product.productList(function(err, products){
		if(err){
			res.sendError(new Exception('GeneralError'));
		}else{
			res.sendResponse(products);
		}
	});
}

function SaveProduct(req, res) {
	var postData = req.body;
	var productName = postData.productName;
	var productPrice = postData.productPrice;
	//validation block of API parameters
	if(productName === undefined || productName === ''){
		res.sendError(new Exception('ValidationError', 'Please enter product name.'));
		return;
	}
	if(productPrice === undefined || productPrice === ''){
		res.sendError(new Exception('ValidationError', 'Please enter product price.'));
		return;
	}
	var product = new Product(postData);
	product.save(function(err, product){
		if(err) {
			res.sendError(new Exception('GeneralError'));
		} else {
			res.sendResponse(product);
		}
	});
}