export const TRANSITIONS = {
  fade:  [{ opacity: 0 }, { opacity: 1 }],
  wipe:  [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
  slide: [{ xPercent: 100 }, { xPercent: 0 }],
  iris:  [{ clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(80% at 50% 50%)" }]
}

export const CAPTIONS = {
  fade:     [{ opacity: 0 }, { opacity: 1 }],
  slide:    [{ opacity: 0, y: 40 }, { opacity: 1, y: 0 }],
  zoom:     [{ opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1 }],
  tracking: [{ opacity: 0, letterSpacing: "0.25em" }, { opacity: 1, letterSpacing: "0.08em" }]
}