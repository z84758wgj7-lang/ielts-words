import {describe,it,expect,vi,afterEach} from 'vitest';
import {emptyProgress,updateProgress,dueWords,normalize,loadProgress,choices} from './learning';
describe('learning and spaced repetition',()=>{
 it('schedules 1,3,7,14,30 day intervals and caps stage',()=>{let p=emptyProgress();const now=1000;for(const [i,days] of [1,3,7,14,30,30].entries()){p=updateProgress(p,'acquire',true,now);expect(p.entries.acquire.stage).toBe(Math.min(i+1,5));expect(p.entries.acquire.due).toBe(now+days*86400000);}expect(p.xp).toBe(60);expect(p.days).toHaveLength(1);});
 it('resets incorrect words and reviews them after ten minutes',()=>{let p=updateProgress(emptyProgress(),'acquire',true,1000);p=updateProgress(p,'acquire',false,2000);expect(p.entries.acquire).toMatchObject({stage:0,mistakes:1,attempts:2,correct:1,due:602000});expect(dueWords(p,601999)).toHaveLength(0);expect(dueWords(p,602000).map(w=>w.word)).toEqual(['acquire']);expect(p.xp).toBe(10);});
 it('never schedules unseen words',()=>expect(dueWords(emptyProgress())).toEqual([]));
 it('normalizes typed answers',()=>expect(normalize('  ACQUIRE. ')).toBe('acquire'));
 it('includes the correct answer exactly once',()=>expect(choices('gain',['gain','keep','change','adjust','gain'])).toEqual(['adjust','change','gain','keep']));
});
describe('persistence',()=>{
 afterEach(()=>vi.unstubAllGlobals());
 it('restores saved progress',()=>{const p=updateProgress(emptyProgress(),'acquire',true);vi.stubGlobal('localStorage',{getItem:()=>JSON.stringify(p)});expect(loadProgress()).toEqual(p);});
 it.each(['invalid','null','{"version":1,"entries":{"acquire":null},"xp":1,"days":[]}'])('recovers corrupt data: %s',value=>{vi.stubGlobal('localStorage',{getItem:()=>value});expect(loadProgress()).toEqual(emptyProgress());});
 it('handles unavailable storage',()=>{vi.stubGlobal('localStorage',{getItem:()=>{throw Error('blocked');}});expect(loadProgress()).toEqual(emptyProgress());});
});
