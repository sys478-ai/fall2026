#!/usr/bin/env node
// Lists every example `connected_cards` entry that does not resolve to exactly one card.
// Usage: node scripts/check-example-connections.mjs
// Mirrors resolveConnectedCard() in src/lib/examples.ts.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT = 'content';
const SOURCES = ['ai-deployment-patterns', 'sts-concepts', 'governance'];
const norm = value => {
  const raw = String(value ?? '').trim();
  const n = Number(raw);
  return raw !== '' && Number.isFinite(n) ? String(n) : raw;
};

async function readDir(dir) {
  const names = (await readdir(path.join(CONTENT, dir))).filter(n => n.endsWith('.md'));
  return Promise.all(
    names.map(async name => ({
      name,
      data: matter(await readFile(path.join(CONTENT, dir, name), 'utf8')).data,
    }))
  );
}

const index = {};
for (const source of SOURCES) {
  index[source] = new Map();
  for (const { data } of await readDir(source)) {
    if (data.num == null || String(data.num).trim() === '') continue;
    if (source === 'ai-deployment-patterns' && data.card_type !== 'recognition') continue;
    index[source].set(norm(data.num), data.title);
  }
}

const orderFor = section =>
  section === 'ai-deployment-patterns'
    ? ['ai-deployment-patterns']
    : section === 'sts-concepts'
      ? ['sts-concepts', 'governance']
      : section === 'governance'
        ? ['governance']
        : SOURCES;

let problems = 0;
for (const { name, data } of await readDir('examples')) {
  for (const entry of data.connected_cards ?? []) {
    const key = norm(entry.num);
    const hits = orderFor(entry.section).filter(s => index[s].has(key));
    const label = `${name} #${entry.num}${entry.section ? ` [${entry.section}]` : ''}`;
    if (hits.length === 0) {
      problems += 1;
      console.log(`UNRESOLVED  ${label}`);
    } else if (!entry.section && SOURCES.filter(s => index[s].has(key)).length > 1) {
      problems += 1;
      const others = SOURCES.filter(s => index[s].has(key)).map(s => `${s}: ${index[s].get(key)}`);
      console.log(`AMBIGUOUS   ${label} -> ${others.join(' | ')} (add a section)`);
    }
  }
}
console.log(problems === 0 ? 'All example connections resolve to one card.' : `${problems} entries need attention.`);
