(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.factory('dataservice', dataservice);

	function dataservice($http, auth, $q){
		var token = auth.getToken();

		var service = {
			getImagesByUser: getImagesByUser,
			getAlbumsByUser: getAlbumsByUser,
			getContent: getContent,
			getImage: getImage,
			getAlbum: getAlbum,
			updateImageInfo: updateImageInfo
		};

		return service;

		function httpPromise(url){
			var deferred = $q.defer();
			$http.get(url)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(){
					deferred.reject();
				}); 

			return deferred.promise;
		}

		function getImagesByUser(){
			// var token = auth.getToken();
			return	$http
									.get('/api/v1/images/user/?access_token=' + token)
								 	.then(function successCallback(response){ 
								 		return response;
								  }, function errorCallback(response){ 
								  	return response; 
								  }); 
		}

		function getAlbumsByUser(){
			// var token = auth.getToken();

			return $http
							.get('/api/v1/albums/user?access_token=' + token)
							.then(function successCallback(response){ 
								return response; 
							}, function errorCallback(response){
								return response; 
							});
		}


		function getContent(){
			return httpPromise('/api/v1/contents')
			// 	.then(function successCallback(response){ 
			// 					return response; 
			// 				}, function errorCallback(response){
			// 					return response; 
			// 				});
			// return $http
			// 					.get('/api/v1/contents')
			// 					.then(function successCallback(response){ 
			// 						return response; 
			// 					}, function errorCallback(response){
			// 						return response; 
			// 					});
	      
		}

		function getImage(params){

			var link = params.link;

			return $http
							.get('/api/v1/images/' + link )
	            .then(function successCallback(response){
                return response;
	            }, function errorCallback(response){
								return response;
	            });
		}

		function getAlbum(params){

			var link = params.link;

			return $http
							.get('/api/v1/albums/' + link)
	            .then(function successCallback(response){
                return response;
	            }, function errorCallback(response){
								return response;
	            });
		}

		function updateImageInfo(params) {
			// var token = auth.getToken();

			return $http
								.put('/api/v1/images?access_token=' + token, params)
								.then(function successCallback(response){ 
									// console.log(response)
									return response; 
								}, function errorCallback(response){
									console.log(response)
									return response; 
								});
	      
		}
		


	}


})();