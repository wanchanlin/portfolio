/**
 * Build check script - writes results to .cursor/debug.log for debugging.
 * Run: node scripts/check-build.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOG_PATH = path.join(__dirname, '..', '.cursor', 'debug.log');
const LOG_ENDPOINT = 'http://127.0.0.1:7242/ingest/150f3f2e-2c72-45ba-9d7b-9f54d00e1875';

function log(obj) {
  const line = JSON.stringify({ ...obj, timestamp: Date.now(), sessionId: 'debug-session' }) + '\n';
  const dir = path.dirname(LOG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(LOG_PATH, line);
}

// H1: Env vars present at "build" time
const hasSanityProjectId = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const hasSanityDataset = !!process.env.NEXT_PUBLIC_SANITY_DATASET;
log({ location: 'check-build.js', message: 'env check', data: { hasSanityProjectId, hasSanityDataset }, hypothesisId: 'H1' });

// H2: TypeScript check (short timeout)
let tscOk = false;
let tscError = null;
try {
  execSync('npx tsc --noEmit', { cwd: path.join(__dirname, '..'), encoding: 'utf8', timeout: 15000 });
  tscOk = true;
} catch (e) {
  tscError = (e.stderr || e.stdout || e.message || String(e)).slice(0, 800);
}
log({ location: 'check-build.js', message: 'tsc result', data: { tscOk, tscError: tscError || null }, hypothesisId: 'H2' });

// H3: Next config load
let nextConfigOk = false;
try {
  require('../next.config.js');
  nextConfigOk = true;
} catch (e) {
  log({ location: 'check-build.js', message: 'next.config load failed', data: { error: e.message }, hypothesisId: 'H3' });
}
log({ location: 'check-build.js', message: 'next.config', data: { nextConfigOk }, hypothesisId: 'H3' });

console.log('Check complete. Results written to .cursor/debug.log');
console.log('Env SANITY:', hasSanityProjectId ? 'OK' : 'MISSING', hasSanityDataset ? 'OK' : 'MISSING');
console.log('TypeScript:', tscOk ? 'OK' : 'FAILED');
console.log('next.config:', nextConfigOk ? 'OK' : 'FAILED');
