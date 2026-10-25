export class Pagination {
  constructor(nav, onPage) {
    this.nav = nav
    nav.addEventListener("click", (event) => {
      const target = event.target.closest("[data-page]")
      target && onPage(Number(target.dataset.page))
    })
  }

  render(current) {
    const pages = Array.from({ length: 5 }, (_, i) => current - 2 + i).filter((p) => p >= 1)
    this.nav.innerHTML = `<ul class="pagination justify-content-center">
      ${this.item(current - 1, "&laquo;", current === 1 ? "disabled" : "")}
      ${pages.map((p) => this.item(p, p, p === current ? "active" : "")).join("")}
      ${this.item(current + 1, "&raquo;", "")}
    </ul>`
  }

  item(page, label, state) {
    return `<li class="page-item ${state}">
      <a class="page-link" href="#" data-page="${page}" onclick="return false">${label}</a>
    </li>`
  }
}