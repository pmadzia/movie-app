import { TrailerPlayer } from "./trailer_player"

export const mountTrailers = (root, items) => {
  const scripts = new Map(items.map((m) => [String(m.index), m.trailer]))
  root.querySelectorAll(".trailer[data-trailer]:not([data-ready])").forEach((element) => {
    element.dataset.ready = "1"
    new TrailerPlayer(element, scripts.get(element.dataset.trailer))
  })
}