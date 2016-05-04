'use strict';

var test = require('tape');

module.exports = verifyCommandsTests;

function verifyCommandsTests(p, options) {
  test('verify commands', function(t) {
    if (!Array.isArray(options.expectedReads)) {
      throw new Error('options.expectedReads should be an array');
    }

    var rs = p.createReadStream('node id');
    var index = 0;

    rs.on('data', function(d) {
      t.deepEquals(d, options.expectedReads[index ++]);
    });

    rs.once('end', function() {
      t.equal(index, options.expectedReads.length);
      t.end();
    });
  });
}