'use strict';

const validateFilename = require('./validateFilename');
const validateContents = require('./validateContents');


/**
 * Single validation function pulling together validations on
 * all parts of the payload
 *
 * Note that this function follows the second approach: returning
 * the error to the caller. However, it calls functions which follow
 * the first approach: throwing errors. This means it needs to use
 * `catch` statements to keep a consistent interface.
 *
 * @param   {String} filename `filename` field of the payload
 * @param   {Object} contents `contents` field of the payload
 * @returns {Object}          Indicates if the payload is valid
 */
const validate = (filename, contents) => {
  try {
    validateFilename(filename);
    validateContents(contents);

    return { isValid: true };

  } catch (e) {
    return { isValid: false, message: e.message };

  }
}


module.exports = validate;
