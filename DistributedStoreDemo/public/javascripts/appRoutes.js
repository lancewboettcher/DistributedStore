angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'DemoController',
            resolve: {
                nodes: function($http) {
                    return $http({method : "GET", url : "/nodes"}).then(function(result) {
                        return result.data;
                    })
                },
                leader: function($http) {
                    return $http({method : "GET", url : "/leader"}).then(function(result) {
                        return result.data;
                    })
                }/*,
                algorithm : function($http, $routeParams) {
                    console.log("here");
                    return $routeParams.algorithm;
                }*/
            }
        })

        .when('/nerds', {
            templateUrl: 'views/home.html',
            controller: 'DemoController'
        })

        .when('/geeks', {
            templateUrl: 'views/geek.html',
            controller: 'GeekController'    
        });

    $locationProvider.html5Mode(true);

}]);
