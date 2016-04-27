var express = require('express');
var router = express.Router();
//var raft = require('../config/raft');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/join', function(req, res, next) {

  	console.log("Joining: " + req.body.id);
	var node = req.app.get('node');

	node.join(req.body.id, function(err) {
      if (err) {
      	console.log("ERRROR Joinging")
        console.log(err);
      }

      res.send("Joined");
    });

});

router.get('/node', function(req, res, next) {

	var node = req.app.get('node');

	res.send(node.id);
});

router.get('/:key', function(req, res, next) {

  	console.log("Getting: " + req.params.key);
	var node = req.app.get('node');

	node.get(req.params.key, function (err, value) {
	    if (err) console.log('Ooops!', err); // likely the key was not found

	    res.send(req.params.key + " : " + value);
	  })

});

router.post('/', function(req, res, next) {

  	console.log("Putting: " + req.body.key + " : " + req.body.value);
	var node = req.app.get('node');

	node.put(req.body.key, req.body.value, function (err) {
	  if (err) console.log('Ooops!', err); // some kind of I/O error

	  // 3) fetch by key
	  node.get(req.body.key, function (err, value) {
	    if (err) console.log('Ooops!', err); // likely the key was not found

	    res.send(value);
	  })
	})

});

router.get('/test', function(req, res, next) {
	console.log("API");
	var port = req.app.get('port');
	console.log(port);

	var node = req.app.get('node');

	node.put('name', 'LevelUP', function (err) {
	  if (err) console.log('Ooops!', err); // some kind of I/O error

	  // 3) fetch by key
	  node.get('name', function (err, value) {
	    if (err) console.log('Ooops!', err); // likely the key was not found

	    // ta da!
	    console.log('name=' + value);
	    res.send('name=' + value);
	  })
	})

  //res.send("Success");
});

router.get('/spawn', function(req, res, next) {
  console.log("spawn");

  console.log("Success");
});


module.exports = router;
