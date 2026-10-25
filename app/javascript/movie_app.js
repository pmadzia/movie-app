import { ApiClient } from "./api_client"
import { GalleryView } from "./gallery_view"
import { TableView } from "./table_view"
import { Toolbar } from "./toolbar"
import { Translator } from "./translator"

export class MovieApp {
  constructor(root) {
    this.api = new ApiClient()
    this.token = 0
    this.mode = "table"
    this.translator = new Translator(root)
    this.views = {
      table: new TableView(root.querySelector("#table-view"), (page) => this.goTo(page)),
      gallery: new GalleryView(root.querySelector("#gallery-view"), () => this.more())
    }
    this.toolbar = new Toolbar(root, this.api, (values) => this.reset(values), (mode) => this.switchTo(mode))
    this.reset(this.toolbar.values())
  }

  get view() {
    return this.views[this.mode]
  }

  switchTo(mode) {
    this.mode = mode
    Object.entries(this.views).forEach(([name, view]) => view.setVisible(name === mode))
    this.reset(this.toolbar.values())
  }

  reset(values) {
    this.params = { ...values, page: 1 }
    this.view.reset()
    this.load()
  }

  goTo(page) {
    this.params = { ...this.params, page }
    this.load()
  }

  more() {
    this.goTo(this.params.page + 1)
  }

  async load() {
    const token = ++this.token
    const [data, ui] = await Promise.all([this.api.movies(this.params), this.api.ui(this.params.locale)])
    token === this.token && this.show(data, ui)
  }

  show(data, ui) {
    this.translator.use(ui)
    this.view.render(data, (key) => this.translator.t(key))
  }
}