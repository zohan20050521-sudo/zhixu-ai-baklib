import { Controller } from "@hotwired/stimulus";
import Swiper from "swiper/bundle";

const DEFAULT_OPTIONS = {
  watchOverflow: true,
};

export default class extends Controller {
  static values = {
    options: { type: Object, default: {} },
  };

  connect() {
    const root = this.element.querySelector(".swiper");
    if (!root) return;

    const config = this.#resolveElements({
      ...DEFAULT_OPTIONS,
      ...this.optionsValue,
    });
    this.swiper = new Swiper(root, config);
  }

  disconnect() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
  }

  #resolveElements(config) {
    const options = { ...config };

    if (options.pagination !== false) {
      const el = this.element.querySelector(".swiper-pagination");
      if (el) {
        const extra =
          typeof options.pagination === "object" ? options.pagination : {};
        options.pagination = { el, clickable: true, ...extra };
      } else {
        delete options.pagination;
      }
    } else {
      delete options.pagination;
    }

    if (options.navigation === true || options.navigation) {
      const next = this.element.querySelector(".swiper-button-next");
      const prev = this.element.querySelector(".swiper-button-prev");
      if (next && prev) {
        options.navigation = { nextEl: next, prevEl: prev };
      } else {
        delete options.navigation;
      }
    }

    return options;
  }
}
