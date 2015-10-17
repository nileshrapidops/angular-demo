'use strict';
(function(){
	angular
		.module('AngularDemoApp')
		.controller('NewProductController', Controller);

	Controller.$inject=['$rootScope','$scope','$state','ProductService'];
	function Controller($rootScope,$scope,$state,ProductService) {
		var vm=this;
		vm.SaveProduct = SaveProduct;
		Activate();

		function Activate(){
			vm.active = true;
		}
		
		function SaveProduct() {
			if($scope['saveProductForm'].$valid){
				var postData = {
					'productName': vm.productName,
					'productPrice': vm.productPrice,
					'productDesc': vm.productDesc,
					'active': vm.active
				}
				console.log(postData);
				ProductService.SaveProduct(postData)
				.then(function(data){
					$state.go('app.products.list');
				}, function(err){

				});
			}
		}
	}

})();