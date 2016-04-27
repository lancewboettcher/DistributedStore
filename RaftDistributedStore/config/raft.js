var Skiff = require('skiff');

//module.exports.init = function(port, app) {
	console.log("INITIALIZING RAFT");

    var dbName = '../DB' + port;
	console.log("DB: " + dbName);
	var options = {
	  dbPath: dbName, 
	  standby: true
	};

	var node = Skiff('tcp+msgpack://localhost:' + port, options);
	app.set('node',node);

	node.once('joined', function() {
	      console.log("process joined");
	    });

	node.once('state', function(state) {
	      console.log("state change");
	      console.log(state);
	    });
	node.once('leader', function() {
	  console.log(port + " now leader");
	});
//};