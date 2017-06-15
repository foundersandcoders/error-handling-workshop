'use strict';

const url = require('url');
const handler = require('./handler.js');

const PORT = 4000;

const router = module.exports = (req, res) => {
  const uri = url.parse(req.url);

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  if (uri.pathname !== '/books') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  let body = '';

  req
    .on('data', (chunk) => { body += chunk })
    .on('end', () => handler(req, res, body))
}
