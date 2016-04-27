'use strict';

require('colors');

var domain = require('domain');

var tests = [
  'save_meta',
  'load_meta',
  'change_logs',
  'reload_meta',
  'apply_command',
  'verify_commands',
  'last_applied_commit_index',
  'save_commit_index',
  'last_applied_commit_index_after_save',
  'create_read_stream',
  'remove_all_state',
  'create_write_stream'
].map(function(m) {
  return require('./' + m);
});

module.exports = testAll;

function testAll(p, options) {
  if (typeof options != 'object') {
    throw new Error('need options');
  }

  tests.forEach(function(t) {
    var d = domain.create();
    d.on('error', function(err) {
      console.error((err.stack || err.message || err.toString()).red);
      process.exit(1);
    });
    d.run(function() {
      t(p, options);
    });
  });

}
