/*
 * Ignore this file
 */
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

module.exports = (filename, contents, callback) => {
  contents.age -= 0; // No-op intended to transform string values to NaNs
  assert(typeof callback === 'function');
  assert(typeof contents.age === 'number' && !isNaN(contents.age));
  fs.writeFile(path.resolve(__dirname, filename), contents.body, (err) =>
    err
      ? callback(err)
      : callback(null, { message: `record created at ${filename}` })
  );
};
