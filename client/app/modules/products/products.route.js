(function() {
	angular
		.module('AngularDemoApp')
		.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('app.products.list', {
			url:'/list',
			controller:'ProductsListController',
			controllerAs:'vm',
			resolve: {
				'productsList': ['ProductService', function (ProductService) {
					return ProductService.ProductList();
				}]
			},
			templateUrl:'/app/modules/products/templates/products-list.html'
		})
		.state('app.products.new', {
			url:'/new',
			controller:'NewProductController',
			controllerAs:'vm',
			templateUrl:'/app/modules/products/templates/save-product.html'
		});
		// .state('app.items.edit', {
		// 	url:'/:id/edit',
		// 	controller:'ItemEditController',
		// 	controllerAs:'vm',
		// 	resolve:{
		// 		'Authorization':['UserAuthorizationService', 'userProfile', function checkAuthorization(UserAuthorizationService, userProfile){
		// 			return UserAuthorizationService.isAuthorized('ITEMS_CANEDIT',false);
		// 		}],
		// 		'itemDetail': ['ItemService', '$stateParams', function(ItemService, $stateParams){
		// 			return ItemService.GetItemDetail($stateParams.id);
		// 		}]
		// 	},
		// 	templateUrl:'/app/modules/items/templates/item-add.html'
		// });
	}
})();