'use strict';
(function(){
	angular
		.module('AngularDemoApp')
		.controller('LoginController', Controller);

	Controller.$inject=['$rootScope','$scope','AuthenticationService','$state','$stateParams'];
	function Controller($rootScope,$scope, AuthenticationService, $state,$stateParams){
		var vm=this;
		vm.isValidUser = true;
		vm.authMessage = '';
		vm.DoLogin = DoLogin;
		Activate();

		function Activate(){
		}
		function DoLogin(){
			if($scope['loginForm'].$valid){
				var postData = {
					email: vm.email,
					password: vm.password
				};
				AuthenticationService.CheckLogin(postData)
				.then(function(data){
					if(data.firstName) {
						$state.go('app.products.list');
					} else {
						vm.isValidUser = false;
						vm.authMessage = 'Invalid User';
					}
				}, function(err){

				});
			}
		}
	}

})();