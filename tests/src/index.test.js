'use strict';

const tape = require('tape');
const shot = require('shot');
const router = require('../../src/router.js');

tape('Example test...', (t) => {
  shot.inject(router, { method: 'GET', url: '/' }, (res) => {
    t.ok(res.statusCode, 404, 'This will fail');
    t.end();
  });
});
