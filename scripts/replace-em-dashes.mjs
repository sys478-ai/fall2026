#!/usr/bin/env node

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const EM_DASH = '\u2014';
const EN_DASH = '\u2013';

const DEFAULT_ROOTS = ['content', 'src'];
const DEFAULT_EXTENSIONS = new Set([
  '.md',
  '.mdx',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.html',
  '.json',
  '.yml',
  '.yaml',
]);
const SKIP_DIRS = new Set(['.git', '.next', 'node_modules', 'out', '.cursor']);

function printHelp() {
  console.log(`Replace em dashes (${EM_DASH}) with en dashes (${EN_DASH}).

Usage:
  node scripts/replace-em-dashes.mjs [options] [paths...]

Options:
  --write       Apply changes (default is dry run)
  --all         Include all file extensions under target paths
  --help        Show this help

Examples:
  node scripts/replace-em-dashes.mjs
  node scripts/replace-em-dashes.mjs --write content
  node scripts/replace-em-dashes.mjs --write content/technical-explainers
`);
}

function parseArgs(argv) {
  const options = {
    write: false,
    allExtensions: false,
    paths: [],
  };

  for (const arg of argv) {
    if (arg === '--write') {
      options.write = true;
    } else if (arg === '--all') {
      options.allExtensions = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg.startsWith('-')) {
      console.error(`Unknown option: ${arg}`);
      printHelp();
      process.exit(1);
    } else {
      options.paths.push(arg);
    }
  }

  if (options.paths.length === 0) {
    options.paths = DEFAULT_ROOTS;
  }

  return options;
}

async function walkFiles(rootPath, allExtensions) {
  const files = [];
  const queue = [path.resolve(rootPath)];

  while (queue.length > 0) {
    const currentPath = queue.pop();
    if (!currentPath) continue;

    let entries;
    try {
      entries = await readdir(currentPath, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) {
          queue.push(entryPath);
        }
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      if (!allExtensions && !DEFAULT_EXTENSIONS.has(extension)) {
        continue;
      }

      files.push(entryPath);
    }
  }

  return files.sort();
}

function countEmDashes(text) {
  let count = 0;
  for (const char of text) {
    if (char === EM_DASH) count += 1;
  }
  return count;
}

async function processFile(filePath, write) {
  const original = await readFile(filePath, 'utf8');
  const matches = countEmDashes(original);

  if (matches === 0) {
    return null;
  }

  const updated = original.replaceAll(EM_DASH, EN_DASH);

  if (write) {
    await writeFile(filePath, updated, 'utf8');
  }

  return { filePath, matches };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();
  const changed = [];

  for (const target of options.paths) {
    const targetPath = path.resolve(repoRoot, target);
    let targetStat;

    try {
      targetStat = await stat(targetPath);
    } catch {
      console.error(`Path not found: ${target}`);
      process.exitCode = 1;
      continue;
    }

    const files = targetStat.isFile()
      ? [targetPath]
      : await walkFiles(targetPath, options.allExtensions);

    for (const filePath of files) {
      const result = await processFile(filePath, options.write);
      if (result) {
        changed.push(result);
      }
    }
  }

  if (changed.length === 0) {
    console.log('No em dashes found.');
    return;
  }

  const total = changed.reduce((sum, item) => sum + item.matches, 0);
  const mode = options.write ? 'Updated' : 'Would update';

  for (const { filePath, matches } of changed) {
    console.log(`${mode} ${path.relative(repoRoot, filePath)} (${matches})`);
  }

  console.log(`\n${mode.toLowerCase()} ${changed.length} file(s), ${total} replacement(s).`);

  if (!options.write) {
    console.log('Dry run only. Re-run with --write to apply changes.');
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
