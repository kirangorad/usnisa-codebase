var appHome = angular.module('myApp', ['app.config']);

appHome.controller('latestPropertyController' , ['$scope','$http', 'app.config',function($scope, $http, config) {

	console.log("This is message from latest prperty controller",config.basePath);

	$http({
		method: 'GET',
		url: config.basePath + '/list/',
		//data: $scope.login,
		//withCredentials: true
		}).success(function(response) {
			console.log(response);
			$scope.latestProperties = response;
		})
		.error(function (error, status){
			console.log(error, status); 
		});
	
//	$scope.logIn = function() {

	//console.log($scope.login);
	  
	//};

}]);