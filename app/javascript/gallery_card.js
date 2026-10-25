import { esc } from "./escape"
import { MovieDetails } from "./movie_details"

export class GalleryCard {
  constructor(movie, t) {
    this.movie = movie
    this.t = t
    this.d = new MovieDetails(movie, t)
  }

  html() {
    return `<div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
      <div class="card movie-card">
        <div class="card-body">${this.d.frame()}${this.summary()}${this.extra()}</div>
      </div>
    </div>`
  }

  summary() {
    const m = this.movie
    return `<h6 class="mt-3 mb-1"><span class="text-muted">${m.index}.</span> ${esc(m.title)}</h6>
      <div class="small text-muted">${m.year} &middot; ${esc(m.genre)}</div>
      <div class="small mb-2">${esc(m.actors.join(", "))}</div>
      <button type="button" class="btn btn-sm btn-outline-secondary" data-expand>
        ${esc(this.t("details"))} <span class="chevron">&#8964;</span>
      </button>`
  }

  extra() {
    const d = this.d
    return `<div class="extra mt-3">
      ${d.likes()}${d.badges()}<p class="mb-1">${d.director()}</p>
      ${d.description()}${d.reviews()}
    </div>`
  }
}