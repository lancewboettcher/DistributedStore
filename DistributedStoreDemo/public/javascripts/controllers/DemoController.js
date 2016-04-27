angular.module('DemoCtrl', []).controller('DemoController', function($scope, $http, $location, nodes) {

	$scope.nodes = nodes;
	$scope.activeNode;

	$scope.spawn = function(numNodes) {
		$http.get("/spawn/" + numNodes).success(function(data, status) {
			$scope.nodes = data;
			
            console.log("Spawned " + numNodes + " Nodes");

            var payload = {};
            payload.id = "tcp+msgpack://localhost:" + data[data.length - 1].port;
            console.log("Trying to join with: " + payload.id);

            $http.post("http://localhost:8001/join/",payload).success(function(data, status) {
				
	            console.log("Joined maybe");
	        });
        });
	};
	$scope.kill = function(pid) {
		$http.get("/kill/" + pid).success(function(data, status) {
			$scope.nodes = data;
        });
	};

	$scope.setActiveNode = function(node) {
		$scope.activeNode = node;
		//$scope.activeUrl = $location + node.port;
	}

	$scope.get = function(key) {
		$http.get('http://localhost:' + $scope.activeNode.port + "/" + key).success(function (response) {
			$scope.getResponse = response;
			console.log(response);
		});
	}
	$scope.put = function(key, value) {
		var data = {};
		data.key = key;
		data.value = value;
		$http.post('http://localhost:' + $scope.activeNode.port + "/", data).success(function (response) {
			console.log(response);
		});
	}
});