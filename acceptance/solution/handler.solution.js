'use strict';

const createRecord = require('./createRecord.js');

module.exports = (req, res, body) => {
  let filename, contents;

  try {
    const payload = JSON.parse(body);
    filename = payload.filename;
    contents = payload.contents;
  } catch (e) {
    return resJson(res, 400, { error: 'Bad Request' });
  }

  const result = validate(filename, contents);

  if (! result.isValid) {
    return resJson(res, 400, { error: `Invalid parameters: ${result.message}`});
  }

  createRecord(
    filename,
    contents,
    (err, message) =>
      err
        ? resJson(res, 500, { error: 'Internal Error' })
        : resJson(res, 200, message)
  );
};

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
