import { esc } from "./escape"

export class MovieDetails {
  constructor(movie, t) {
    this.movie = movie
    this.t = t
  }

  frame() {
    return `<div class="trailer" data-trailer="${this.movie.index}">
      <div class="trailer-stage"></div>
      <div class="trailer-caption"><span></span></div>
      <button type="button" class="trailer-play" aria-label="Play">&#9654;</button>
    </div>`
  }

  likes() {
    return `<span class="badge text-bg-primary mt-2">&#128077; ${this.movie.likes}</span>`
  }

  heading() {
    const m = this.movie
    return `<h5>${esc(m.title)} <small class="text-muted">${m.year}, ${esc(m.genre)}</small></h5>`
  }

  badges() {
    const m = this.movie
    return `<p class="mb-1"><span class="badge text-bg-secondary">${m.duration} ${esc(this.t("minutes"))}</span>
      <span class="badge text-bg-dark">${esc(m.rating)}</span></p>`
  }

  cast() {
    return `<em>${esc(this.t("cast"))}: ${esc(this.movie.actors.join(", "))}</em>`
  }

  director() {
    return `<em>${esc(this.t("director"))}: ${esc(this.movie.director)}</em>`
  }

  description() {
    return `<p class="description">${esc(this.movie.description)}</p>`
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