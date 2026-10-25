export class Translator {
  constructor(root) {
    this.root = root
    this.dict = {}
  }

  use(dict) {
    this.dict = dict
    this.apply()
  }

  t(key) {
    return this.dict[key] ?? key
  }

  apply() {
    this.each("[data-i18n]", (el) => (el.textContent = this.t(el.dataset.i18n)))
    this.each("[data-i18n-title]", (el) => this.setTitle(el))
  }

  setTitle(el) {
    const text = this.t(el.dataset.i18nTitle)
    el.title = text
    el.setAttribute("aria-label", text)
  }

  each(selector, fn) {
    this.root.querySelectorAll(selector).forEach(fn)
  }
}