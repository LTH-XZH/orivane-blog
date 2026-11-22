# 上线清单 · orivane.me

站是纯静态的：`npm run build` 出来的 `dist/` 就是整站，没有任何服务端依赖。
下面这条路全是免费的。

---

## 0. 本地先构建

```sh
npm run build
```

成功后会生成 `dist/`。打开 `dist/index.html` 能看到页面，说明构建没问题。

---

## 1. 把站传到 Cloudflare Pages

1. 打开 <https://dash.cloudflare.com>，登录（没有就注册，邮箱随便，但**记好**）
2. 左边找到 **Workers & Pages** → **Create** → 切到 **Pages** 页签 → **Upload assets**
3. 项目名填 `orivane`，点创建
4. 把 `dist` **文件夹里的内容**拖进上传区（拖整个 `dist` 文件夹也可以）
5. 点 **Deploy site**

完成后会给你一个地址：`https://orivane.pages.dev`。**先确认这个地址能打开**，这一步过了再碰域名。

---

## 2. 把域名交给 Cloudflare 管（唯一有点"技术感"的一步）

改的是**域名的 NS（域名服务器）**，不改内容、不影响已有邮箱。

1. Cloudflare 首页 → **Add a site** → 输入 `orivane.me` → 选 **Free** 计划
2. 它会给你两条 NS，长得像：
   ```
   xxx.ns.cloudflare.com
   yyy.ns.cloudflare.com
   ```
   **把这两条复制下来**
3. 打开阿里云 → 控制台 → **域名** → 找到 `orivane.me` → **管理**
4. 找到 **DNS 修改 / 修改 DNS 服务器**（不是"解析设置"），把默认的阿里云 NS 换成上面那两条
5. 保存。然后等，通常 **10 分钟到 2 小时**，最长 24 小时

**怎么判断好了**：回 Cloudflare 首页，`orivane.me` 的状态从 `Pending` 变成 **Active**。

> 这一步走完，阿里云那边原来的"解析设置"就不起作用了，DNS 全由 Cloudflare 管。以后加记录都去 Cloudflare。
>
> 不想改 NS 的话，**Vercel** 是替代方案：不用动 NS，只要在阿里云加一条 CNAME 指向 `cname.vercel-dns.com`。代价是大陆访问明显不如 Cloudflare 稳。

---

## 3. 把域名绑到 Pages 上

1. 回到 Pages 项目 `orivane` → **Custom domains** → **Set up a custom domain**
2. 输入 `orivane.me` → 确认（Cloudflare 会自动建好 CNAME）
3. 再点一次，加上 `www.orivane.me`，它会自动配一条跳转
4. 等证书签发，通常 **几分钟**

证书好了以后，`https://orivane.me` 就能打开你的站了。

---

## 4. 验收（逐条打勾）

- [ ] `https://orivane.me` 打得开，地址栏是小锁
- [ ] `https://orivane.me/blog/` 打得开
- [ ] `https://orivane.me/rss.xml` 返回的是 XML，里面链接是 `orivane.me`
- [ ] `https://orivane.me/sitemap-index.xml` 打得开
- [ ] 手机**关掉 WiFi 用流量**打开一次（很多"只有校园网能开"的问题只有这样才发现）
- [ ] 换一台不认识的设备、无痕窗口打开一次（排除缓存）

---

## 5. 邮箱（可选，5 分钟）

用 Cloudflare 的 **Email Routing** 免费把 `hi@orivane.me` 转到你的常用邮箱：

1. Cloudflare → 选中 `orivane.me` → **Email** → **Email Routing** → **Enable**
2. 它会自动加好 MX 记录，按提示点确认
3. **Destination address** 填你真正在用的邮箱 → 去那个邮箱点确认链接
4. **Routes** → 添加 `hi@orivane.me` → 转发到上面的地址

之后 `hi@orivane.me` 收到的信都会落到你常用邮箱，对外只露域名邮箱。

---

## 6. 以后改内容怎么更新

**方式 A（手动，够用）**：改完 → `npm run build` → Pages 项目 → **Create new deployment** → 重新拖 `dist`。

**方式 B（自动，推荐以后做）**：把仓库推到 GitHub，在 Pages 里改成一个 Git 项目，绑定后每次 `git push` 自动构建部署。等写过一阵子再折腾这个，不影响现在。

---

## 排错对照

