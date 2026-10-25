import { esc } from "./escape"

export class MovieRow {
  constructor(movie, t) {
    this.movie = movie
    this.t = t
  }

  html() {
    return `<tbody class="movie">${this.summary()}${this.details()}</tbody>`
  }

  summary() {
    const m = this.movie
    return `<tr class="summary">
      <td class="text-nowrap"><span class="chevron">&#8964;</span> <strong>${m.index}</strong></td>
      <td>${esc(m.genre)}</td>
      <td>${esc(m.title)}</td>
      <td>${esc(m.actors.join(", "))}</td>
      <td class="text-end">${m.year}</td>
    </tr>`
  }

  details() {
    return `<tr class="details"><td colspan="5">
      <div class="row g-3 py-2">
        <div class="col-md-4">${this.trailer()}</div>
        <div class="col-md-8">${this.info()}${this.reviews()}</div>
      </div>
    </td></tr>`
  }

  trailer() {
    return `<div class="trailer-frame">${esc(this.movie.title)}</div>
      <span class="badge text-bg-primary mt-2">&#128077; ${this.movie.likes}</span>`
  }

  info() {
    const m = this.movie
    return `<h5>${esc(m.title)} <small class="text-muted">${m.year}, ${esc(m.genre)}</small></h5>
      <p class="mb-1"><span class="badge text-bg-secondary">${m.duration} ${esc(this.t("minutes"))}</span>
         <span class="badge text-bg-dark">${esc(m.rating)}</span></p>
      <p class="mb-1"><em>${esc(this.t("cast"))}: ${esc(m.actors.join(", "))}</em><br>
         <em>${esc(this.t("director"))}: ${esc(m.director)}</em></p>
      <p class="description">${esc(m.description)}</p>`
  }

  reviews() {
    return this.movie.reviews.map((r) => this.review(r)).join("")
  }

  review(review) {
    return `<blockquote class="mb-2">${esc(review.text)}
      <footer class="small text-muted">&mdash; ${esc(review.author)}, <em>${esc(review.company)}</em></footer>
    </blockquote>`
  }
}