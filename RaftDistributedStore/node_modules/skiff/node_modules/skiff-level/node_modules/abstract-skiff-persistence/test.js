'use strict';

var test = require('tape');
var ASP = require('./');

test('saveMeta extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId', {some: 'state'}, function() {}];
  p._saveMeta = function() {
    t.deepEqual(toArray(arguments), args);
    t.end();
  };
  p.saveMeta.apply(p, args);
});

test('loadMeta extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId', function() {}];
  p._loadMeta = function() {
    t.deepEqual(toArray(arguments), args);
    t.end();
  };
  p.loadMeta.apply(p, args);
});

test('applyCommand extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId', 123, 'command', function() {}];
  p._applyCommand = function() {
    t.deepEqual(toArray(arguments), args);
    t.end();
  };
  p.applyCommand.apply(p, args);
});

test('lastAppliedCommitIndex extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId', function() {}];
  p._lastAppliedCommitIndex = function() {
    t.deepEqual(toArray(arguments), args);
    t.end();
  };
  p.lastAppliedCommitIndex.apply(p, args);
});

test('saveCommitIndex extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId', 123, function() {}];
  p._saveCommitIndex = function() {
    t.deepEqual(toArray(arguments), args);
    t.end();
  };
  p.saveCommitIndex.apply(p, args);
});

test('createReadStream extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId'];
  var expectedReply = 'SOME RESPONSE';
  p._createReadStream = function() {
    t.deepEqual(toArray(arguments), args);
    return expectedReply;
  };
  var reply = p.createReadStream.apply(p, args);
  t.deepEqual(reply, expectedReply);
  t.end();
});

test('createWriteStream extensibility', function(t) {
  var p = new ASP();
  var args = ['nodeId'];
  var expectedReply = 'SOME RESPONSE';
  p._createWriteStream = function() {
    t.deepEqual(toArray(arguments), args);
    return expectedReply;
  };
  var reply = p.createWriteStream.apply(p, args);
  t.deepEqual(reply, expectedReply);
  t.end();
});

test('close extensibility', function(t) {
  var p = new ASP();
  var args = [function() {
    t.end();
  }];
  p._close = function(cb) {
    t.deepEqual(toArray(arguments), args);
    cb();
  };
  p.close.apply(p, args);
});

function toArray(args) {
  return Array.prototype.slice.call(args);
}