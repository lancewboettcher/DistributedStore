'use strict';

var test = require('tape');

module.exports = lastAppliedCommitIndexAfterSaveTests;

function lastAppliedCommitIndexAfterSaveTests(p, options) {
  test('last applied commit index after save', function(t) {
    p.lastAppliedCommitIndex('node id', function(err, commitIndex) {
      t.ok(!err, err && err.message);
      t.equal(commitIndex, options.commands.length + 1);
      t.end();
    });
  });
}