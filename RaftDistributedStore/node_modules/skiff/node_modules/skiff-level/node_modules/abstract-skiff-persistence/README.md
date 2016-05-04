# Abstract Skiff Persistence

Abstract prototype for building a [Skiff](https://github.com/pgte/skiff) persistence provider.

## Install

```bash
$ npm install abstract-skiff-persistence

## Implement

```javascript
var AbstractSkiffPersistence = require('abstract-skiff-persistence');
var inherits = require('util').inherits;

module.exports = FakeSkiffPersistence;

function FakeSkiffPersistence() {
}

inherits(FakeSkiffPersistence, AbstractSkiffPersistence);

FakeSkiffPersistence.prototype._
'use strict';

module.exports = AbstractSkiffPersistence;

function AbstractSkiffPersistence(options) {
}

FakeSkiffPersistence.prototype._saveMeta = function(nodeId, state, callback) {
  // ...
};

FakeSkiffPersistence.prototype._loadMeta = function(nodeId, callback) {
  // ...
};

FakeSkiffPersistence.prototype._applyCommand = function(nodeId, commitIndex, command, callback) {
  // ...
};

FakeSkiffPersistence.prototype._lastAppliedCommitIndex = function(nodeId, callback) {
  // ...
};

FakeSkiffPersistence.prototype._saveCommitIndex = function(nodeId, commitIndex, callback) {
  // ...
};

FakeSkiffPersistence.prototype._createReadStream = function(nodeId) {
  // ...
};

FakeSkiffPersistence.prototype._createWriteStream = function(nodeId) {
  // ...
};

FakeSkiffPersistence.prototype._removeAllState = function(nodeId, callback) {
  // ...
};

FakeSkiffPersistence.prototype._close = function(callback) {
  // ...
};
```

## Test

You can use this module to test your Skiff Persistence provider:

```javascript
'use strict';

var test = require('abstract-skiff-persistence/test/all');

var FakeSkiffPersistence = require('../');
var p = new FakeSkiffPersistence();

var options = {
  commands: [
    {type: 'put', key: 'a', value: 1},
    {type: 'put', key: 'b', value: 2},
    {type: 'del', key: 'a'},
    {type: 'put', key: 'c', value: {some: 'object'}}
  ],
  expectedReads: [
    {key: 'b': value: 2},
    {key: 'c': value: {some: 'object'}}
  },
  newWrites: [
    {type: 'put', key: 'd', value: 3},
    {type: 'put', key: 'e', value: {some: 'other object'}},
    {type: 'put', key: 'f', value: 'some other string'}
  ],
  newReads: [
    {key: 'd', value: 3},
    {key: 'e', value: {some: 'other object'}},
    {key: 'f', value: 'some other string'}
  ]
};

test(p, options);
```

# License

ISC