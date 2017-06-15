'use strict';

const tape = require('tape');
const shot = require('shot');
const router = require('../../modules');

tape('Example test...', (t) => {
  shot.inject(router, { method: 'GET', url: '/' }, (res) => {
    t.ok(res.statusCode, 404, 'This will fail');
    t.end();
  });
});
