const fs = require('fs');
const path = 'server.js';
const src = fs.readFileSync(path, 'utf8');
const lines = src.split(/\r?\n/);
let inImg = false;
let inProd = false;
const imgKeys = new Set();
for (let i = 0; i < lines.length; i++) {
  const l = lines[i].trim();
  if (l.startsWith('const IMG')) { inImg = true; continue; }
  if (inImg) {
    if (l === '};') { inImg = false; continue; }
    const m = l.match(/^([A-Za-z0-9_]+)\s*:\s*'(.+)'/);
    if (m) imgKeys.add(m[1]);
  }
  if (l.startsWith('const PRODUCTS_SEED')) { inProd = true; continue; }
  if (inProd) {
    if (l === '];') { inProd = false; break; }
  }
}

inProd = false;
const missingImageLines = [];
const unknownKeys = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i].trim();
  if (l.startsWith('const PRODUCTS_SEED')) { inProd = true; continue; }
  if (!inProd) continue;
  if (l === '];') { inProd = false; break; }
  if (!l.startsWith('{') || !l.endsWith('},')) continue;
  const imageMatch = l.match(/image\s*:\s*IMG\.([A-Za-z0-9_]+)/);
  if (!imageMatch) {
    missingImageLines.push({ line: i + 1, text: l });
  } else {
    const key = imageMatch[1];
    if (!imgKeys.has(key)) unknownKeys.push({ line: i + 1, key, text: l });
  }
}

console.log('Total img keys:', imgKeys.size);
console.log('Total products parsed with {} lines:', (() => { let c = 0; inProd=false; for (let i=0;i<lines.length;i++){ const l=lines[i].trim(); if(l.startsWith('const PRODUCTS_SEED')){ inProd=true; continue;} if(inProd){ if(l===' ];' || l==='];'){ inProd=false; break; } if(l.startsWith('{') && l.endsWith('},')) c++; }} return c; })());
console.log('Missing image fields:', missingImageLines.length, missingImageLines.slice(0, 6));
console.log('Unknown IMG references:', unknownKeys.length, unknownKeys.slice(0, 6));
