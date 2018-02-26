'use strict';

const tape = require('tape');
const {
  combineAndPrint,
  combinedLength,
  sumArray,
} = require('./exercise');


tape('Exercise :: Approach 1 :: Error-First Callbacks', (test) => {
    test.test('combinedLength :: valid arguments', (t) => {
      t.plan(8);
      combinedLength([], [], (err, res) => {
        console.log(err, res);
        t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
        t.equal(res, 0, 'Combined length of [] and [] should be 0');
      });
      combinedLength([1], [], (err, res) => {
        t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
        t.equal(res, 1, 'Combined length of [1] and [] should be 1');
      });
      combinedLength([], [1], (err, res) => {
        t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
        t.equal(res, 1, 'Combined length of [] and [1] should be 1');
      });
      combinedLength([1, 2, 3], [1, 2, 3, 4], (err, res) => {
        t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
        t.equal(res, 7, 'Combined length of [1, 2, 3] and [1, 2, 3, 4] should be 7');
      });
    });

  test.test('combinedLength :: invalid arguments', (t) => {
    t.plan(6);
    combinedLength(undefined, undefined, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling combinedLength with no arguments should return a new TypeError');
    });
    combinedLength(1, undefined, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling combinedLength with (1) should return a new TypeError');
    });
    combinedLength(1, {}, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling combinedLength with (1, {}) should return a new TypeError');
    });
    combinedLength({}, [], (err, res) => {
      t.ok(err instanceof TypeError, 'Calling combinedLength with ({}, []) arguments should return a new TypeError');
    });
    combinedLength([], {}, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling combinedLength with ([], {}) should return a new TypeError');
    });
    combinedLength('', [], (err, res) => {
      t.ok(err instanceof TypeError, 'Calling combinedLength with (\'\', []) should return a new TypeError');
    });
  });

  test.test('sumArray :: valid arguments', (t) => {
    t.plan(8);
    sumArray([], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 0, 'sum of elements in [] should be 0');
    });
    sumArray([1], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 1, 'sum of elements in [1] should be 1');
    });
    sumArray([1, 2, 3], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 6, 'sum of elements in [1, 2, 3] should be 6');
    });
    sumArray([-1, -2, 3], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 0, 'sum of elements in [-1, -2, 3] should be 0');
    });
  });

  test.test('sumArray :: invalid arguments', (t) => {
    t.plan(7);
    sumArray(undefined, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with no arguments should return a new TypeError');
    });
    sumArray(1, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with (1) should return a new TypeError');
    });
    sumArray({}, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with ({}) should return a new TypeError');
    });
    sumArray('', (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with (\'\') should return a new TypeError');
    });
    sumArray(true, (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with (true) should return a new TypeError');
    });
    sumArray(['', 2], (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with [\'\', 2] should return a new TypeError');
    });
    sumArray([1, '', true], (err, res) => {
      t.ok(err instanceof TypeError, 'Calling sumArray with ([1, \'\', true]) should return a new TypeError');
    });
  });

  test.test('combineAndPrint :: valid arguments', (t) => {
    t.plan(8);
    combineAndPrint([], [], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 'Combined length: 0; Combined sum of elements: 0');
    });
    combineAndPrint([1], [], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 'Combined length: 1; Combined sum of elements: 1');
    });
    combineAndPrint([], [1], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 'Combined length: 1; Combined sum of elements: 1');
    });
    combineAndPrint([1, 2, 3], [1, 2, 3, 4], (err, res) => {
      t.notOk(err, 'Should be no error, so first argument passed to callback should be falsy');
      t.equal(res, 'Combined length: 7; Combined sum of elements: 16');
    });
  });

  test.test('combineAndPrint :: invalid arguments', (t) => {
    t.plan(6);
    combineAndPrint(undefined, undefined, (err, res) => {
      t.equal(err, 'Invalid arguments: both arguments must be arrays');
    });
    combineAndPrint(1, undefined, (err, res) => {
      t.equal(err, 'Invalid arguments: both arguments must be arrays');
    });
    combineAndPrint(1, {}, (err, res) => {
      t.equal(err, 'Invalid arguments: both arguments must be arrays');
    });
    combineAndPrint({}, [], (err, res) => {
      t.equal(err, 'Invalid arguments: both arguments must be arrays');
    });
    combineAndPrint([], {}, (err, res) => {
      t.equal(err, 'Invalid arguments: both arguments must be arrays');
    });
    combineAndPrint('', [], (err, res) => {
      t.equal(err, 'Invalid arguments: both arguments must be arrays');
    });
  });
});
