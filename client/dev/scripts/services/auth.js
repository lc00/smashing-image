
(function(){
	angular
		.module('smashingImmage')
		.factory('auth', auth);

		auth.$inject = ['$window'];

		function auth($window) {
			var storage = $window.localStorage;
			var currentUser;
			var cachedToken;
			// var currentUser = 'currentUser';
		  var isAuthenticated = false;

			var auth = {
				setUser: function(currentUser){
						currentUser = JSON.stringify(currentUser);
						storage.setItem('currentUser', currentUser);
						isAuthenticated = true;
				},
				getToken: function(){
						currentUser = storage.getItem('currentUser');
						if (currentUser) {
							cachedToken = JSON.parse(currentUser).token; 
						}

						return cachedToken;
				},
				isAuthenticated: function(){
					return !!auth.getToken();
				},
				removeUser: function(){
					cachedToken = null;
					storage.clear(currentUser);
					isAuthenticated = false;
				},
				// check if it has been over 8-hr since token was last created
				isTokenExpired: function(){
					var now = new Date();
		      var currentTime = now.getTime();
		      currentUser = storage.getItem('currentUser');

		      if (currentUser){
			      var diff = currentTime - JSON.parse(currentUser).tokenCreatedTime;
			      // 8hr * 60min * 60sec * 1000ms = 28800000
			      var eightHourInMilliseconds = 28800000; 

			      if(diff > eightHourInMilliseconds) return true;
			    }

		      return false;
				}
			};

			return auth;
		}

}());

