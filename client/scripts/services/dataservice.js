(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.factory('dataservice', dataservice);

	function dataservice($http, authToken){

		var service = {
			getImagesByUser: getImagesByUser,
			getAlbumsByUser: getAlbumsByUser,
			getContent: getContent,
			getImage: getImage,
			getAlbum: getAlbum
		};

		return service;

		function getImagesByUser(){
			var token = authToken.getToken();
			return	$http
									.get('/api/v1/images/user/?access_token=' + token)
								 	.then(function successCallback(response){ 
								 		return response;
								  }, function errorCallback(response){ 
								  	return response; 
								  }); 
		}

		function getAlbumsByUser(){
			var token = authToken.getToken();

			return $http
							.get('/api/v1/albums/user?access_token=' + token)
							.then(function successCallback(response){ 
								return response; 
							}, function errorCallback(response){
								return response; 
							});
		}


		function getContent(){

			return $http
								.get('/api/v1/contents')
								.then(function successCallback(response){ 
									return response; 
								}, function errorCallback(response){
									return response; 
								});
	      
		}

		function getImage(params){

			var link = params.link;

			return $http
							.get('/api/v1/images/' + link)
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


	}


})();