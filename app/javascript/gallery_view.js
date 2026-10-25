import { GalleryCard } from "./gallery_card"
import { mountTrailers } from "./trailer_mount"
import { TrailerPlayer } from "./trailer_player"

export class GalleryView {
  constructor(root, onMore) {
    this.root = root
    this.grid = root.querySelector("#gallery-grid")
    this.sentinel = root.querySelector("#gallery-sentinel")
    this.onMore = onMore
    this.busy = true
    this.observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && this.request(),
      { rootMargin: "400px" }
    )
    this.grid.addEventListener("click", (event) => this.expand(event))
    this.watch()
  }

  setVisible(on) {
    this.root.hidden = !on
    on || TrailerPlayer.stopAll()
  }

  reset() {
    TrailerPlayer.stopAll()
    this.grid.innerHTML = ""
    this.busy = true
    window.scrollTo(0, 0)
  }

  render(data, t) {
    this.grid.insertAdjacentHTML("beforeend", data.items.map((m) => new GalleryCard(m, t).html()).join(""))
    mountTrailers(this.grid, data.items)
    this.busy = false
    this.watch()
  }

  request() {
    this.busy || this.start()
  }

  start() {
    this.busy = true
    this.onMore()
  }

  watch() {
    this.observer.unobserve(this.sentinel)
    this.observer.observe(this.sentinel)
  }

  expand(event) {
    const card = event.target.closest(".movie-card")
    card && card.classList.toggle("expanded")
  }
}