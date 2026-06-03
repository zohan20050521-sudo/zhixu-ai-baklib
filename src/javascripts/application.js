import * as Turbo from "@hotwired/turbo"
import Alpine from "alpinejs"
import collapse from "@alpinejs/collapse"
import AOS from "aos"
import { Application } from "@hotwired/stimulus"
import Dropdown from "stimulus-dropdown"

import MenuController from "../controllers/menu_controller"
import ViewImagesController from "../controllers/view_images_controller"
import NavtreeController from "../controllers/navtree_controller"
import ThemeController from "../controllers/theme_controller"
import SwiperController from "../controllers/swiper_controller"
import CopyPageController from "../controllers/copy_page_controller"
import PageToolsController from "../controllers/page_tools_controller"

import "./lucide_init"

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.start()

const application = Application.start()
window.Stimulus = application

application.register("menu", MenuController)
application.register("view_images", ViewImagesController)
application.register("navtree", NavtreeController)
application.register("theme", ThemeController)
application.register("swiper", SwiperController)
application.register("copy-page", CopyPageController)
application.register("page-tools", PageToolsController)
application.register("dropdown", Dropdown)

Turbo.start()

document.addEventListener("turbo:before-cache", () => {
  Alpine.destroyTree(document.body)
})

const AOS_options = { duration: 1200, disableMutationObserver: true }

document.addEventListener("DOMContentLoaded", () => {
  AOS.init(AOS_options)
  const body = document.querySelector("body")
  if (body) {
    AOS_options.easing = body.getAttribute("data-aos-easing")
    AOS_options.duration = body.getAttribute("data-aos-duration")
    AOS_options.delay = body.getAttribute("data-aos-delay")
  }
})

document.addEventListener("turbo:load", () => {
  Alpine.initTree(document.body)

  const body = document.querySelector("body")
  if (body) {
    body.setAttribute("data-aos-easing", AOS_options.easing)
    body.setAttribute("data-aos-duration", AOS_options.duration)
    body.setAttribute("data-aos-delay", AOS_options.delay)
  }
  AOS.refreshHard()
})

document.addEventListener("turbo:render", () => {
  Alpine.initTree(document.body)
})
