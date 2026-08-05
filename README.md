# 知序 AI · Baklib CMS 主题

面向团队知识管理与可信问答的 AI 产品官网。主题基于 Baklib `WWW` 模板重构，使用 Liquid、Tailwind CSS v4、Alpine.js、Turbo、Stimulus 和 Lucide。

## 页面内容

- 品牌首屏与可切换的 AI 知识工作台演示
- 六项产品能力、三步接入流程与三类业务场景
- 权限与可信机制、FAQ、行动入口
- 响应式导航、页脚、返回顶部和移动端布局
- 完整的 Baklib 站点设置、页面种子与主题预览图

## 本地开发

```bash
npm install
npm run build
```

构建产物会写入：

```text
assets/stylesheets/application.css
assets/javascripts/application.js
```

## 本地预览

Baklib Liquid 需要平台运行环境。项目提供一个不影响线上模板的静态预览生成器：

```bash
npm run preview:build
python3 -m http.server 4173
```

浏览器访问 `http://127.0.0.1:4173/preview/`。`preview/` 是生成目录，不会提交到 Git。

## 主要结构

```text
templates/index.mobile-app.liquid  首页入口与 Baklib Schema
snippets/zhixu/                  首页 Liquid 模块
src/stylesheets/zhixu/           品牌、页面区段与响应式样式
src/javascripts/zhixu.js         场景切换、FAQ 和滚动交互
seeds/                           站点设置与内容种子
scripts/build-preview.mjs        本地静态预览生成器
```

## Baklib 安装

1. 将本项目提交到可访问的 Git 仓库。
2. 在 Baklib 进入“管理 -> 组织模板 -> Git 安装外部模板”。
3. 填写仓库地址并安装主题。
4. 首页布局选择“知序 AI 产品首页”。
5. 在站点设置中确认品牌名、导航、页脚与行动按钮。

官方开发说明：[Baklib Git 模板开发](https://dev.baklib.cn/guide/git)。
