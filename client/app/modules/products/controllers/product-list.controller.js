'use strict';
(function(){
	angular
		.module('AngularDemoApp')
		.controller('ProductsListController', Controller);

	Controller.$inject=['$rootScope','$scope','$state','productsList'];
	function Controller($rootScope,$scope,$state,productsList) {
		var vm=this;
		var defaultPageSize = 50;
		vm.gridOptions = {
			'columnDefs':[],
			'rowData':null,
			'totalRows':0,
			'pageSize':defaultPageSize,
			'rowHeight':35,
			'headerHeight':40,
			'pageSizes':[25,50,100,250,500,750,1000],
			'enableColResize': true,
			'enablePagging':false,
			'enableSorting':true,
			'enableServerSideSorting':false,
			'enableFilter':true,
			'enableServerSideFilter':false
		};
		vm.gridActions = [];
		Activate();

		function Activate(){
			console.log(productsList);
			// set column defination
			vm.gridOptions.columnDefs = [
				{
					field:'productName',
					headerName:'Product Name',
					// width:150,
					suppressSorting:false, // for sorting
					suppressMenu:false,
					suppressSizeToFit:false,
					filter:true
				},
				{
					field:'productPrice',
					headerName:'Last Name',
					// width:150,
					suppressSorting:false, // for sorting
					suppressMenu:false,
					suppressSizeToFit:false,
					filter:true
				},
				{
					field:'productDesc',
					headerName:'Product Description',
					// width:270,
					suppressSorting:false, // for sorting
					suppressMenu:false,
					suppressSizeToFit:false,
					filter:true
				},
				{
					field:'active',
					headerName:'Active',
					// width:180,
					suppressSorting:false, // for sorting
					suppressMenu:false,
					suppressSizeToFit:false,
					filter:true
				}
			];

			vm.gridOptions.rowData = productsList;
		}
	}

})();