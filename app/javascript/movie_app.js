import { ApiClient } from "./api_client"
import { TableView } from "./table_view"
import { Toolbar } from "./toolbar"
import { Translator } from "./translator"

export class MovieApp {
  constructor(root) {
    this.api = new ApiClient()
    this.token = 0
    this.translator = new Translator(root)
    this.table = new TableView(root.querySelector("#table-view"), (page) => this.goTo(page))
    this.toolbar = new Toolbar(root, this.api, (values) => this.reset(values))
    this.reset(this.toolbar.values())
  }

  reset(values) {
    this.params = { ...values, page: 1 }
    this.load()
  }

  goTo(page) {
    this.params = { ...this.params, page }
    this.load()
  }

  async load() {
    const token = ++this.token
    const [data, ui] = await Promise.all([this.api.movies(this.params), this.api.ui(this.params.locale)])
    token === this.token && this.show(data, ui)
  }

  show(data, ui) {
    this.translator.use(ui)
    this.table.render(data, (key) => this.translator.t(key))
  }
}