/*#######################################################################
  app-angular.js

  /app
      /controllers      
      /directives
      /services
      /partials
      /views
#######################################################################*/
var app = angular.module('discussionsApp', ['ngRoute', 'angularMoment']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/discussions',
            {
                templateUrl: '/angularjs/partials/listDiscussions.html',
                controller: 'DiscussionsController'
            })

        .when('/createDiscussion',
            {
                templateUrl: '/angularjs/partials/createDiscussion.html',
                controller: 'DiscussionsController'
            })

        .when('/viewDiscussion/:discussionTag/:discussionID',
            {
                templateUrl: '/angularjs/partials/viewDiscussion.html',
                controller: 'ViewDiscussionsController'
            })
        
        .otherwise({ redirectTo: '/discussions' });
});

app.run(function(amMoment) {
    amMoment.changeLocale('pt-br');
});