| 现象 | 原因 / 怎么办 |
| :-- | :-- |
| `pages.dev` 能开，`orivane.me` 打不开 | NS 还没切换完，继续等；或阿里云 DNS 里还留着旧的 A/CNAME 记录，删掉 |
| Cloudflare 一直 `Pending` | NS 填错了（要两条都填），或还没生效 |
| 证书一直 pending | 域名下有冲突的 A/CNAME，删掉再重试；也确认 NS 已经 Active |
| 阿里云里域名状态不是"正常" | 实名认证没过，去控制台补 |
| 站能开但样式全丢了 | `dist` 上传的是文件夹外壳而不是里面的内容，重新拖 `dist` 里面的文件 |

---

域名到期日是 **2027-11**（阿里云控制台能看到准确日期）。建议在手机日历里设个 **2027-10-01** 的提醒，留一个月处理续费或转移——域名过期后的赎回费很贵。

---

## 7. 评论（Giscus，约 10 分钟）

评论区已经写好，缺的只是 4 个 ID。Giscus 把评论存进 GitHub Discussions，不需要服务器、不花钱。

1. **建一个公开仓库**（名字随意，比如 `orivane-comments`），必须是 **public**。
2. 仓库 → **Settings** → 拉到 **Features** → 勾选 **Discussions**。
3. 装 Giscus App：<https://github.com/apps/giscus> → **Install** → 只勾选刚才那个仓库。
4. 打开 <https://giscus.app/zh-CN>，仓库填 `你的用户名/orivane-comments`，分类选 **Announcements**。
5. 页面下方会生成一段 `<script>`，里面有两串 ID：

   ```html
   data-repo-id="R_kgDOxxxxxx"
   data-category-id="DIC_kwDOxxxxxx"
   ```

6. 填进 `src/consts.ts`：

   ```ts
   export const GISCUS = {
       repo: '你的用户名/orivane-comments',
       repoId: 'R_kgDOxxxxxx',
       category: 'Announcements',
       categoryId: 'DIC_kwDOxxxxxx',
   };
   ```

7. `npm run build` → 上传 `dist`。文章页底部就有评论区了，深浅色跟着站点切换。

**注意**：Giscus 基于 GitHub，访客要登录 GitHub 才能评论。想让人不注册也能留言，见下一节。

---

## 8. 匿名评论（Twikoo / Waline）

"输个昵称就能留言"这件事，**静态站自己做不到**——评论总得存在某个地方。所以需要一个小后端，两个选择：

| 方案 | 后端 | 免费额度 | 适合 |
| :-- | :-- | :-- | :-- |
| **Waline** | Vercel + LeanCloud/Neon | 够个人博客用 | 想少折腾，一鍵部署 |
| **Twikoo** | 腾讯云开发 CloudBase | 有免费套餐 | 国内访问快，后台直观 |

两个都已经写好接入代码，改一行就能切换：

```ts
// src/consts.ts
export const COMMENT_PROVIDER: 'giscus' | 'twikoo' | 'waline' | 'none' = 'waline';
```

### 用 Waline（推荐，约 15 分钟）

1. 打开 <https://waline.js.org/guide/get-started/>，点 **Deploy to Vercel**
2. 按引导建一个数据库（LeanCloud 国际版免费，或 Neon）
3. 部署完拿到一个地址，形如 `https://xxx.vercel.app`
4. 填进 `src/consts.ts`：

   ```ts
   export const COMMENT_PROVIDER = 'waline';
   export const WALINE = { serverURL: 'https://xxx.vercel.app' };
   ```

5. `npm run build` → 上传 `dist`

### 用 Twikoo

1. 按 <https://twikoo.js.org/quick-start.html> 部署（腾讯云开发最快）
2. 拿到**环境 ID**（或 Vercel 部署后的地址）
3. 填进 `src/consts.ts`：

   ```ts
   export const COMMENT_PROVIDER = 'twikoo';
   export const TWIKOO = { envId: '你的环境ID' };
   ```

### 还有一条路：自己在 Cloudflare 上写

你域名和部署都在 Cloudflare，理论上可以用 **Cloudflare Workers + D1**（SQLite）自己做一个评论接口，免费额度完全够个人站，还不用多注册一个平台。代价是要写一百来行后端代码，并处理防刷、审核。

想做的话跟我说，我可以直接把这套 Worker 写完，你只要 `wrangler deploy` 一次。

### 三者怎么选

- 只给认识的人看、不介意 GitHub 账号 → **giscus**（现在这套，零成本）
- 朋友多、要"输昵称就能发" → **waline**
- 更在意国内访问速度 → **twikoo**
- 想全在自己的 Cloudflare 账号里 → 自建 Worker + D1
