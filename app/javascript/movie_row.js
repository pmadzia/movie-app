import { esc } from "./escape"
import { MovieDetails } from "./movie_details"

export class MovieRow {
  constructor(movie, t) {
    this.movie = movie
    this.d = new MovieDetails(movie, t)
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
    const d = this.d
    return `<tr class="details"><td colspan="5">
      <div class="row g-3 py-2">
        <div class="col-md-4">${d.frame()}${d.likes()}</div>
        <div class="col-md-8">
          ${d.heading()}${d.badges()}
          <p class="mb-1">${d.cast()}<br>${d.director()}</p>
          ${d.description()}${d.reviews()}
        </div>
      </div>
    </td></tr>`
  }
}