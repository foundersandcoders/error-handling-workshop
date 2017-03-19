const test = require('tape');

// Initialise
test('Initialise', (t) => {
  t.ok(true, 'assert testing environment')
  t.end();
})

// Imports
require('./validatename.test');
require('./validateage.test');
require('./validateemail.test');
require('./validatereason.test');
