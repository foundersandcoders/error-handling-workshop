'use strict';

/**
 * Validates the contents object of the payload, throwing an error
 * as soon as an issue is found
 * @param   {Object}    contents      Contents object of payload
 * @param   {String}    contents.name Applicant name
 * @param   {Integer}   contents.age  Applicant age
 * @param   {String}    contents.body Application body
 * @returns {undefined}               Nothing
 */
module.exports = (contents) => {
  // Note that predicate is more complicated that simply
  //   typeof contents !== 'object'
  // because of `null` is an object, as are arrays
  if (
    contents === null ||
    typeof contents !== 'object' ||
    Array.isArray(contents)
  ) {
    throw new TypeError('Contents must be a plain object');
  }

  // For convenience, we describe our validation constraints
  // as a list of objects that we can iterate through
  const constraints = [
    { attr: 'name', type: 'string', min: 1, max: 30 },
    { attr: 'age', type: 'number', min: 2, max: 20 },
    { attr: 'body', type: 'string', min: 1, max: 10000 },
  ];

  constraints.forEach((constraint) => {
    const { attr, type, min, max } = constraint;

    if (!contents.hasOwnProperty(attr)) {
      throw new Error(`Contents missing property ${attr}`);
    }

    if (typeof contents[attr] !== type) {
      throw new TypeError(`Contents property ${attr} wrong type`);
    }

    if (typeof min !== 'undefined') {
      if (type === 'number' && contents[attr] < min) {
        throw new RangeError(`Contents property ${attr} below minimum`);
      }

      if (contents[attr].length < min) {
        throw new RangeError(`Contents property ${attr} below minimum`);
      }
    }

    if (typeof max !== 'undefined') {
      if (type === 'number' && contents[attr] > max) {
        throw new RangeError(`Contents property ${attr} above maximum`);
      }

      if (contents[attr].length > max) {
        throw new RangeError(`Contents property ${attr} above maximum`);
      }
    }
  });

  if (Math.floor(contents.age) !== contents.age) {
    throw new TypeError(`Age ${contents.age} is not an integer`);
  }
};
