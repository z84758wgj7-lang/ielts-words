# IELTS Words

React + TypeScript + Vite 构建的雅思词汇练习游戏。无需后端、账号或 API Key。

## 本地开发 / 云端预览

需要 Node.js 22+（开发验证使用 Node.js 24）。

```bash
cd /workspace/ielts-words
npm ci --cache /tmp/ielts-npm-cache
npm run dev -- --port 5173
```

在开发环境的端口面板打开 5173 的转发预览；在自己电脑运行时访问 http://localhost:5173。开发服务器监听所有网卡，仅在可信开发环境运行。

```bash
npm run build       # TypeScript 检查与生产构建，输出 dist/
npm run preview     # 预览构建，默认 4173 端口
npm test            # 学习逻辑与本地存储单元测试
npm run test:e2e    # Chromium 浏览器集成测试
```

浏览器测试默认使用 `/usr/bin/chromium`，可用 `CHROMIUM_PATH` 指定本机 Chromium 可执行文件。不需要把 Chromium 下载进仓库。

## 已实现

- 三个主题关卡：教育与成长、环境与自然、科技与社会；共 12 个内置词汇。
- 每词四次不同形式练习：语境选择、中文释义、英文近义词、英文拼写；每轮交错练习，避免连续机械重复。
- 即时解释、正确答案、可选浏览器英文发音；每次答对增加 10 XP。
- 连续答对四次标记掌握，答错重新巩固；错词自动收录。
- 间隔复习按 1、3、7、14、30 天安排；答错后 10 分钟重现。
- 学习正确率、掌握数量、学习天数和主题进度。
- localStorage 自动保存和恢复；数据损坏时安全回退，存储失败时明确提示。
- 桌面与手机响应式界面。

词汇内容在 `src/data.ts`；复习算法在 `src/learning.ts`。当前为 12 词的完整可玩版本，可继续扩充词库。发音依赖浏览器提供的语音，字体有本机回退。

进度仅保存在当前浏览器、当前站点，不跨设备同步；清除网站数据会删除进度。学习天数是累计有练习的天数，不代表连续打卡。XP 按答题累计，可重复练习。

## 保存到 GitHub

先检查改动，再提交并推送到新分支：

```bash
git status
git switch -c feat/ielts-words-game
git add .
git commit -m "Build IELTS vocabulary learning game"
git push -u origin feat/ielts-words-game
```

随后在 GitHub 为该分支创建 Pull Request，合并到 main。若环境已有同名分支，使用其他新分支名。本任务不会自动提交或推送。部署时可将 `dist/` 发布到静态托管；GitHub Pages 子目录部署需要按实际仓库路径设置 Vite `base`。
