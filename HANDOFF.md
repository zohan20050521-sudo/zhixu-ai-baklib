# 知序 AI Baklib 项目交接文档

最后更新：2026-08-05

## 1. 项目定位

- 项目目录：`/home/chad/project/zhixu-ai-baklib`
- 项目目标：根据 Baklib 入门任务制作一个可展示网页设计、HTML、JavaScript、UI 审美和 Baklib 模板开发能力的实习作品。
- 当前作品：面向团队知识管理与可信问答场景的“知序 AI”产品官网。
- 基础模板：Baklib `WWW` 模板，当前 Git 基线提交为 `c8e2b0f`。

当前成果是一个完成度较高的 Baklib 前端主题，不是完整的 AI 应用。它包含 Liquid 模板、响应式样式、前端交互、Baklib 配置和内容种子，但没有后端、数据库、账号系统或真实大模型调用。

## 2. 当前完成状态

### 已完成

- 品牌首屏和产品价值说明。
- 三种可切换场景的 AI 知识工作台演示。
- 六项核心能力、三步知识接入流程和三类业务场景。
- 权限与可信机制、FAQ、行动入口和完整页脚。
- 桌面端与移动端响应式导航。
- 场景切换、移动菜单、FAQ 展开、锚点导航和返回顶部交互。
- Baklib 首页模板、站点设置、页面种子和主题预览图。
- 本地静态预览生成器。
- Tailwind CSS 和 JavaScript 构建流程。

### 尚未完成

- 尚未提交本次改动。
- 尚未推送到 GitHub 或其他远程 Git 仓库。
- 尚未将新主题安装到 Baklib。
- 线上 Baklib 试用站点尚未更新。
- 页面仍有较多文案直接写在 Liquid 片段中，后台可编辑能力不足。
- 未接入 Baklib 的真实内容管理工作流演示。
- 未接入真实 AI API、后端服务、数据库或用户登录。

## 3. “低代码”能力边界

当前项目使用了 Baklib 主题开发所需的 Liquid、Schema、Seeds 和主题目录结构，因此可以作为 Baklib 模板开发作品。但仅在本地展示这个页面，更准确的描述是“AI 辅助完成的 Baklib 前端主题开发”，不能直接称为完整低代码应用。

要让作品真正体现低代码能力，下一阶段至少需要做到：

1. 将主题安装到 Baklib，并提供可访问的线上地址。
2. 把品牌文案、功能介绍、场景和 FAQ 等关键内容迁移为 Baklib 后台可编辑的数据。
3. 演示一次“后台修改内容 -> 发布 -> 前台自动更新”的完整流程。
4. 至少使用一项真实的平台能力，例如知识内容、站内搜索或表单。

如果继续增加真实 AI 能力，API 密钥必须放在服务端或平台环境变量中，不得写进浏览器 JavaScript、仓库、日志或提交记录。

## 4. 主要文件

```text
templates/index.mobile-app.liquid  首页入口、模块装配与 Baklib Schema
snippets/zhixu/                   首页各区段的 Liquid 片段
src/stylesheets/zhixu/            品牌、区段、场景和响应式样式源文件
src/javascripts/zhixu.js          首页交互源文件
src/stylesheets/application.css   样式构建入口
src/javascripts/application.js    JavaScript 构建入口
assets/stylesheets/application.css 构建后的主题 CSS
assets/javascripts/application.js  构建后的主题 JavaScript
config/settings_schema.json       Baklib 主题设置定义
seeds/001_site.yml                站点设置种子
seeds/002_pages.yml               页面内容种子
snippets/_header.liquid           全站导航
snippets/_footer.liquid           全站页脚
layout/theme.liquid               主题基础布局
assets/images/theme/zhixu-home.png 主题预览图
scripts/build-preview.mjs         本地静态预览生成器
README.md                         项目使用说明
```

## 5. 本地运行

在项目目录执行：

```bash
cd /home/chad/project/zhixu-ai-baklib
npm install
npm run build
npm run preview:build
python3 -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173/preview/
```

说明：

