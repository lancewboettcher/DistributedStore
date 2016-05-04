'use strict';

var test = require('tape');

module.exports = loadMetaTests;

function loadMetaTests(p, options) {
  test('remove all state', function(t) {
    p.removeAllState('node id', function(err) {
      t.ok(!err, err && err.message);
      t.end();
    });
  });

  test('remove all state removed data', function(t) {

    if (!Array.isArray(options.newReads)) {
      throw new Error('need options.newReads as an array');
    }

    var rs = p.createReadStream('node id');

    rs.on('data', function() {
      t.ok(false, 'still has data');
    });

    rs.once('end', t.end.bind(t));
  });
}