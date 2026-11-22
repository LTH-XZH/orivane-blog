# 用 Git 自动部署（不用再手动拖 dist）

目标：本地 `git push` → Cloudflare 自动构建 → 几十秒后线上更新。

**先说一个绕不过去的点**：你现在那个项目是「上传文件」建的，Cloudflare **不允许把这种项目改成 Git 项目**。所以要新建一个项目，然后把 `orivane.me` 挪过去。旧的先别删，出问题能马上切回来。

---

## 一、把代码推到 GitHub（5 分钟）

代码已经提交好了，本地仓库是干净的，只差一个远程地址。

1. 打开 <https://github.com/new>，仓库名随意（建议 `orivane`），**Public / Private 都行**（Private 需要给 Cloudflare 授权）。**不要**勾选初始化 README。
2. 在本地终端执行（把地址换成你的）：

   ```powershell
   cd C:\Users\lenovo\second-sphere
   git remote add origin https://github.com/LTH-XZH/orivane.git
   git branch -M main
   git push -u origin main
   ```

3. 刷新 GitHub 页面，能看到 `src/`、`docs/`、`package.json` 就对了。

> `.gitignore` 已经排除了 `dist/`、`node_modules/`、`.astro/`，所以推上去的只有源码，很小。

---

## 二、在 Cloudflare 新建一个接 Git 的项目

1. Cloudflare → **Workers & Pages** → **Create application**
2. 选 **Connect GitHub**（不是 Upload your static files）→ 授权 → 选中刚才那个仓库
3. 构建配置：

   | 项 | 值 |
   | :-- | :-- |
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | 生产分支 | `main` |

4. 点 **Deploy**，等它跑完（第一次 1–3 分钟）。会给你一个新的 `xxx.workers.dev` 地址。

**如果构建报 Node 版本错误**：到项目 → Settings → Environment variables 加一条 `NODE_VERSION` = `22.23.4`（`package.json` 里写的是 `>=22.23.4`）。

---

## 三、把 orivane.me 挪到新项目

域名同一时间只能挂在一个项目上，所以要**先摘再挂**：

1. 打开**旧项目** → **Domains** → 把 `orivane.me` 和 `www.orivane.me` 都 **Remove**
2. 打开**新项目** → **Domains** → **Add a custom domain** → 加 `orivane.me`（子域名留空）→ 再加 `www`
3. 等一两分钟，访问 `https://orivane.me` 确认是新项目在服务

> 旧项目先留着，它的 `*.workers.dev` 地址还能打开。确认新站一切正常后，再去旧项目 Settings 里删掉。

---

## 四、以后的写作流程

```powershell
git add -A
git commit -m "新文章：某某"
git push
```

推完 Cloudflare 自动构建并发布，**不用再打开控制台**，也不用本地 `npm run build`。

想本地先看效果就 `npm run dev`，改完直接 commit。

---

## 五、常见问题

| 现象 | 原因 |
| :-- | :-- |
| 推上去但线上没变 | 看新项目的 Deployments 有没有新构建；分支名要和生产分支一致 |
| 构建失败：Node 版本 | 加 `NODE_VERSION` 环境变量 |
| 构建失败：找不到 dist | Build output directory 填的是 `dist`，别填 `dist/` 或 `./dist` |
| 图片 404 | 图片要放 `public/` 下，Markdown 里写 `/images/xxx.jpg` |
| 域名报 "already in use" | 旧项目上还没移除，先 Remove 再 Add |
| 想回滚 | 新项目 Deployments 里选一个历史版本 → Rollback |

---

## 六、想让它每天自动重建（可选）

活跃图会随时间自己滚动，其实不必每天构建。但如果你希望搜索引擎和禁用 JS 的读者也看到最新日期，可以每天触发一次构建：

在 `.github/workflows/rebuild.yml` 放一个定时任务，每天往仓库空推一次提交即可。

需要的话我帮你写这个 workflow——它不会改动任何内容，只是给 Cloudflare 一个「该重建了」的信号。
