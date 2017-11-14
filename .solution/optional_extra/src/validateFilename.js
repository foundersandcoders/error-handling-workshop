'use strict';

/**
 * Validates the filename part of the payload, throwing an error
 * as soon as an issue is found
 * @param   {String}    filename Filename to be validated
 * @returns {undefined}          Nothing
 */
module.exports = (filename) => {
  if (typeof filename !== 'string') {
    throw new TypeError('Filename must be a string');
  }

  if (filename.length > 30) {
    throw new RangeError('Filename too long');
  }

  if (/\.\./g.test(filename)) {
    throw new Error('Directory traversal not permitted');
  }
}
