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
	  		$location.path( "/programs" );
  		}).error(function(data) {
  			user.email = "";
  			user.password = "";
  			alert("Invalid username / password");
  		});
	};

});

siteControllers.controller('ProgramsController', function ($scope, $rootScope, $http) {
	$http.get(api_url + '/programs/?api_key=' + $rootScope.api_key)
	.success(function(data) {
		$scope.data = data.data;
	});
});

siteControllers.controller('ProgramDetailsController', function ($scope, $rootScope, $http, $routeParams) {
	if($routeParams.programId !== undefined){
		$http.get(api_url + '/programs/' + $routeParams.programId + '/?api_key=' + $rootScope.api_key)
		.success(function(data) {
			$scope.data = data.data;
		});
	} else {
		var data;
		data = Array();
		data.push({id:"new"});
		$scope.data = data;
	}

	$scope.loadVideoFromUrl = function(video, program){
		if($.url('domain',video.url)=="youtube.com"){
			//console.log($.url('?v',video.url));
			program.provider = "youtube";
			program.external_id = $.url('?v',video.url);

			$http.get('http://gdata.youtube.com/feeds/api/videos/'+program.external_id+'?v=2&alt=jsonc').then(function(response) {
			  	program.title = response.data.data.title;
        		program.description = response.data.data.description;
        		program.thumbnail_url = response.data.data.thumbnail.hqDefault;
			});
			
		}
	}

	$scope.save = function(program){
		console.log(program);
	}
});

