'use strict';

var async = require('async');
var test = require('tape');

module.exports = applyCommandTests;

function applyCommandTests(p, options) {
  test('applies commands', function(t) {
    if (!Array.isArray(options.commands)) {
      throw new Error('need options.commands as an array');
    }
    var commitIndex = 0;

    async.eachSeries(options.commands, applyCommand, done);


    function applyCommand(command, cb) {
      p.applyCommand('node id', ++ commitIndex, command, cb);
    }

    function done(err) {
      t.ok(!err, err && err.message);
      t.end();
    }
  });
}