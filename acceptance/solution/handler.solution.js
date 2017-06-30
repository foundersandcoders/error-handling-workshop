/*
 * Example solution
 *
 * This solution uses all three error-handling approaches outlined in the
 * workshop.
 *
 * This is partly for illustration, and partly to show how one can transform one
 * error handling approach to another. For example, notice how `validate`
 * indicates errors using its return value, even though it calls functions which
 * indicate errors by throwing.
 */
'use strict';

const createRecord = require('./createRecord.js');

module.exports = (req, res, body) => {
  let filename, contents;

  // JSON.parse is unsafe; if its argument is a string which is not valid JSON,
  // it will throw an error. So we need to wrap it in a try/catch block.
  //
  // In the event of an error, we know that the request the client has sent
  // cannot be processed any further, so we should respond and then return.
  try {
    const payload = JSON.parse(body);
    filename = payload.filename;
    contents = payload.contents;
  } catch (e) {
    return resJson(res, 400, { error: 'Invalid JSON' });
  }

  // Payload validation; filename and contents are validated by the `validate`
  // function, which returns an object indicating whether the payload is valid.
  //
  // If the payload is invalid, we should not continue, because we know
  // `createRecord` has unpredictable behaviour if its inputs are invalid.
  // Instead we should respond and indicate to the user what the problem is.
  const result = validate(filename, contents);
  if (! result.isValid) {
    return resJson(res, 400, { error: `Invalid parameters: ${result.message}`});
  }

  // After successfully validating the payload, we call `createRecord`, which
  // presents a callback interface.
  //
  // If the callback is executed with a truthy first argument, we respond
  // indicating there has been an error during the attempt to create the record.
  // Otherwise we respond with a success code and a message.
  createRecord(
    filename,
    contents,
    (err, message) =>
      err
        ? resJson(res, 500, { error: 'Internal Error' })
        : resJson(res, 200, { message })
  );
};

// Simple utility function to make responding simpler
const resJson = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const validate = (filename, contents) => {
  try {
    validateFilename(filename);
    validateContents(contents);

    return { isValid: true };

  } catch (e) {
    return { isValid: false, message: e.message };

  }
}

const validateFilename = (filename) => {
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

const validateContents = (contents) => {
  if (
    contents === null ||
    typeof contents !== 'object' ||
    Array.isArray(contents)
  ) {
    throw new TypeError('Contents must be an object')
  }

  const attrs = [
    { attr: 'name', type: 'string', min: 1, max: 30 },
    { attr: 'age', type: 'number', min: 2, max: 20 },
    { attr: 'body', type: 'string', min: 1, max: 10000 },
  ];

  for (let ii = 0; ii < attrs.length; ii++) {
    const { attr, type, min, max } = attrs[ii];

    if (! contents.hasOwnProperty(attr)) {
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
  }

  if (Math.floor(contents.age) !== contents.age) {
    throw new TypeError(`Age ${contents.age} is not an integer`);
  }
};
