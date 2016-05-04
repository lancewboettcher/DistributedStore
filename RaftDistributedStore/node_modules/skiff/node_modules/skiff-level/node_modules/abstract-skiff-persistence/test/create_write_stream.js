'use strict';

var async = require('async');
var test = require('tape');

module.exports = createWriteStreamTests;

function createWriteStreamTests(p, options) {

  test('write stream saves data', function(t) {

    if (!Array.isArray(options.newWrites)) {
      throw new Error('need options.newWrites as an array');
    }
    var ws = p.createWriteStream('node id');

    async.eachSeries(options.newWrites, ws.write.bind(ws), done);

    function done(err) {
      t.ok(!err, err && err.message);
      ws.end();
      t.end();
    }

  });

  test('writes were persisted', function(t) {

    if (!Array.isArray(options.newReads)) {
      throw new Error('need options.newReads as an array');
    }

    var rs = p.createReadStream('node id');
    var index = 0;

    rs.on('data', function(d) {
      t.deepEqual(d, options.newReads[index ++]);
    });

    rs.once('end', function() {
      t.equal(index, options.newReads.length);
      t.end();
    });
  });
}