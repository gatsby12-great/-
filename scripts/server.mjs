#!/usr/bin/env node
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { blocks, renderPayload, themes } from './wechat-renderer.mjs';

const PORT = Number(process.env.PORT || 8787);

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      return sendJson(res, 200, { ok: true });
    }

    const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/health') {
      return sendJson(res, 200, { ok: true, service: 'wechat-layout-tool', version: '0.3.0' });
    }

    if (req.method === 'GET' && url.pathname === '/api/manifest') {
      const manifest = JSON.parse(readFileSync(new URL('../agent.manifest.json', import.meta.url), 'utf8'));
      return sendJson(res, 200, manifest);
    }

    if (req.method === 'GET' && url.pathname === '/api/themes') {
      return sendJson(res, 200, themes.map(({ id, name, description }) => ({ id, name, description })));
    }

    if (req.method === 'GET' && url.pathname === '/api/blocks') {
      return sendJson(res, 200, blocks);
    }

    if (req.method === 'POST' && url.pathname === '/api/render') {
      const rawBody = await readBody(req);
      const payload = rawBody ? JSON.parse(rawBody) : {};
      return sendJson(res, 200, renderPayload(payload));
    }

    return sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Wechat Layout Tool agent server running at http://127.0.0.1:${PORT}`);
});
