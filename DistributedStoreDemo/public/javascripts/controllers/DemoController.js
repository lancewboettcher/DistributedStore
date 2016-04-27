angular.module('DemoCtrl', []).controller('DemoController', function($scope, $http, $location, nodes, leader) {

	$scope.nodes = nodes;
	$scope.activeNode;
	$scope.nodesToSpawn = 10;
	$scope.leader = leader;
	$scope.getResponse;

	$scope.spawn = function(numNodes) {
		$http.get("/spawn/" + numNodes).success(function(data, status) {
			$scope.nodes = data;
			
            console.log("Spawned " + numNodes + " Nodes");

            var payload = {};
            payload.id = "tcp+msgpack://localhost:" + data[data.length - 1].port;
            console.log("Trying to join with: " + payload.id);

            $http.post("http://localhost:8000/join/",payload).success(function(data, status) {
				
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
		$scope.getResponse = ""
		//$scope.activeUrl = $location + node.port;
	}

	$scope.get = function(key) {
		$http.get('http://localhost:' + $scope.activeNode.port + "/" + key).success(function (response) {
			$scope.getResponse = response;
			console.log("Response: " + response);
		});
	}
	$scope.put = function(key, value) {
		var data = {};
		data.key = key;
		data.value = value;
		$http.post('http://localhost:' + $scope.activeNode.port + "/", data).success(function (response) {
			console.log(response);
			if (response == undefined || response == "") {
				alert("Can't write to this. Not the leader");
			}
		});
	}
	$scope.deleteData = function() {
		$http.get('/deleteData').success(function (response) {
			console.log("Deleting data");
			console.log(response);
		});
	}
	$scope.killAll = function() {
		$http.get('/killAll').success(function (response) {
			console.log("Killed All");
			$scope.nodes = [];
		});
	}
	$scope.getLeader = function() {
		$http.get('/leader').success(function (response) {
			console.log("Leader");
			$scope.leader = response;
		});
	}
});