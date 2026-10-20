export type Word = {word:string; meaning:string; synonym:string; context:string; hint:string; topic:number};
export const topics = [ {name:'教育与成长',en:'Education & Growth',icon:'✧',color:'purple'}, {name:'环境与自然',en:'Environment & Nature',icon:'♧',color:'green'}, {name:'科技与社会',en:'Technology & Society',icon:'⌘',color:'blue'} ];
export const words:Word[] = [
{word:'acquire',meaning:'获得；习得',synonym:'gain',context:'Children ___ language naturally through everyday interaction.',hint:'通过互动逐渐获得语言能力，而不是购买。',topic:0},
{word:'assess',meaning:'评估；评价',synonym:'evaluate',context:'Teachers use regular quizzes to ___ students’ progress.',hint:'测验帮助老师判断学生的学习情况。',topic:0},
{word:'enhance',meaning:'提高；增强',synonym:'improve',context:'Reading widely can ___ your understanding of different cultures.',hint:'广泛阅读能够使理解变得更好。',topic:0},
{word:'retain',meaning:'保留；记住',synonym:'keep',context:'Spaced practice helps learners ___ new information for longer.',hint:'间隔练习帮助知识更长久地留在记忆中。',topic:0},
{word:'sustain',meaning:'维持；支撑',synonym:'maintain',context:'The region lacks enough water to ___ its growing population.',hint:'水资源需要支撑不断增长的人口。',topic:1},
{word:'conserve',meaning:'保护；节约',synonym:'preserve',context:'Turning off unused lights helps ___ energy.',hint:'关灯可以减少能源浪费。',topic:1},
{word:'diminish',meaning:'减少；减弱',synonym:'decrease',context:'Pollution will ___ if more commuters use public transport.',hint:'公共交通能让污染变少。',topic:1},
{word:'adapt',meaning:'适应；调整',synonym:'adjust',context:'Many species must ___ to changes in their natural habitat.',hint:'环境改变后，物种需要调整自身。',topic:1},
{word:'innovate',meaning:'创新；革新',synonym:'invent',context:'Companies must ___ to stay competitive in a changing market.',hint:'企业要通过新方法保持竞争力。',topic:2},
{word:'facilitate',meaning:'促进；使便利',synonym:'enable',context:'Online platforms ___ communication across national borders.',hint:'网络平台让跨国交流更容易。',topic:2},
{word:'allocate',meaning:'分配；拨出',synonym:'distribute',context:'Governments should ___ more funding to digital infrastructure.',hint:'政府需要把资金分给基础设施建设。',topic:2},
{word:'transform',meaning:'改变；转变',synonym:'change',context:'Artificial intelligence may ___ the way we work.',hint:'人工智能可能彻底改变工作方式。',topic:2}
];
