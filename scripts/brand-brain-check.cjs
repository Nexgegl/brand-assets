#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const load=p=>JSON.parse(read(p));
const tokens=load('colors/nexgegl-design-tokens.json');
const typography=load('typography/typography.json');
const suite=load('tests/brand-compliance-cases.json');
const BRAND={primary:'#2E3158',accent:'#B79A56',surface:'#363969',deep:'#232545',text:'#FFFFFF'};
const KFSA={kill:'#DC2626',alert:'#F59E0B',fix:'#2563EB',scale:'#16A34A'};
const ASSETS=new Set(['logos/nexgegl-logo-dark-bg.png','logos/nexgegl-logo-light-bg.png','logos/nexgegl-logo-transparent-dark.png','logos/nexgegl-logo-transparent-light.png']);
const bannedColor={test:code=>/#[a-f\d]{3,8}\b/i.test(code)
 || /\b(?:rgba?|hsla?|oklch|lab|color)\s*\(/i.test(code)
 || /(?:text|bg|border|from|to|via)-(?:red|rose|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|pink|fuchsia|gray|slate|zinc|neutral|stone)-\d+/i.test(code)
 || [...code.matchAll(/(?:text|bg|border)-\[([^\]]+)\]/g)].some(m=>!m[1].includes('var(--nxg-'))};
const checks={
'token-parity':x=>Object.entries(BRAND).every(([k,v])=>x.brand?.[k]===v)&&Object.entries(KFSA).every(([k,v])=>x.kfsa?.[k]===v),
'component-colors':x=>typeof x.code==='string'&&!bannedColor.test(x.code),
'state-usage':x=>typeof x.state==='string'&&Object.hasOwn(KFSA,x.state.toLowerCase())&&x.surface==='--nxg-surface'&&x.accent==='--kfsa-'+x.state.toLowerCase()&&x.evidence==='KFSA',
'terminology':x=>typeof x.text==='string'&&!/(operating[\s_-]*system|o\s*\.\s*s\s*\.|\bOS\b|نظام\s*تشغيل)/iu.test(x.text)&&!/\bnexgegl\b/.test(x.text.replace(/NEXGEGL/g,'')),
'claims':x=>{if(typeof x.text!=='string')return false;const claim=/(\d[\d,]*(?:[.,]\d+)?\s*(?:%|٪|percent|SAR|ريال)|[٠-٩]+\s*٪|\b(?:guarantee|guaranteed|certified|approved by|saved|savings|reduce costs)\b|نضمن|توفير|معتمد|اعتماد)/iu.test(x.text);return !claim||(x.evidence?.status==='VERIFIED'&&typeof x.evidence?.source==='string'&&x.evidence.source.length>3&&typeof x.evidence?.approvedBy==='string');},
'publication':x=>x.actor==='HUMAN'&&x.humanApproval===true&&x.action==='PUBLISH',
'typography':x=>x.status==='PENDING_APPROVAL'&&x.canonical===false&&x.approvedFamily===null&&x.action==='DRAFT',
'assets':x=>x.brand==='NEXGEGL'&&ASSETS.has(x.logo)&&x.approval===true,
'decision':x=>x.source==='KFSA'&&['KILL','FIX','SCALE','ALERT'].includes(x.verdict)&&typeof x.evidence==='string'&&x.evidence.length>0
};
function assess(test){const fn=checks[test.rule];assert.equal(typeof fn,'function','Unregistered rule '+test.rule);return fn(test.input)?'ALLOW':'BLOCK';}
for(const [k,v] of Object.entries(BRAND))assert.equal(tokens.brand[k]?.value,v,'Brand token drift: '+k);
for(const [k,v] of Object.entries(KFSA))assert.equal(tokens.kfsa[k]?.value,v,'KFSA token drift: '+k);
assert.equal(typography.canonical,false,'Typography cannot become canonical in this PR');
assert.equal(typography.status,'PENDING_APPROVAL');
for(const language of ['arabic','english']){assert.equal(typography.fonts[language].status,'PENDING_APPROVAL');assert.equal(typography.fonts[language].approvedFamily,null);}
for(const section of ['weights','sizes','lineHeights'])assert.equal(typography[section].status,'PENDING_APPROVAL');
for(const p of ['docs/BRAND_DNA.md','docs/BRAND_VOICE.md','ai/AI_BRAND_INSTRUCTIONS.md'])assert.ok(read(p).length>200,'Missing document '+p);
assert.ok(suite.cases.length>=35,'Missing negative regressions');
let passed=0,negative=0;const ids=new Set();
for(const test of suite.cases){
 assert.ok(!ids.has(test.id),'Duplicate test identifier');ids.add(test.id);
 assert.ok(['ALLOW','BLOCK'].includes(test.expected),'Invalid expected outcome');
 assert.equal(assess(test),test.expected,test.id+': '+test.rule);passed++;
 if(test.expected==='BLOCK')negative++;
}
assert.ok(negative>=20,'Insufficient negative cases');
console.log('PASS: '+passed+'/'+suite.cases.length+' reusable-rule cases ('+negative+' negative).');
console.log('PASS: locked token integrity, document presence, Typography PENDING_APPROVAL.');
console.log('LIMITATION: CI verifies defined fixtures/contracts only. It is not human brand approval or authorization to publish.');
