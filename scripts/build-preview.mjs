import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const snippets = ["hero", "proof", "features", "workflow", "use_cases", "trust", "about", "faq_cta"]
const values = {
  brand_name: "知序 AI",
  hero_eyebrow: "团队知识助手 · 全新上线",
  hero_title: "把散落的知识，变成随时可用的答案。",
  hero_description: "连接团队文档、项目资料与业务系统。知序 AI 理解上下文、保留引用来源，让每个人都能快速找到可信答案。",
  primary_action_label: "体验产品演示",
  secondary_action_label: "了解产品能力",
  features_eyebrow: "核心能力",
  features_title: "不是多一个搜索框，而是多一位懂业务的同事",
  features_description: "从知识接入到答案生成，每一步都围绕准确、可信与可持续运营设计。",
  about_title: "关于知序 AI",
  about_description: "知序 AI 让团队知识被找到、被理解、被验证，并在真实工作场景中持续产生价值。",
  about_content: "<p>知序 AI 是一款面向团队的知识助手，目标是让散落在文档、项目和业务系统中的信息，成为每个人随时可用的答案。</p><p>产品坚持权限清晰、来源透明和持续治理三项原则，让 AI 带来的效率建立在可信基础上。</p><p>我们从客户支持、员工入职和项目协作等真实场景出发，帮助团队减少重复咨询、降低知识查找成本，并让重要经验得到持续复用。</p>",
  faq_question_1: "现有文档需要重新搬进知序 AI 吗？",
  faq_answer_1: "不需要。知序 AI 通过连接器读取并同步现有知识，原始内容仍保留在团队正在使用的平台中。",
  faq_question_2: "AI 会不会看到员工无权访问的内容？",
  faq_answer_2: "不会。检索前会校验当前用户权限，答案只使用该用户有权访问的知识，并保留访问记录。",
  faq_question_3: "回答不准确时，团队可以怎样改进？",
  faq_answer_3: "运营人员可以查看答案来源、用户反馈与无答案问题，修订原文或补充知识后，系统会自动更新索引。",
  faq_question_4: "适合从哪个场景开始试用？",
  faq_answer_4: "建议选择资料相对集中、重复咨询较多的场景，例如客服政策、员工入职或项目交付规范，更容易快速验证价值。",
  cta_title: "让团队的下一次提问，从答案开始。",
  cta_description: "从一个真实场景开始，体验知识被连接、理解和复用的完整过程。",
}

function renderSnippet(source) {
  return source
    .replace(/\{%\s*assign\s+[^%]+%\}\s*/g, "")
    .replace(
      /\{%\s*render\s+'icon',\s*name:\s*'([^']+)',\s*class:\s*'([^']+)'\s*%\}/g,
      '<i data-lucide="$1" class="$2" aria-hidden="true"></i>',
    )
    .replace(/\{\{\s*about_content\s*\}\}/g, values.about_content)
    .replace(/\{\{\s*(\w+)\s*\|\s*escape\s*\}\}/g, (_, key) => values[key] ?? "")
}

const renderedSnippets = await Promise.all(
  snippets.map(async (name) => {
    const source = await readFile(join(projectRoot, "snippets", "zhixu", `_${name}.liquid`), "utf8")
    return renderSnippet(source)
  }),
)

