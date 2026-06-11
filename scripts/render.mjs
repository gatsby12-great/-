#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { stdin as input } from 'node:process';
import { renderPayload } from './wechat-renderer.mjs';

function getArg(name, fallback = undefined) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

function hasFlag(name) {
  return process.argv.includes(name);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of input) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

const inputPath = getArg('--input');
const outPath = getArg('--out');
const themeId = getArg('--theme', 'minimal');
const fontSize = getArg('--fontSize', 'normal');
const lineHeight = getArg('--lineHeight', 'normal');
const previewWidth = getArg('--previewWidth', 'wechat');
const jsonMode = hasFlag('--json');

const markdown = inputPath ? readFileSync(inputPath, 'utf8') : await readStdin();
const result = renderPayload({
  markdown,
  themeId,
  options: { fontSize, lineHeight, previewWidth }
});

if (jsonMode) {
  const json = JSON.stringify(result, null, 2);
  if (outPath) writeFileSync(outPath, json, 'utf8');
  else process.stdout.write(json);
} else {
  if (outPath) writeFileSync(outPath, result.html, 'utf8');
  else process.stdout.write(result.html);
}
