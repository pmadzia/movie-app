import { MovieRow } from "./movie_row"
import { Pagination } from "./pagination"
import { mountTrailers } from "./trailer_mount"
import { TrailerPlayer } from "./trailer_player"

export class TableView {
  constructor(root, onPage) {
    this.root = root
    this.table = root.querySelector("table")
    this.pagination = new Pagination(root.querySelector("#pagination"), onPage)
    this.table.addEventListener("click", (event) => this.toggle(event))
  }

  setVisible(on) {
    this.root.hidden = !on
  }

  reset() {
    TrailerPlayer.stopAll()
  }

  render(data, t) {
    TrailerPlayer.stopAll()
    this.table.querySelectorAll("tbody").forEach((body) => body.remove())
    this.table.insertAdjacentHTML("beforeend", data.items.map((m) => new MovieRow(m, t).html()).join(""))
    mountTrailers(this.table, data.items)
    this.pagination.render(data.page)
  }

  toggle(event) {
    const summary = event.target.closest(".summary")
    summary && summary.closest(".movie").classList.toggle("expanded")
  }
}