import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const data=JSON.parse(fs.readFileSync('src/full-data.json','utf8'));
if(data.durationInFrames!==7625 || data.cues.length!==54)throw new Error('Unexpected timeline');
for(let i=0;i<data.cues.length;i++) {const c=data.cues[i];if(!c.ja||!c.zh||c.startFrame>=c.endFrame||c.endFrame>7625||(i&&data.cues[i-1].endFrame>c.startFrame))throw new Error('Invalid bilingual cue '+c.id);}
const manifest=JSON.parse(fs.readFileSync('assets/manifest.json','utf8'));
for(const entry of manifest) {const bytes=fs.readFileSync(path.join(root,entry.path));if(crypto.createHash('sha256').update(bytes).digest('hex')!==entry.sha256)throw new Error('Asset hash mismatch '+entry.path);if(!fs.existsSync(entry.prompt))throw new Error('Missing prompt '+entry.prompt);}
for(const font of ['MVJP-Subset.otf','MVSC-Subset.otf'])if(!fs.existsSync('public/fonts/'+font))throw new Error('Missing font');
console.log(`OK: 7625 frames, ${data.cues.length} bilingual cues, ${manifest.length} production images and prompts.`);
