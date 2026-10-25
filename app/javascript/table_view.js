import { MovieRow } from "./movie_row"
import { Pagination } from "./pagination"

export class TableView {
  constructor(root, onPage) {
    this.table = root.querySelector("table")
    this.pagination = new Pagination(root.querySelector("#pagination"), onPage)
    this.table.addEventListener("click", (event) => this.toggle(event))
  }

  render(data) {
    this.table.querySelectorAll("tbody").forEach((body) => body.remove())
    this.table.insertAdjacentHTML("beforeend", data.items.map((m) => new MovieRow(m).html()).join(""))
    this.pagination.render(data.page)
  }

  toggle(event) {
    const summary = event.target.closest(".summary")
    summary && summary.closest(".movie").classList.toggle("expanded")
  }
}