(function() {
    'use strict';
    angular
        .module('AngularDemoApp')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$http', '$q'];

    function ProductService($http, $q) {
        var service = {};
        service.ProductList = ProductList;
        service.SaveProduct = SaveProduct;
        return service;

        function ProductList(){
            var deferred = $q.defer();
                var option = {
                    method:'GET',
                    url:'/admin/products'
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

        function SaveProduct(postData){
            var deferred = $q.defer();
                var option = {
                    method:'POST',
                    url:'/admin/products',
                    data: postData
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