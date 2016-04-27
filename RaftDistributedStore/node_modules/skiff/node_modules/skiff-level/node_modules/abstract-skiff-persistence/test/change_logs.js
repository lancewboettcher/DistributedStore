'use strict';

var uuid = require('cuid');
var test = require('tape');

module.exports = saveMetaTests;

function saveMetaTests(p) {
  test('saves meta', function(t) {
    p.saveMeta('node id', {
      currentTerm: 10,
      votedFor: 'some other node',
      log: {
        meta: {
          lastIncludedIndex: 20,
          lastIncludedTerm: 30
        },
        entries: [
          {
            command: 'entry 1',
            uuid: uuid(),
            index: 1
          },
          {
            command: 'entry 2 should not be saved',
            uuid: 'a very special uuid',
            index: 2
          },
          {
            command: 'entry 3 redone',
            uuid: uuid(),
            index: 3
          },
        ]
      },
      peers: ['peer 1', 'peer 2']
    }, saved);

    function saved(err) {
      t.ok(! err, err && err.message);
      t.end();
    }
  });
}