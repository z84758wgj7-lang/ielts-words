import {test,expect} from '@playwright/test';
test('complete four exercise types and persist progress',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await page.getByRole('button',{name:'开始今日学习'}).click();
 const vocabulary=[['acquire','获得；习得','gain'],['assess','评估；评价','evaluate'],['enhance','提高；增强','improve'],['retain','保留；记住','keep']];
 for(let kind=0;kind<4;kind++)for(let i=0;i<4;i++){
  const word=vocabulary[i];
  if(kind===3){await page.getByRole('textbox',{name:'英文单词'}).fill(word[0]);await page.getByRole('button',{name:'检查答案'}).click();}
  else{await page.getByRole('button').filter({hasText:new RegExp(word[kind]+'$')}).click();await page.getByRole('button',{name:'确认答案'}).click();}
  await expect(page.getByRole('status')).toContainText('回答正确');
  await page.getByRole('button',{name:kind===3&&i===3?'查看本轮成果':'下一题'}).click();
 }
 await expect(page.getByText('完成 16 道练习，答对 16 道。')).toBeVisible();await page.reload();
 await expect(page.getByText('160',{exact:false}).first()).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('ielts-words-v1')!));expect(saved.entries.acquire.stage).toBe(4);expect(saved.xp).toBe(160);expect(errors).toEqual([]);
});
test('wrong answers enter notebook and due review can start',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'开始今日学习'}).click();await page.getByRole('button').filter({hasText:/assess$/}).click();await page.getByRole('button',{name:'确认答案'}).click();await expect(page.getByRole('status')).toContainText('再记一次');
 await page.getByRole('button',{name:'我的错词本'}).click();await expect(page.getByText('答错 1 次')).toBeVisible();
 await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('ielts-words-v1')!);p.entries.acquire.due=0;localStorage.setItem('ielts-words-v1',JSON.stringify(p));});await page.reload();await page.getByRole('button',{name:/间隔复习/}).click();await page.getByRole('button',{name:'开始复习',exact:true}).click();await expect(page.getByText('1 / 4',{exact:true})).toBeVisible();
});
test('mobile navigation fits viewport',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.getByRole('button',{name:'打开导航'}).click();await page.getByRole('button',{name:'学习统计'}).click();await expect(page.getByRole('heading',{name:'你的学习足迹'})).toBeVisible();});
