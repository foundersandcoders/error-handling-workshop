'use strict';


/*
 * 1. Write a function that calls its callback with an error if called with invalid arguments
 *
 * Fill in the body of the function `combinedLength`, which should execute the given
 * callback with (null, the combined length of two arrays) if it receives correct
 * arguments, and  otherwise should execute its callback with (an appropriate error).
 */

/**
 * Calculates the combined length of two arrays
 * @param   {Array}     a  First array
 * @param   {Array}     b  Second array
 * @param   {Function}  cb Callback
 * @returns {undefined}    Nothing
 */
const combinedLength = (a, b, cb) => {
  if (! Array.isArray(a) || ! Array.isArray(b)) {
    return cb(new TypeError('Both inputs must be arrays'))
  }

  return cb(null, a.length + b.length);
};


/*
 * 2. Write a function that sums the numbers in an array and calls its
 *    callback with an error if called with invalid arguments
 *
 * Fill in the body of the function `sumArray`, which should execute the given
 * callback with (null, the sum of all the elements in the input array). If it
 * receives incorrect arguments, it should execute its callback with (an error).
 *
 * Note that all elements of the input array must be numbers.
 */

/**
 * Sums numbers in an array
 * @param   {Array}    xs list of numbers
 * @param   {Function} cb Callback
 * @returns {undefined}   Nothing
 */
const sumArray = (xs, cb) => {
  if (!Array.isArray(xs)) {
    return cb(new TypeError('Argument must be an array'));
  }

  if (!xs.every((x) => typeof x === 'number')) {
    return cb(new TypeError('Array elements must be numbers'));
  }

  return cb(null, xs.reduce((a, b) => a + b, 0));
}

/*
 * 3. Write a function that handles errors returned by (1) and (2)
 *
 * Fill in the body of the function `combineAndPrint`, which should find the
 * combined length of two arrays and the total sum of all their elements.
 * If an error occurs, the function should instead print a useful message
 * explaining what went wrong.
 */

/**
 * Returns a string of the format
 *   "Combined length: L; Combined sum of elements: S"
 * Where L is the combined length of the two arrays and S is the sum of the elements of the array
 *
 * The function should use `combinedLength`. In the case of invalid inputs, the
 * function should return the string
 *   "Invalid arguments: both arguments must be arrays"
 * @param   {Array}    a  First array
 * @param   {Array}    b  Second array
 * @param   {Function} cb Callback
 * @returns {undefined}   Nothing
 */
const combineAndPrint = (a, b, cb) => {
  const errMsg = 'Invalid arguments: both arguments must be arrays';

  combinedLength(a, b, (err1, L) => {
    if (err1) {
      return cb(errMsg);
    }

    sumArray(a.concat(b), (err2, S) => {
      if (err2) {
        return cb(errMsg);
      }

      cb(null, `Combined length: ${L}; Combined sum of elements: ${S}`);
    })
  });
};


module.exports = {
  combinedLength,
  sumArray,
  combineAndPrint,
};
