#!/usr/bin/env node
const fs=require('node:fs');
const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const tokens=json('colors/nexgegl-design-tokens.json');
const type=json('typography/typography.json');
const tests=json('tests/brand-compliance-cases.json');
const expected={primary:'#2E3158',accent:'#B79A56',surface:'#363969',deep:'#232545',text:'#FFFFFF'};
const states={kill:'#DC2626',alert:'#F59E0B',fix:'#2563EB',scale:'#16A34A'};
for(const [key,v] of Object.entries(expected))assert.equal(tokens.brand[key].value,v,`Brand token drift: ${key}`);
for(const [key,v] of Object.entries(states))assert.equal(tokens.kfsa[key].value,v,`KFSA token drift: ${key}`);
assert.equal(type.canonical,false,'Unapproved typography must not be canonical');
assert.equal(type.status,'PENDING_APPROVAL');
for(const k of ['arabic','english'])assert.equal(type.fonts[k].approvedFamily,null);
for(const p of ['docs/BRAND_DNA.md','docs/BRAND_VOICE.md','ai/AI_BRAND_INSTRUCTIONS.md'])assert.ok(read(p).length>200,`Missing content: ${p}`);
const expectedOutcomes={
'B-01':'PASS','B-02':'FAIL','B-03':'FAIL','B-04':'PASS','B-05':'FAIL','B-06':'FAIL','B-07':'FAIL','B-08':'FAIL','B-09':'FAIL','B-10':'FAIL','B-11':'FAIL','B-12':'FAIL','B-13':'PASS'
};
function evaluate(t){
const x=t.input;
switch(t.id){
case 'B-01':return Object.entries(expected).every(([k,v])=>x[k]===v)?'PASS':'FAIL';
case 'B-02':return /#[0-9a-f]{3,8}/i.test(x)?'FAIL':'PASS';
case 'B-03':return /(?:text|bg|border)-(?:red|amber|green|blue)-\d+/.test(x)?'FAIL':'PASS';
case 'B-04':return x.surface==='--nxg-surface'&&x.accent==='--kfsa-fix'?'PASS':'FAIL';
case 'B-05':return /^--kfsa-/.test(x.cardBackground)?'FAIL':'PASS';
case 'B-06':return x.logo==='generated approximation'?'FAIL':'PASS';
case 'B-07':return /\b(?:Operating System|OS)\b/i.test(x)?'FAIL':'PASS';
case 'B-08':return /guarantees? \d+%/.test(x)?'FAIL':'PASS';
case 'B-09':return x.approval===null&&x.logo.includes('partner')?'FAIL':'PASS';
case 'B-10':return x.action==='PUBLISH'&&x.approval===null?'FAIL':'PASS';
case 'B-11':return x.approval!=='APPROVED'?'FAIL':'PASS';
case 'B-12':return x.decisionSource!=='KFSA'?'FAIL':'PASS';
case 'B-13':return x.logo==='logos/nexgegl-logo-dark-bg.png'&&x.claim==='Decision Governance Layer'?'PASS':'FAIL';
default:throw Error('Unknown test: '+t.id);
}}
assert.equal(tests.cases.length,13);
for(const t of tests.cases){assert.equal(t.expected,expectedOutcomes[t.id],`Vector mismatch: ${t.id}`);assert.equal(evaluate(t),t.expected,`FAILED: ${t.id}`)}
console.log('Brand Brain structural contract: PASS (13 cases).');
console.log('NOTE: This is a targeted contract test, not a complete brand/copy/image/visual scanner.');
