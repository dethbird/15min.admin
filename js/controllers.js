var siteControllers;

siteControllers = angular.module('siteControllers', []);



siteControllers.controller('LoginController', function ($scope, $rootScope, $http, $location) {
	//scope function on form submit from the view
	$scope.auth = function(user){
		//console.log(angular.toJson(user));
		$http({
	       url: api_url + '/auth/?api_key=' + api_key,
	       method: "POST",
	       headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
	       },
	       params : user
	  	}).success(function(data) { 
	  		$rootScope.api_key = data.data.api_key;
	  		$rootScope.user = data.data;
	  		$location.path( "/" );
  		}).error(function(data) {
  			user.email = "";
  			user.password = "";
  			alert("Invalid username / password");
  		});
	};
});

siteControllers.controller('NowplayingController', function ($scope, $rootScope, $http) {
	$http.get(api_url + '/nowplaying/?api_key=' + $rootScope.api_key).success(function(data) {
		//console.log(data.data);
		$scope.data = data.data;
	});
});

siteControllers.controller('PlayController', function ($scope, $rootScope, $http, $routeParams) {
	$http.get(api_url + '/galleries/?api_key=' + $rootScope.api_key + "&id=" + $routeParams.galleryId).success(function(data) {
		$(data[0].contents).each(function(i,content){
			//console.log(content.image_url);
			thumbnail_url = $.url('protocol', content.image_url) + 
							"://" +
							$.url('sub', content.image_url) + 
							"." + 
							$.url('domain', content.image_url) + 
							"/w180-h180" + 
							$.url('path', content.image_url);
			//console.log(thumbnail_url);
			data[0].contents[i].thumbnail_url = thumbnail_url;
		});
		$scope.data = data;
	});
});