- `npm run build` 会重新生成 `assets/stylesheets/application.css` 和 `assets/javascripts/application.js`。
- `npm run preview:build` 会生成被 Git 忽略的 `preview/` 目录。
- Baklib Liquid 最终仍需在 Baklib 平台环境中验证；静态预览只能覆盖当前首页展示和前端交互。
- 如果 `4173` 端口已占用，可以换用其他端口，并同步修改浏览器地址。

## 6. 已完成的验证

- `npm run build`：通过。
- `npm run preview:build`：通过。
- `config/settings_schema.json`：JSON 解析通过。
- `seeds/001_site.yml`、`seeds/002_pages.yml`：YAML 解析通过。
- Liquid 首页片段：结构解析通过。
- `git diff --check`：通过。
- 浏览器尺寸：已检查 `1440x900`、`390x844` 和 `320x700`。
- 浏览器交互：场景切换、移动菜单、FAQ、锚点和返回顶部已检查。
- 页面状态：未发现控制台错误、横向溢出或移动端文字遮挡。

接手后仍应重新运行构建和浏览器检查，因为上述结果只对应当前交接时的代码状态。

## 7. Git 与外部环境状态

- 当前所有主题重构改动均未提交，请先运行 `git status --short` 和 `git diff` 了解现状。
- 不要重置、覆盖或丢弃现有改动。
- 不要在 `/home/chad` 根目录创建源码；所有后续修改继续放在本项目目录。
- 当前没有获得创建远程仓库、推送代码或修改 Baklib 线上站点的授权。
- 在执行 GitHub 推送、Git 安装外部模板或 Baklib 发布前，必须先向用户确认目标仓库和授权范围。
- 用户浏览器的 Baklib 登录态可能与自动化浏览器隔离，后台安装时可能需要用户配合登录。

## 8. 推荐接手顺序

1. 阅读本文件和 `README.md`，检查 `git status --short`。
2. 运行 `npm run build` 与 `npm run preview:build`，确认当前基线可用。
3. 审核首页各片段，列出“已由 Baklib 管理”和“仍然硬编码”的内容。
4. 优先把最能证明低代码能力的内容改为后台可编辑，保持现有视觉和交互不退化。
5. 再次完成桌面端、移动端、控制台和溢出检查。
6. 获得用户授权后，使用指定 Git 仓库推送并在 Baklib 安装主题。
7. 在线验证内容编辑、发布和前台更新流程，准备作品链接与演示说明。

## 9. 交付标准

- 页面在线可访问，桌面端和移动端无明显布局问题。
- 用户能在 Baklib 后台修改至少一组关键内容，无需改源码。
- 后台修改发布后，前台能正确更新。
- 构建通过，浏览器控制台无错误，没有横向溢出。
- 不把演示交互描述成真实 AI 功能。
- 不泄露任何账号、Token、API Key 或其他敏感信息。

## 10. 可直接使用的 AI 交接提示词

```text
请接手位于 /home/chad/project/zhixu-ai-baklib 的“知序 AI”Baklib 项目。

先完整阅读项目根目录的 HANDOFF.md 和 README.md，再检查 git status --short、现有目录结构和关键 Liquid/JavaScript/CSS 文件。保留全部现有改动，不要 reset、checkout 或覆盖用户代码，也不要在 /home/chad 根目录创建项目。

当前作品是一个完成度较高的 Baklib 前端主题，但还没有充分证明低代码能力：页面部分内容仍然硬编码，尚未安装到 Baklib，也没有真实 AI 后端。你的当前目标是把它完善为能证明 Baklib 低代码开发能力的作品。先审核哪些内容由 Baklib 管理、哪些仍写死在模板中，然后用最小改动让品牌文案、功能介绍、应用场景或 FAQ 中至少一组关键内容能够在 Baklib 后台编辑，同时保持当前视觉、响应式布局和交互质量。

改动前先给我一个简短计划，改动后运行 npm run build、npm run preview:build 和 git diff --check，并检查 1440px、390px、320px 三种宽度下的页面、浏览器控制台与横向溢出。不要伪造真实 AI 功能，不要把 API Key 放进前端。

创建或使用远程 Git 仓库、推送代码、安装 Baklib 外部模板、修改线上站点都属于外部写入操作，必须先获得我的明确授权。获得授权后，再完成部署、后台编辑到前台更新的验证，并交付线上链接和简短演示说明。全程使用简体中文汇报。
```
