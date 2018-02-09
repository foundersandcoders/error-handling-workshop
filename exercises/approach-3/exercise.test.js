'use strict';

const tape = require('tape');
const {
  wrapErrorCheck,
  combineAndPrint,
  combinedLength,
  sumArray,
} = require('./exercise');


tape('Exercise :: Approach 3 :: Returning Errors', (test) => {
  test.test('combinedLength :: valid arguments', (t) => {
    t.plan(4);
    t.equal(combinedLength([], []), 0, 'Combined length of [] and [] should be 0');
    t.equal(combinedLength([1], []), 1, 'Combined length of [1] and [] should be 1');
    t.equal(combinedLength([], [1]), 1, 'Combined length of [] and [1] should be 1');
    t.equal(combinedLength([1, 2, 3], [1, 2, 3, 4]), 7, 'Combined length of [1, 2, 3] and [1, 2, 3, 4] should be 7');
    t.end();
  });

  test.test('combinedLength :: invalid arguments', (t) => {
    t.plan(6);
    t.ok(combinedLength() instanceof TypeError, 'Calling combinedLength with no arguments should return a new TypeError');
    t.ok(combinedLength(1) instanceof TypeError, 'Calling combinedLength with (1) should return a new TypeError');
    t.ok(combinedLength(1, {}) instanceof TypeError, 'Calling combinedLength with (1, {}) should return a new TypeError');
    t.ok(combinedLength({}, []) instanceof TypeError, 'Calling combinedLength with ({}, []) arguments should return a new TypeError');
    t.ok(combinedLength([], {}) instanceof TypeError, 'Calling combinedLength with ([], {}) should return a new TypeError');
    t.ok(combinedLength('', []) instanceof TypeError, 'Calling combinedLength with (\'\', []) should return a new TypeError');
    t.end();
  });

  test.test('sumArray :: valid arguments', (t) => {
    t.plan(4);
    t.equal(sumArray([]), 0, 'sum of elements in [] should be 0');
    t.equal(sumArray([1]), 1, 'sum of elements in [1] should be 1');
    t.equal(sumArray([1, 2, 3]), 6, 'sum of elements in [1, 2, 3] should be 6');
    t.equal(sumArray([-1, -2, 3]), 0, 'sum of elements in [-1, -2, 3] should be 0');
    t.end();
  });

  test.test('sumArray :: invalid arguments', (t) => {
    t.plan(7);
    t.ok(sumArray() instanceof TypeError, 'Calling sumArray with no arguments should return a new TypeError');
    t.ok(sumArray(1) instanceof TypeError, 'Calling sumArray with (1) should return a new TypeError');
    t.ok(sumArray({}) instanceof TypeError, 'Calling sumArray with ({}) should return a new TypeError');
    t.ok(sumArray('') instanceof TypeError, 'Calling sumArray with (\'\') should return a new TypeError');
    t.ok(sumArray(true) instanceof TypeError, 'Calling sumArray with (true) should return a new TypeError');
    t.ok(sumArray(['', 2]) instanceof TypeError, 'Calling sumArray with ([\'\', 2]) should return a new TypeError');
    t.ok(sumArray([1, '', true]) instanceof TypeError, 'Calling sumArray with ([1, \'\', true]) should return a new TypeError');
    t.end();
  });

  test.test('combineAndPrint :: valid arguments', (t) => {
    t.plan(4);
    t.equal(combineAndPrint([], []), 'Combined length: 0; Combined sum of elements: 0');
    t.equal(combineAndPrint([1], []), 'Combined length: 1; Combined sum of elements: 1');
    t.equal(combineAndPrint([], [1]), 'Combined length: 1; Combined sum of elements: 1');
    t.equal(combineAndPrint([1, 2, 3], [1, 2, 3, 4]), 'Combined length: 7; Combined sum of elements: 16');
    t.end();
  });

  test.test('combineAndPrint :: invalid arguments', (t) => {
    t.plan(6);
    t.equal(combineAndPrint(), 'Invalid arguments: both arguments must be arrays');
    t.equal(combineAndPrint(1), 'Invalid arguments: both arguments must be arrays');
    t.equal(combineAndPrint(1, {}), 'Invalid arguments: both arguments must be arrays');
    t.equal(combineAndPrint({}, []), 'Invalid arguments: both arguments must be arrays');
    t.equal(combineAndPrint([], {}), 'Invalid arguments: both arguments must be arrays');
    t.equal(combineAndPrint('', []), 'Invalid arguments: both arguments must be arrays');
    t.end();
  });

  test.test('wrapErrorCheck :: valid arguments', (t) => {
    const fn = wrapErrorCheck(combinedLength);

    t.plan(4);
    t.equal(fn([], []), 0, 'Wrapping combinedLength in an error check should return value 0 for inputs ([], [])');
    t.equal(fn([1], []), 1, 'Wrapping combinedLength in an error check should return value 1 for inputs ([1], [])');
    t.equal(fn([], [1]), 1, 'Wrapping combinedLength in an error check should return value 1 for inputs ([], [1])');
    t.equal(fn([1, 2, 3], [1, 2, 3, 4]), 7, 'Wrapping combinedLength in an error check should return value 7 for inputs ([1, 2, 3], [1, 2, 3, 4])');
    t.end();
  });

  test.test('wrapErrorCheck :: invalid arguments', (t) => {
    const fn = wrapErrorCheck(combinedLength);

    t.plan(6);
    t.equal(fn(), undefined, 'Wrapping combinedLength in an error check should return value undefined for no inputs');
    t.equal(fn(1), undefined, 'Wrapping combinedLength in an error check should return value undefined for inputs (1)');
    t.equal(fn(1, {}), undefined, 'Wrapping combinedLength in an error check should return value undefined for inputs (1, {})');
    t.equal(fn({}, []), undefined, 'Wrapping combinedLength in an error check should return value undefined for inputs ({}, [])');
    t.equal(fn([], {}), undefined, 'Wrapping combinedLength in an error check should return value undefined for inputs ([], {})');
    t.equal(fn('', []), undefined, 'Wrapping combinedLength in an error check should return value undefined for inputs (\'\', [])');
    t.end();
  });
});
