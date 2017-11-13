'use strict';

const tape = require('tape');
const {
  combineAndPrint,
  combinedLength,
  sumArray,
} = require('./exercise');


tape('Exercise :: Approach 3 :: Error-First Callbacks', (test) => {
  test.test('combinedLength :: valid arguments', (t) => {
    t.plan(8);
    combinedLength([], [], (err, res) => {
      t.notOk(err);
      t.equal(res, 0);
    });
    combinedLength([1], [], (err, res) => {
      t.notOk(err);
      t.equal(res, 1);
    });
    combinedLength([], [1], (err, res) => {
      t.notOk(err);
      t.equal(res, 1);
    });
    combinedLength([1, 2, 3], [1, 2, 3, 4], (err, res) => {
      t.notOk(err);
      t.equal(res, 7);
    });
  });

  test.test('combinedLength :: invalid arguments', (t) => {
    t.plan(6);
    combinedLength(undefined, undefined, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    combinedLength(1, undefined, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    combinedLength(1, {}, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    combinedLength({}, [], (err, res) => {
      t.ok(err instanceof TypeError);
    });
    combinedLength([], {}, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    combinedLength('', [], (err, res) => {
      t.ok(err instanceof TypeError);
    });
  });

  test.test('sumArray :: valid arguments', (t) => {
    t.plan(8);
    sumArray([], (err, res) => {
      t.notOk(err);
      t.equal(res, 0);
    });
    sumArray([1], (err, res) => {
      t.notOk(err);
      t.equal(res, 1);
    });
    sumArray([1, 2, 3], (err, res) => {
      t.notOk(err);
      t.equal(res, 6);
    });
    sumArray([-1, -2, 3], (err, res) => {
      t.notOk(err);
      t.equal(res, 0);
    });
  });

  test.test('sumArray :: invalid arguments', (t) => {
    t.plan(6);
    sumArray(undefined, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    sumArray(1, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    sumArray({}, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    sumArray('', (err, res) => {
      t.ok(err instanceof TypeError);
    });
    sumArray(true, (err, res) => {
      t.ok(err instanceof TypeError);
    });
    sumArray([1, '', true], (err, res) => {
      t.ok(err instanceof TypeError);
    });
  });

  test.test('combineAndPrint :: valid arguments', (t) => {
    t.plan(8);
    combineAndPrint([], [], (err, res) => {
      t.notOk(err);
      t.equal(res, 'Combined length: 0; Combined sum of elements: 0');
    });
    combineAndPrint([1], [], (err, res) => {
      t.notOk(err);
      t.equal(res, 'Combined length: 1; Combined sum of elements: 1');
    });
    combineAndPrint([], [1], (err, res) => {
      t.notOk(err);
      t.equal(res, 'Combined length: 1; Combined sum of elements: 1');
    });
    combineAndPrint([1, 2, 3], [1, 2, 3, 4], (err, res) => {
      t.notOk(err);
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
