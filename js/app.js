var api_key, api_url;
api_key = "e657fd23e9a0c5e43513d7f5a2cdc308";
api_url = "http://ec2-54-201-133-12.us-west-2.compute.amazonaws.com";

var siteApp;

siteApp = angular.module('siteApp', [
  'ngRoute',
  'siteControllers'
]);

siteApp.filter('momentunix', function(){
    return function(input, format) {
      return moment.unix(input).format(format);
    }
});
siteApp.filter('drawVideo', function(){
    return function(video_id, video_provider,elementId) {
      if(video_provider==="youtube"){
          $('#' + elementId).html( '<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/' + video_id + '?autoplay=0&origin=http://15m.in" frameborder="0"/>' );
      }
    }
});
siteApp.filter('picker', function(){
    return function(timeslot, elementId) {
      $('#' + elementId).datetimepicker({defaultDate:moment.unix(timeslot).format("MM/DD/YYYY h:mm:ss a Z")});
      $('#' + elementId).on("change.dp",function (e) {
          $('#timeslot').val(moment(e.date._d).unix());
      });
    }
});
 
siteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      }).
      when('/programs', {
        templateUrl: 'partials/program-list.html',
        controller: 'ProgramsController'
      }).
      when('/programs/add', {
        templateUrl: 'partials/program-details.html',
        controller: 'ProgramDetailsController'
      }).
      when('/programs/:programId', {
        templateUrl: 'partials/program-details.html',
        controller: 'ProgramDetailsController'
      }).
      otherwise({
        redirectTo: '/error',
        templateUrl: 'partials/error.html'
      });
  }]);

siteApp.run( function($rootScope, $location) {
  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if ( $rootScope.api_key == null ) {
      // no logged user, we should be going to #login
      if ( next.templateUrl == "partials/login.html" ) {
        // already going to #login, no redirect needed
      } else {
        // not going to #login, we should redirect now
        $location.path( "/login" );
      }
    }
  })
});