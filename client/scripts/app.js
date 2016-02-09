(function(){
	// 'use strict'

	var app = angular.module('smashingImmage', ['ui.router', 'ngFileUpload', 'ui.bootstrap', 'ngAnimate']);

	app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('landing', {
				url: '/',
				templateUrl: '../views/landing.html',
				controller: 'Landing',
				resolve: {
					result: function(dataservice){
						// returns a promise
						return dataservice.getContent();
					}
				}
			})
			.state('imageInner', {
				url: '/imageInner',
				templateUrl: '../views/imageInner.html',
				params:{param: null},
				controller: 'ImageInner'
			})
			.state('albumInner', {
				url: '/albumInner',
				templateUrl: '../views/albumInner.html',
				params:{album: null, landing: null},
				controller: 'AlbumInner'
			})
			.state('login', {
				url: '/login',
				templateUrl: '../views/login.html',
				controller: 'LogIn' 
			})
			.state('logout', {
				url: '/logout',
				controller: 'LogOut' 
			})
			.state('signup', {
				url: '/signup',
				templateUrl: '../views/signup.html',
				controller: 'SignUp'
			})
			.state('add', {
				url: '/add',
				templateUrl: '../views/add.html',
				controller: 'Add'
			})
			.state('images', {
				url: '/images',
				templateUrl: '../views/images.html',
				controller: 'Images',
				resolve: {
					result: function(dataservice){
						return dataservice.getImagesByUser() 
					}
				}
			})
			.state('albums', {
				url: '/albums',
				templateUrl: '../views/albums.html',
				controller: 'Albums',
				resolve: {
					result: function(dataservice){
						return dataservice.getAlbumsByUser() 
					}
				}
			})
			.state('i', {
				url: '/i/:link',
				templateUrl: '../views/i.html',
				controller: 'I',
				resolve: {
					result: function(dataservice, $stateParams){
						return dataservice.getImage($stateParams);
					}
				}
			})
			.state('a', {
				url: '/a/:link',
				templateUrl: '../views/a.html',
				controller: 'A',
				resolve: {
					result: function(dataservice, $stateParams){
						return dataservice.getAlbum($stateParams);
					}
				}
			});
	});
})();

