(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.factory('dataStorage', dataStorage);

	function dataStorage($http, auth){
		var obj = {}

		var data = {
			getter: getter,
			setter: setter
		};

		return data;

		function getter(key){
			return obj[key];
		}

		function setter(key, value){
			obj[key] = value;
			return key;
		}


	}


})();