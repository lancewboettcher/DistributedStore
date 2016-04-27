'use strict';

var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

module.exports = AbstractSkiffPersistence;

function AbstractSkiffPersistence() {
  EventEmitter.call(this);
}

inherits(AbstractSkiffPersistence, EventEmitter);

var ASP = AbstractSkiffPersistence.prototype;

ASP.saveMeta = function saveMeta(nodeId, state, callback) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }
  if ((typeof state) != 'object') {
    throw new Error('state must be object');
  }
  if ((typeof callback) != 'function') {
    throw new Error('callback must be function');
  }

  this._saveMeta(nodeId, state, callback);
};

ASP._saveMeta = notImplemented;

ASP.loadMeta = function loadMeta(nodeId, callback) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }
  if ((typeof callback) != 'function') {
    throw new Error('callback must be function');
  }
  this._loadMeta(nodeId, callback);
};

ASP._loadMeta = notImplemented;

ASP.applyCommand = function applyLog(nodeId, commitIndex, command, callback) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }
  if ((typeof commitIndex) != 'number' || commitIndex < 1) {
    throw new Error('commitIndex must be a number > 0');
  }
  if ((typeof callback) != 'function') {
    throw new Error('callback must be function');
  }
  this._applyCommand(nodeId, commitIndex, command, callback);
};

ASP._applyCommand = notImplemented;

ASP.lastAppliedCommitIndex = function lastAppliedCommitIndex(nodeId, callback) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }
  if ((typeof callback) != 'function') {
    throw new Error('callback must be function');
  }
  this._lastAppliedCommitIndex(nodeId, callback);
};

ASP._lastAppliedCommitIndex = notImplemented;

ASP.saveCommitIndex = function saveCommitIndex(nodeId, commitIndex, callback) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }
  if ((typeof commitIndex) != 'number' || commitIndex < 1) {
    throw new Error('commitIndex must be a number > 0');
  }
  if ((typeof callback) != 'function') {
    throw new Error('callback must be function');
  }

  this._saveCommitIndex(nodeId, commitIndex, callback);
};

ASP._saveCommitIndex = notImplemented;

ASP.createReadStream = function createReadStream(nodeId) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }

  return this._createReadStream(nodeId);
};

ASP._createReadStream = notImplemented;

ASP.createWriteStream = function createWriteStream(nodeId) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }

  return this._createWriteStream(nodeId);
};

ASP._createWriteStream = notImplemented;

ASP.removeAllState = function removeAllState(nodeId, callback) {
  if ((typeof nodeId) != 'string') {
    throw new Error('nodeId must be string');
  }
  if ((typeof callback) != 'function') {
    throw new Error('callback must be function');
  }

  this._removeAllState(nodeId, callback);
};

ASP.close = function close(callback) {
  if (!callback) {
    callback = noop;
  }
  this._close(callback);
};

ASP._close = notImplemented;

function notImplemented() {
  throw new Error('Not implemented');
}

function noop() {}
