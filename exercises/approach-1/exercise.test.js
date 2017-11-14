'use strict';

const tape = require('tape');
const {
  wrapTryCatch,
  combineAndPrint,
  combinedLength,
  sumArray,
} = require('./exercise');


tape('Exercise :: Approach 1 :: Try and Catch', (test) => {
  test.test('combinedLength :: valid arguments', (t) => {
    t.plan(4);
    t.equal(combinedLength([], []), 0);
    t.equal(combinedLength([1], []), 1);
    t.equal(combinedLength([], [1]), 1);
    t.equal(combinedLength([1, 2, 3], [1, 2, 3, 4]), 7);
    t.end();
  });

  test.test('combinedLength :: invalid arguments', (t) => {
    t.plan(6);
    t.throws(() => combinedLength(), TypeError);
    t.throws(() => combinedLength(1), TypeError);
    t.throws(() => combinedLength(1, {}), TypeError);
    t.throws(() => combinedLength({}, []), TypeError);
    t.throws(() => combinedLength([], {}), TypeError);
    t.throws(() => combinedLength('', []), TypeError);
    t.end();
  });

  test.test('sumArray :: valid arguments', (t) => {
    t.plan(4);
    t.equal(sumArray([]), 0);
    t.equal(sumArray([1]), 1);
    t.equal(sumArray([1, 2, 3]), 6);
    t.equal(sumArray([-1, -2, 3]), 0);
    t.end();
  });

  test.test('sumArray :: invalid arguments', (t) => {
    t.plan(6);
    t.throws(() => sumArray(), TypeError);
    t.throws(() => sumArray(1), TypeError);
    t.throws(() => sumArray({}), TypeError);
    t.throws(() => sumArray(''), TypeError);
    t.throws(() => sumArray(true), TypeError);
    t.throws(() => sumArray([1, '', true]), TypeError);
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

  test.test('wrapTryCatch :: valid arguments', (t) => {
    const fn = wrapTryCatch(combinedLength);

    t.plan(4);
    t.equal(fn([], []), 0);
    t.equal(fn([1], []), 1);
    t.equal(fn([], [1]), 1);
    t.equal(fn([1, 2, 3], [1, 2, 3, 4]), 7);
    t.end();
  });

  test.test('wrapTryCatch :: invalid arguments', (t) => {
    const fn = wrapTryCatch(combinedLength);

    t.plan(6);
    t.equal(fn(), undefined);
    t.equal(fn(1), undefined);
    t.equal(fn(1, {}), undefined);
    t.equal(fn({}, []), undefined);
    t.equal(fn([], {}), undefined);
    t.equal(fn('', []), undefined);
    t.end();
  });
});