const header = `
<header class="zx-header" data-zhixu-header x-data="{ open: false }" @keydown.escape.window="open = false">
  <div class="zx-shell zx-header__inner">
    <a class="zx-brand" href="#" aria-label="知序 AI 首页">
      <span class="zx-brand__mark" aria-hidden="true"><i></i><i></i><b></b></span><span class="zx-brand__name">知序 AI</span>
    </a>
    <nav class="zx-header__nav" aria-label="主导航">
      <a href="#features">产品能力</a><a href="#workflow">工作方式</a><a href="#use-cases">使用场景</a><a href="#trust">安全可信</a><a href="#faq">常见问题</a>
    </nav>
    <div class="zx-header__actions"><a class="zx-header__login" href="#about">了解更多</a><a class="zx-button zx-button--header" href="#workspace">体验产品<i data-lucide="arrow-right" class="zx-button__icon"></i></a></div>
    <button class="zx-header__toggle" type="button" aria-controls="zx-mobile-menu" :aria-expanded="open.toString()" @click="open = !open" title="打开导航">
      <span class="sr-only">打开或关闭导航</span><span x-show="!open"><i data-lucide="menu" class="zx-header__toggle-icon"></i></span><span x-show="open" x-cloak><i data-lucide="x" class="zx-header__toggle-icon"></i></span>
    </button>
  </div>
  <div id="zx-mobile-menu" class="zx-mobile-menu" x-show="open" x-cloak x-transition.opacity>
    <button class="zx-mobile-menu__backdrop" type="button" aria-label="关闭导航" @click="open = false"></button>
    <nav class="zx-mobile-menu__panel" aria-label="移动端导航">
      <a href="#features" @click="open = false"><span>产品能力</span><i data-lucide="chevron-right" class="zx-mobile-menu__icon"></i></a>
      <a href="#workflow" @click="open = false"><span>工作方式</span><i data-lucide="chevron-right" class="zx-mobile-menu__icon"></i></a>
      <a href="#use-cases" @click="open = false"><span>使用场景</span><i data-lucide="chevron-right" class="zx-mobile-menu__icon"></i></a>
      <a href="#trust" @click="open = false"><span>安全可信</span><i data-lucide="chevron-right" class="zx-mobile-menu__icon"></i></a>
      <a href="#faq" @click="open = false"><span>常见问题</span><i data-lucide="chevron-right" class="zx-mobile-menu__icon"></i></a>
      <a href="#about" @click="open = false"><span>了解更多</span><i data-lucide="chevron-right" class="zx-mobile-menu__icon"></i></a>
      <a class="zx-mobile-menu__cta" href="#workspace" @click="open = false">体验产品<i data-lucide="arrow-right" class="zx-button__icon"></i></a>
    </nav>
  </div>
</header>`

const footer = `
<footer class="zx-footer">
  <div class="zx-shell">
    <div class="zx-footer__main">
      <div class="zx-footer__brand"><a class="zx-brand zx-brand--footer" href="#"><span class="zx-brand__mark"><i></i><i></i><b></b></span><span class="zx-brand__name">知序 AI</span></a><p>把散落的知识，变成随时可用的答案。为团队提供可信、可追溯的 AI 知识助手。</p><span class="zx-footer__status"><i></i> 服务状态正常</span></div>
      <nav class="zx-footer__nav" aria-label="页脚导航">
        <div class="zx-footer__column"><a class="zx-footer__column-title" href="#features">产品</a><a href="#features">核心能力</a><a href="#workflow">工作方式</a><a href="#trust">安全可信</a></div>
        <div class="zx-footer__column"><a class="zx-footer__column-title" href="#use-cases">场景</a><a href="#use-cases">客户支持</a><a href="#use-cases">员工入职</a><a href="#use-cases">项目协作</a></div>
        <div class="zx-footer__column"><a class="zx-footer__column-title" href="#faq">资源</a><a href="#faq">常见问题</a><a href="#">产品动态</a><a href="#about">关于知序</a></div>
      </nav>
    </div>
    <div class="zx-footer__bottom"><p>© 2026 知序 AI · 保留所有权利</p><div class="zx-footer__legal"><a href="#trust">隐私与安全</a><a href="#faq">使用帮助</a></div></div>
  </div>
  <button class="zx-back-top" type="button" data-zhixu-back-top aria-label="返回页面顶部" title="返回顶部"><i data-lucide="arrow-right" class="zx-back-top__icon"></i></button>
</footer>`

const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>知序 AI · 团队知识助手</title><link rel="icon" href="../assets/images/img/favicon.png"><link rel="stylesheet" href="../assets/stylesheets/application.css"><script defer src="../assets/javascripts/application.js"></script></head>
<body id="js-body" class="font-sans text-base font-normal text-base-content bg-base-100" data-aos-easing="ease-out-cubic" data-aos-duration="650" data-aos-delay="0">${header}<main id="content" class="zx-home">${renderedSnippets.join("\n")}</main>${footer}</body></html>`

const outputDirectory = join(projectRoot, "preview")
await mkdir(outputDirectory, { recursive: true })
await writeFile(join(outputDirectory, "index.html"), html)
console.log("Preview generated: preview/index.html")
