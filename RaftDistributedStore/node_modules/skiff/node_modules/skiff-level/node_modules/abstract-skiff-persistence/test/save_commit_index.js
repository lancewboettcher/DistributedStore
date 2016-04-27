'use strict';

var test = require('tape');

module.exports = saveCommitIndexTests;

function saveCommitIndexTests(p, options) {
  test('saves commit index', function(t) {
    p.saveCommitIndex('node id', options.commands.length + 1, saved);

    function saved(err) {
      t.ok(! err, err && err.message);
      t.end();
    }
  });
}