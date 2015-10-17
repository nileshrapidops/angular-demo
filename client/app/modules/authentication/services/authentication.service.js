(function() {
    'use strict';
    angular
        .module('AngularDemoApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$q'];

    function AuthenticationService($http, $q) {
        var service = {};
        service.CheckLogin = CheckLogin;
        return service;

        function CheckLogin(postData){
            var deferred = $q.defer();
                var option = {
                    method:'POST',
                    url:'/admin/users/do-login',
                    data:postData
                };
                $http(option).success(function(data,status,headers){
                    if (data.Status == 'success') {
                        deferred.resolve(data.Data);
                    } else {
                        deferred.reject(data.Error);
                    }
                }).error(function(data,status,headers){
                    deferred.reject(data);
                });
                return deferred.promise;
        }
    }
})();