## Cal Poly Distributed Computing (CPE 469) - Distributed Key-Value Store

Two Phase Commit and Raft consensus algorithm implementations built on top of [LevelDB](http://leveldb.org/). Uses [level-2pc](https://github.com/0x00A/level-2pc) for the Two Phase Commit and [Skiff](https://github.com/pgte/skiff) for the Raft consensus algorithm.

## Installing

This application uses three separate node projects. Clone the repo and install all necessary packages like this: 

```sh
$ git clone https://github.com/lancewboettcher/DistributedStore.git
$ cd DistributedStore
$ cd DistributedStoreDemo
$ npm install
$ cd ..
$ cd RaftDistributedStore
$ npm install
$ cd ..
$ cd TwoPhaseCommitDistributedStore
$ npm install
$ cd ..
```

## Running 

After installing all packages, run the demo application like this: 

```sh
$ cd DistributedStoreDemo
$ npm start
```

Then open [localhost:3000](http://localhost:3000/) in a browser. 

## Using the Demo Application

In order to use the demo application you must enable cross origin resource sharing in your browser. Use something like [this](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) Chrome extension

### Two Phase Commit 

1. Ensure that "Two Phase Commit" is the selected algorithm. 
2. Spawn a single node for others to connect to. 
3. After one node is up in the table, spawn more nodes singly or mass spawn nodes.
4. "Test" any node to PUT or GET from any node and watch the data show up on all nodes in the cluster. 
5. "Kill" any node and see that you can still get all data from any node (as long as there are two nodes up for consensus)

### Raft

1. Ensure that "Raft" is the selected algorithm. 
2. Spawn a single node to be the initial leader. 
3. Press "Get Leader" and make sure that the "Leader" tag populates on the node. (If not, kill all nodes and try again)
3. After the initial node is marked as "Leader," spawn more nodes singly or mass spawn nodes.
4. "Test" any node to GET from any node and watch the data show up on all nodes in the cluster. You can only PUT to the leader node
5. "Kill" any node and see that you can still get all data from any node. Kill the leader node and press "Get Leader" to see a new leader get elected. 

### Multiple Hosts 

You can distribute the application on multiple machines by installing and running the application on all machines in the cluster. 

1. Start the demo application on all machines. 
2. Spawn a single node through the web interface of one of the hosts. ("Get Leader" if using Raft)
3. Specify the host name and port of another machine running the demo in the "Parent" field. 
4. Spawn single or multiple nodes on different hosts and watch them all connect and share data. 

## Contributors

* Lance Boettcher
* Mikail Gundogdu
