import {words} from './data';
export type RecordEntry = {stage:number; due:number; correct:number; attempts:number; mistakes:number};
export type Progress = {version:1; entries:Record<string,RecordEntry>; xp:number; days:string[]};
export const emptyProgress=():Progress=>({version:1,entries:{},xp:0,days:[]});
export const intervals=[1,3,7,14,30];
export function updateProgress(p:Progress,word:string,correct:boolean,now=Date.now()):Progress {
 const old=p.entries[word]??{stage:0,due:0,correct:0,attempts:0,mistakes:0};
 const stage=correct?Math.min(old.stage+1,5):0;
 const day=new Date(now).toLocaleDateString('en-CA');
 return {...p,xp:p.xp+(correct?10:0),days:p.days.includes(day)?p.days:[...p.days,day],entries:{...p.entries,[word]:{stage,due:now+(correct?intervals[stage-1]*86400000:600000),correct:old.correct+Number(correct),attempts:old.attempts+1,mistakes:old.mistakes+Number(!correct)}}};
}
export function loadProgress():Progress {try {const p=JSON.parse(localStorage.getItem('ielts-words-v1')??'null');if(p?.version===1&&p.entries&&typeof p.xp==='number'&&Array.isArray(p.days)&&Object.entries(p.entries).every(([key,v])=>words.some(w=>w.word===key)&&v&&typeof v==='object'&&['stage','due','correct','attempts','mistakes'].every(k=>typeof (v as Record<string,unknown>)[k]==='number')))return p;}catch{}return emptyProgress();}
export function dueWords(p:Progress,now=Date.now()){return words.filter(w=>p.entries[w.word]&&p.entries[w.word].due<=now);}
export function normalize(s:string){return s.trim().toLowerCase().replace(/[.!?]+$/,'');}
export function choices(target:string,pool:string[]){return [...new Set([target,...pool.filter(x=>x!==target).slice(0,3)])].sort((a,b)=>a.localeCompare(b));}
