var spawn = require('child_process').spawn;
var portfinder = require('portfinder');
var hostname = require('os').hostname();
var nodes = [];
var leader = {};

module.exports.killNode = function(pid) {

    console.log("Killing Node: " + pid);

    for(var i = 0; i < nodes.length; i++) {
        if (nodes[i].pid == pid) {
            process.kill(pid);
            nodes.splice(i, 1);

            if (leader.pid == pid)
                leader = {};
        }
    }
};

module.exports.killAll = function() {
    for(var i = 0; i < nodes.length; i++) {
        process.kill(nodes[i].pid);
    }
    nodes = [];
   // leader = {};
};

module.exports.spawnNodes = function(n, parent, cb) {
    console.log("Spawning " + n + " nodes");
    var ports = [];
    getPorts(n * 2, function(data) {
        console.log(data);

        for (var i = 0; i < n; i++) {
            (function(i){
                var port = data[i];
                var skiffPortIndex = parseInt(i) + parseInt(n);
                console.log("index: " + skiffPortIndex);

                console.log("Spawning Node: " + nodes.length + " On port " + port);
                console.log("Skiffport [" + skiffPortIndex + "] : " + data[skiffPortIndex]);

                var options = {};
                options.cwd = "../RaftDistributedStore/";
                options.env = Object.create( process.env );
                options.env.PORT = port;
                options.env.SKIFFPORT = data[skiffPortIndex];

                if (nodes.length == 0)
                    options.env.LEADER = true;
                else 
                    options.env.LEADER = false;

                console.log(options);

                var child = spawn('./bin/www', [], options);
                console.log("PID: " + child.pid);
                child.port = port;
                child.skiffPort = data[skiffPortIndex];
                child.parent = parent;
                nodes.push(child);

                // Listen for any response:
                child.stdout.on('data', function (data) {

                    console.log(child.pid, data.toString());

                    if (data.toString().indexOf("now leader") > -1) {
                        console.log("PARENT: " + child.pid + " is leader");
                        leader.pid = child.pid;
                        leader.port = child.port;
                        leader.parent = child.parent;
                    }
                });

                // Listen for any errors:
                child.stderr.on('data', function (data) {
                    console.log(child.pid, data.toString());
                }); 

                // Listen if the process closed
                child.on('close', function(exit_code) {
                    console.log('Closed before stop: Closing code: ', exit_code);
                });

                if (i == (n - 1)) {
                    return cb(module.exports.getNodes());
                }
                  
            })(i)
        }   
    });
};

function getPorts(n, call) {
    var ports = [];

    portfinder.getPorts(parseInt(n), function (err, ports) {
        console.log("***PORTS***");
        console.log(ports);
        call(ports);
    });
}

module.exports.getNodes = function() {
    var data = [];
    for (var i = 0; i < nodes.length; i++) {
        var thisNode = {};

        thisNode.pid = nodes[i].pid;
        thisNode.port = nodes[i].port;
        thisNode.skiffPort = nodes[i].skiffPort;
        thisNode.parent = nodes[i].parent;

        data.push(thisNode);
    }
    return data;
};

module.exports.getLeader = function() {
    return leader;
};