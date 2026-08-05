const DEMO_SCENARIOS = {
  support: {
    topic: "客户支持助手",
    question: "企业版可以设置多少个独立知识空间？",
    answer: "企业版支持创建不限数量的独立知识空间，并可按部门、项目或客户设置成员权限。跨空间检索仅返回当前成员有权访问的内容。",
    sourceA: "企业版功能说明",
    sourceB: "空间权限指南",
  },
  onboarding: {
    topic: "新人入职向导",
    question: "产品经理入职第一周需要完成哪些事项？",
    answer: "第一周建议依次完成账号权限配置、产品体验任务、团队协作规范阅读和首次需求评审旁听。你的导师是周宁，周五前需要提交一份体验记录。",
    sourceA: "产品岗入职清单",
    sourceB: "新人导师制度",
  },
  project: {
    topic: "项目复盘助手",
    question: "Orion 项目为什么调整了首版交付范围？",
    answer: "团队在 6 月 18 日方案评审中决定优先交付权限与检索模块，数据看板延后到第二阶段，主要原因是客户希望先完成内部安全验收。",
    sourceA: "方案评审纪要",
    sourceB: "项目决策记录",
  },
}

function setText(root, selector, value) {
  const element = root.querySelector(selector)
  if (element) element.textContent = value
}

function initDemo(demo) {
  if (demo.dataset.zhixuReady === "true") return

  const buttons = [...demo.querySelectorAll("[data-zhixu-mode]")]
  const conversation = demo.querySelector(".zx-workspace__conversation")

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const scenario = DEMO_SCENARIOS[button.dataset.zhixuMode]
      if (!scenario) return

      buttons.forEach((item) => {
        const isActive = item === button
        item.classList.toggle("is-active", isActive)
        item.setAttribute("aria-selected", String(isActive))
      })

      conversation?.classList.add("is-updating")
      setText(demo, "[data-zhixu-topic]", scenario.topic)
      setText(demo, "[data-zhixu-question]", scenario.question)
      setText(demo, "[data-zhixu-answer]", scenario.answer)
      setText(demo, "[data-zhixu-source-a]", scenario.sourceA)
      setText(demo, "[data-zhixu-source-b]", scenario.sourceB)
      window.setTimeout(() => conversation?.classList.remove("is-updating"), 180)
    })
  })

  demo.dataset.zhixuReady = "true"
}

function initFaq(list) {
  if (list.dataset.zhixuReady === "true") return

  const details = [...list.querySelectorAll("details")]
  details.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return
      details.forEach((other) => {
        if (other !== item) other.open = false
      })
    })
  })

  list.dataset.zhixuReady = "true"
}

function updateScrollUi() {
  const hasScrolled = window.scrollY > 24
  document.querySelector("[data-zhixu-header]")?.classList.toggle("is-scrolled", hasScrolled)
  document.querySelector("[data-zhixu-back-top]")?.classList.toggle("is-visible", window.scrollY > 520)
}

function initZhixuUi() {
  document.querySelectorAll("[data-zhixu-demo]").forEach(initDemo)
  document.querySelectorAll(".zx-faq__list").forEach(initFaq)

  document.querySelectorAll("[data-zhixu-back-top]").forEach((button) => {
    if (button.dataset.zhixuReady === "true") return
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }))
    button.dataset.zhixuReady = "true"
  })

  if (!window.__zhixuScrollBound) {
    window.addEventListener("scroll", updateScrollUi, { passive: true })
    window.__zhixuScrollBound = true
  }
  updateScrollUi()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initZhixuUi)
} else {
  initZhixuUi()
}

document.addEventListener("turbo:load", initZhixuUi)
document.addEventListener("turbo:render", initZhixuUi)
