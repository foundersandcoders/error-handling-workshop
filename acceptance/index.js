'use strict';

const tape = require('tape');
const shot = require('shot');
const sorrow = require('sorrow');
const router = require('../modules');


tape('Acceptance Test | Invalid method', (t) => {
  shot.inject(
    router,
    { method: 'GET', url: '/' },
    (res) => {
      t.equal(res.statusCode, 405, 'HTTP 405 :: Method Not Allowed');
      t.end();
    }
  );
});

tape('Acceptance Test | Invalid route', (t) => {
  shot.inject(
    router,
    { method: 'POST', url: '/' },
    (res) => {
      t.equal(res.statusCode, 404, 'HTTP 404 :: Not Found');
      t.end();
    }
  );
});

const fixtures = [
  {
    name: 'Valid payload',
    payload: {
      filename: 'foo.md',
      contents: { name: 'woo', age: 4, body: 'wogp90r8y' },
    },
    assertStatusCode: 200
  },
  {
    // This payload is formed to catch JSON.parse errors
    name: 'Invalid JSON',
    payload: 'f209t8429',
    assertStatusCode: 400
  },
  {
    name: 'Malformed JSON',
    payload: [],
    assertStatusCode: 400
  },
  {
    name: 'Malformed JSON',
    payload: null,
    assertStatusCode: 400
  },
  {
    // This payload is formed to catch lazy typeof x === 'object' checks to detect plain objects
    name: 'Empty array',
    payload: {
      filename: 'grht24t',
      contents: [],
    },
    assertStatusCode: 400
  },
  {
    // Designed to catch lazy typeof x === 'object' checks to detect plain objects
    name: 'Null waypoint',
    payload: {
      filename: 'grht24t',
      contents: null,
    },
    assertStatusCode: 400
  },
  {
    // Designed to catch NaNs in the `pageLimit` field
    name: 'Non-numeric string age',
    payload: {
      filename: 'grht24t',
      contents: { name: 'gr4t', age: 'fe', body: 'wegrht' },
    },
    assertStatusCode: 400
  },
  {
    name: 'Non-string filename',
    payload: {
      filename: 35,
      contents: { name: 'woo', age: 4, body: 'wogp90r8y' },
    },
    assertStatusCode: 400
  },
  {
    name: 'directory traversal',
    payload: {
      filename: '../.git',
      contents: { name: 'woo', age: 4, body: 'wogp90r8y' },
    },
    assertStatusCode: 400
  },
  {
    name: 'Small age',
    payload: {
      filename: 'foo.md',
      contents: { name: 'woo', age: 1, body: 'wogp90r8y' },
    },
    assertStatusCode: 400
  },
  {
    name: 'Large age',
    payload: {
      filename: 'foo.md',
      contents: { name: 'woo', age: 100, body: 'wogp90r8y' },
    },
    assertStatusCode: 400
  },
  {
    name: 'Non-integer age',
    payload: {
      filename: 'foo.md',
      contents: { name: 'woo', age: 10.5, body: 'wogp90r8y' },
    },
    assertStatusCode: 400
  },
  {
    name: 'Empty name',
    payload: {
      filename: 'foo.md',
      contents: { name: '', age: 4, body: 'wogp90r8y' },
    },
    assertStatusCode: 400
  },
  {
    name: 'Empty body',
    payload: {
      filename: 'foo.md',
      contents: { name: 'qfeght', body: '', age: 10 },
    },
    assertStatusCode: 400
  },
  {
    name: 'Long name',
    payload: {
      filename: 'foo.md',
      contents: { name: 'qfeght024tug08rihovnbi7q9e3tgf2berwv08eb97gruhof', body: '', age: 5 },
    },
    assertStatusCode: 400
  },
  {
    name: 'Long body',
    payload: {
      filename: 'foo.md',
      contents: { title: 'qfeghtyjy4', body: 'a'.repeat(10001), age: 5 },
    },
    assertStatusCode: 400
  },
  {
    name: 'Missing attribute(s)',
    payload: {
      filename: 'foo.md',
      contents: { age: 2 },
    },
    assertStatusCode: 400
  },
  {
    name: 'Long filename',
    payload: {
      filename: 'dqfmoeg90r89yhu0we8hf029eh9w7gf7qetr8f07gq9e0hg',
      contents: { name: 'qfeght', body: 'qwgrht', age: 3 },
    },
    assertStatusCode: 400
  },
];

fixtures.forEach(({ name, payload, assertStatusCode }) => {
  tape(`Acceptance | ${name}`, (t) => {
    shot.inject(router, { method: 'POST', url: '/books', payload }, (res) => {
      t.equal(res.statusCode, assertStatusCode, `HTTP ${assertStatusCode} | ${res.payload}`);
      t.end();
    });
  });
});
