'use strict';

const path = require('path');
const assert = require('assert');
const fs = require('fs');

module.exports = (filename, contents, callback) => {
  assert(typeof callback === 'function');

  const PATH = path.resolve(__dirname, filename);

  const book = normalise(contents);

  assert(typeof book.age === 'number' && !isNaN(book.age));

  fs.writeFile(PATH, book.body, (err) =>
    err
      ? callback(err)
      : callback(null, { message: `record created at ${filename}` })
  );
};

// No-op intended to transform string values to NaNs
const normalise = (book) => {
  book.age -= 0;
  return book;
};
