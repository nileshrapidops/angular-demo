'use strict';
(function(){
	angular.module('AngularDemoApp')
		.run(['$rootScope', '$state', '$stateParams', '$location', RunAngularDemoApp])
		.config(['$stateProvider', '$urlRouterProvider', ConfigAngularDemoApp]);

	function ConfigAngularDemoApp($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl:'/app/modules/authentication/templates/login.html',
				controller:'LoginController',
				controllerAs:'vm'
			})
			.state('app', {
				abstract:true,
				url:'/app',
				templateUrl:'/app/layout/app.html'	
			})
			.state('app.products', {
				url:'/products',
				abstract:true,
				templateUrl:'/app/layout/abstract.html'
			});
	}

	function RunAngularDemoApp($rootScope, $state, $stateParams, $location){
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.errorMessage = '';
		$rootScope.isError = false;
		$rootScope.successMessage = '';
		$rootScope.isSuccess = false;
		$rootScope.showloading = false;
		$rootScope.loadingMessage = '';
		$rootScope.title = 'HT Admin';
		$rootScope.userProfile = {};
		$rootScope.showProgress = function(msg){
			if(msg === undefined){
				msg = 'Loading...';
			}
			$rootScope.showloading = true;
			$rootScope.loadingMessage = msg;
		};
		$rootScope.hideProgress = function(){
			$rootScope.showloading = false;
		};
		Activate();
		function Activate(){
			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
				$rootScope.title = toState.title || 'HT Admin';
			});
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			});
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
				$rootScope.$emit('$progressEnd');
			});
		}
	}

	function CheckLogin(UserService, $q, $rootScope){
		var deferred = $q.defer();
		UserService.CheckLogin(window.location.hash)
			.then(function(userProfile){
				$rootScope.userProfile = userProfile;
				deferred.resolve(userProfile);
			})
			.catch(function(e){
				deferred.resolve({});
			});
		return deferred.promise;
	}
})();