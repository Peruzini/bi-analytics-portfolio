#!/usr/bin/env node
// Fleet Analytics DataViz V2: static PBIR quality gate. No network/dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = path.join(root, 'powerbi/fleet/FleetAnalytics.Report/definition');
const model = JSON.parse(fs.readFileSync(path.join(root, 'powerbi/fleet/FleetAnalytics.SemanticModel/model.bim'), 'utf8'));
const measureNames = new Set(model.model.tables.flatMap(t => (t.measures || []).map(m => t.name + '.' + m.name)));
const pageMeta = JSON.parse(fs.readFileSync(path.join(report, 'pages/pages.json'), 'utf8'));
const errors = [];
let visualCount = 0;
const total = {slicer: 0, cardVisual: 0, textbox: 0, tableEx: 0, clusteredBarChart: 0, lineChart: 0};
const expectedPages = ['Visão Executiva','Performance da Frota','Manutenção e Custos','Criticidade'];
const intersects = (a,b) => a.x < b.x+b.width && b.x < a.x+a.width && a.y < b.y+b.height && b.y < a.y+a.height;
if (pageMeta.pageOrder.length !== 4) errors.push('expected exactly four pages');
for (const [ix, id] of pageMeta.pageOrder.entries()) {
 const pageDir = path.join(report, 'pages', id);
 const page = JSON.parse(fs.readFileSync(path.join(pageDir, 'page.json'), 'utf8'));
 if (page.displayName !== expectedPages[ix]) errors.push('unexpected page order/name: ' + page.displayName);
 if (page.width !== 1280 || page.height !== 960) errors.push('unexpected canvas: ' + page.displayName);
 const dirs = fs.readdirSync(path.join(pageDir, 'visuals'), {withFileTypes:true}).filter(x => x.isDirectory());
 const visuals = dirs.map(d => JSON.parse(fs.readFileSync(path.join(pageDir, 'visuals', d.name, 'visual.json'),'utf8')));
 if (new Set(visuals.map(x => x.name)).size !== visuals.length) errors.push('duplicate visual ID on ' + page.displayName);
 const counts = {};
 for (const v of visuals) {
  visualCount++;
  const name = v.name, pos = v.position, type = v.visual.visualType;
  counts[type] = (counts[type] || 0) + 1;
  if (!(type in total)) errors.push('unexpected visual type: ' + type + ' on ' + page.displayName);
  else total[type]++;
  if (!pos || [pos.x,pos.y,pos.width,pos.height].some(n => !Number.isFinite(n)) || pos.x < 0 || pos.y < 0 || pos.width <= 0 || pos.height <= 0 || pos.x+pos.width > 1280 || pos.y+pos.height > 960) errors.push('out of canvas: ' + name);
  if (pos.tabOrder !== pos.z) errors.push('tabOrder inconsistency: ' + name);
  const query = v.visual.query?.queryState || {};
  for(const role of Object.values(query)) for (const p of role.projections || []) {
    const m = p.field?.Measure;
    if(m && !measureNames.has(m.Expression.SourceRef.Entity+'.'+m.Property)) errors.push('missing measure: '+m.Property);
  }
  if (JSON.stringify(v.visual).includes('Perdas Acumuladas %')) errors.push('unvalidated accumulated losses visual: '+name);
 }
 for(let a=0;a<visuals.length;a++) for(let b=a+1;b<visuals.length;b++)
  if(intersects(visuals[a].position,visuals[b].position)) errors.push('overlap: '+page.displayName+' '+visuals[a].name+'/'+visuals[b].name);
 if(counts.slicer !== 3 || counts.cardVisual !== 3 || counts.textbox !== 2 || counts.tableEx !== 1) errors.push('incomplete scaffold: '+page.displayName);
 if((counts.clusteredBarChart||0)+(counts.lineChart||0) !== (ix===2?2:1)) errors.push('unexpected chart count: '+page.displayName);
}
if (visualCount !== 41) errors.push('expected 41 visual containers, observed '+visualCount);
if(errors.length) {for(const e of errors) console.error('FAIL:',e);process.exit(1);}
console.log('FLEET_DATAVIZ_STATIC_PASS pages=4 visuals='+visualCount+' cards='+total.cardVisual+' slicers='+total.slicer+' charts='+(total.clusteredBarChart+total.lineChart)+' tables='+total.tableEx);
console.log('Desktop render, interactions and PBIP round-trip remain UNVERIFIED');
