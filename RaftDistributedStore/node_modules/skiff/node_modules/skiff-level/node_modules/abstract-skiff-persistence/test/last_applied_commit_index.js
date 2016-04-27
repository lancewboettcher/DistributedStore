'use strict';

var test = require('tape');

module.exports = lastAppliedCommitIndexTests;

function lastAppliedCommitIndexTests(p, options) {
  test('last applied commit index', function(t) {
    p.lastAppliedCommitIndex('node id', function(err, commitIndex) {
      t.ok(!err, err && err.message);
      t.equal(commitIndex, options.commands.length);
      t.end();
    });
  });
}