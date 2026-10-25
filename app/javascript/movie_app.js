import { ApiClient } from "./api_client"
import { TableView } from "./table_view"
import { Toolbar } from "./toolbar"

export class MovieApp {
  constructor(root) {
    this.api = new ApiClient()
    this.token = 0
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
    const data = await this.api.movies(this.params)
    token === this.token && this.table.render(data)
  }
}