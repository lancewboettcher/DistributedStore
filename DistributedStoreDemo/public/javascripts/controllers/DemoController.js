angular.module('DemoCtrl', []).controller('DemoController', function($scope, $http, $location, nodes, leader) {

	$scope.nodes = nodes;
	$scope.activeNode;
	$scope.nodesToSpawn = 10;
	$scope.leader = leader;
	$scope.getResponse;
	
	$scope.csv = {};
	$scope.csv.separator = ',';
	$scope.batchPut = {};
	$scope.batchPut;
	$scope.batchPut.keys = [];


	$scope.spawn = function(numNodes) {
		$http.get("/spawn/" + numNodes).success(function(data, status) {
			$scope.nodes = data;
			
            console.log("Spawned " + numNodes + " Nodes");

            var payload = {};
            payload.id = "tcp+msgpack://localhost:" + data[data.length - 1].port;
            console.log("Trying to join with: " + payload.id);

            if ($scope.leader.port != undefined && $scope.leader.port != "undefined") {
	            $http.post("http://localhost:" + $scope.leader.port + "/join/",payload).success(function(data, status) {
					
		            console.log("Joined maybe");
		        });
	    	}
        });
	};
	$scope.kill = function(pid) {
		$http.get("/kill/" + pid).success(function(data, status) {
			$scope.nodes = data;

			$scope.getLeader();
        });
	};

	$scope.setActiveNode = function(node) {
		$scope.activeNode = node;
		$scope.getResponse = ""
		//$scope.activeUrl = $location + node.port;
	}

	$scope.get = function(key) {
		var data = {};
		data.key = key;
		$http.post('http://localhost:' + $scope.activeNode.port + "/get", data).success(function (response) {
			console.log("Response: " + response);
			if (response != undefined && response != "")
				$scope.getResponse = response;
			else 
				$scope.getResponse = "No Result";
			
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
			$scope.activeNode = null;
		});
	}
	$scope.getLeader = function() {
		$http.get('/leader').success(function (response) {
			console.log("Leader");
			$scope.leader = response;
		});
	}

	$scope.$watch('csv.result', function(newValue, oldValue) {
		console.log("changed:");
		var thisKey = {};
		if ($scope.csv.result != undefined) {
			for (var property in $scope.csv.result[0]) {
				/*thisKey.name = $scope.csv.result[0][property];
				thisKey.index = property;
				$scope.batchPut.keys.push(thisKey);*/
				//console.log(property);
				$scope.batchPut.keys.push({index:property,name:$scope.csv.result[0][property]});
			}
		}	
	});

	$scope.putBatch = function(key, value1, value2, min, max) {
		var data = [];
		var entry = {};
		var val = {};
		for (var i = min; i < max; i++) {
			entry = {};
			val = {};

			entry.type = 'put';
			entry.key = $scope.csv.result[i][key];

			if (value2 != undefined && value2 != null && value2 != "") {
				val[$scope.csv.result[i][value1]] = $scope.csv.result[i][value2];
			}
			else {
				val = $scope.csv.result[i][value1];
			}
			entry.value = val;

			data.push(entry);
		}
		console.log(data);
		
		$http.post('http://localhost:' + $scope.activeNode.port + "/batch", data).success(function (response) {
			console.log(response);
			if (response == undefined || response == "") {
				alert("Can't write to this. Not the leader");
			}
		});
	}
});