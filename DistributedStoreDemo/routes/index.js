var express = require('express');
var router = express.Router();
var path = require('path');

var demo = require('../config/demo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.resolve('./public/views/index.html'));
  //res.render('index', { title: 'Express' });
});

router.get('/nodes', function(req, res, next) {
  var nodes = demo.getNodes();

  res.send(nodes);
});

router.get('/spawn/:numNodes', function(req, res, next) {
  demo.spawnNodes(req.params.numNodes, function(data) {
	res.send(data);

  });
});

router.get('/kill/:pid', function(req, res, next) {
  demo.killNode(req.params.pid);

  res.send(demo.getNodes());
});

router.get('/check', function(req, res, next) {
  demo.check();

  res.send("Success");
});


/*router.post("/createUser", passport.authenticate('local-signup'),function(req, res){
    res.json(req.user);
});
*/
module.exports = router;
