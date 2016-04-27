'use strict';

var test = require('tape');

module.exports = createReadStreamTests;

function createReadStreamTests(p, options) {
  test('read stream reads data', function(t) {

    var rs = p.createReadStream('node id');
    var index = 0;

    rs.on('data', function(d) {
      t.deepEqual(d, options.expectedReads[index ++]);
    });

    rs.once('end', function() {
      t.equal(index, options.expectedReads.length);
      t.end();
    });
  });
}