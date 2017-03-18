/************* Tests *****************
**************************************

Uncomment all tests and make them pass
by building on modules in /modules

**************************************
*************************************/


// Imports
const { divide } = require('./modules');
const test = require('tape');



// Init
test('Initialise', (t) => {
  t.ok(true, 'assert testing environment')
  t.end();
})

// Divide
test('Divide tests', (t) => {

  // Good Assertions
  const goodDivide = divide.bind(null,8,4);

  goodDivide((err, result) => {
    t.notok(err, 'Should not return an error in first argument of callback')
    t.equal(result, 2, 'Should perform basic division of two non-zero integers')
  });

  // Fail Assertions
  const badDivide = divide.bind(null,8,0);

  badDivide((err, result) => {
    t.ok(err, 'Should return an error if second argument to divide is 0')
    // t.notok(result, 'Should not return a result if error given')
    // t.ok(err instanceof Error, 'error should be instance of Error class')
    // t.doesNotThrow(() => badDivide(() => {}), 'Should not throw error')
  });

  t.end();
});
