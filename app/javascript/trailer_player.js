import { gsap } from "gsap"
import { Howl } from "howler"
import { CAPTIONS, TRANSITIONS } from "./trailer_effects"

const TITLE_TIME = 3
const START_DELAY = 800
const wait = (ms) => new Promise((done) => setTimeout(done, ms))

const ready = (video, start) =>
  new Promise((done) => {
    const seek = () => {
      video.addEventListener("seeked", done, { once: true })
      video.currentTime = start
    }
    video.readyState >= 1 ? seek() : video.addEventListener("loadedmetadata", seek, { once: true })
  })

export class TrailerPlayer {
  static active = null

  static stopAll() {
    TrailerPlayer.active && TrailerPlayer.active.stop()
  }

  constructor(root, script) {
    this.root = root
    this.script = script
    this.stage = root.querySelector(".trailer-stage")
    this.caption = root.querySelector(".trailer-caption")
    this.sounds = []
    root.addEventListener("click", (event) => {
      event.stopPropagation()
      this.toggle()
    })
    this.poster()
    this.resizer = new ResizeObserver(() => this.playing || this.fit(this.caption.firstElementChild))
    this.resizer.observe(this.stage)
  }

  toggle() {
    this.playing ? this.stop() : this.play()
  }

  video(scene, preload) {
    const video = Object.assign(document.createElement("video"), {
      src: scene.clip, muted: true, playsInline: true, preload
    })
    video.style.filter = scene.filter
    video.defaultPlaybackRate = video.playbackRate = scene.speed
    return video
  }

  poster() {
    const video = this.video(this.script.scenes[0], "metadata")
    video.addEventListener("loadedmetadata", () => (video.currentTime = this.script.scenes[0].start), { once: true })
    this.stage.querySelectorAll("video").forEach((v) => v.pause())
    this.stage.replaceChildren(video)
    gsap.set(this.caption, { clearProps: "transform,letterSpacing", opacity: 1 })
    this.showCaption(this.script.title, true)
  }

  showCaption(text, big) {
    const span = this.caption.firstElementChild
    span.textContent = text
    this.caption.classList.toggle("title", big)
    this.fit(span)
  }

  fit(span) {
    const max = this.stage.clientWidth * 0.8
    span.style.fontSize = ""
    const width = span.getBoundingClientRect().width / this.scaleNow()
    const size = parseFloat(getComputedStyle(span).fontSize)
    max > 0 && width > max && (span.style.fontSize = `${(size * max) / width}px`)
  }

  scaleNow() {
    return gsap.getProperty(this.caption, "scale") || 1
  }

  async play() {
    TrailerPlayer.stopAll()
    TrailerPlayer.active = this
    this.playing = true
    this.root.classList.add("playing")
    const videos = this.script.scenes.map((scene) => this.video(scene, "auto"))
    this.stage.replaceChildren(...videos)
    gsap.set(videos, { autoAlpha: 0, zIndex: 0 })
    gsap.set(videos[0], { autoAlpha: 1 })
    gsap.set(this.caption, { opacity: 0 })
    await Promise.all([...videos.map((video, i) => ready(video, this.script.scenes[i].start)), wait(START_DELAY)])
    this.playing && this.run(videos)
  }

  run(videos) {
    this.root.classList.add("started")
    this.timeline = this.build(videos)
    this.startAudio()
    videos[0].play()
    this.timeline.play(0)
  }

  build(videos) {
    const { duration, scenes, captions } = this.script
    const timeline = gsap.timeline({ paused: true, onComplete: () => this.stop() })
    scenes.forEach((scene, i) => this.addScene(timeline, scene, videos[i], i * (duration / scenes.length), duration / scenes.length, i))
    const slot = (duration - TITLE_TIME) / (captions.length - 1)
    captions.forEach((c, i) => this.addCaption(timeline, c, i * slot, i === captions.length - 1 ? TITLE_TIME : slot, i === captions.length - 1))
    return timeline
  }

  addScene(timeline, scene, video, at, length, index) {
    const [from, to] = TRANSITIONS[scene.transition]
    const first = index === 0
    timeline.set(video, { autoAlpha: first ? 1 : 0, zIndex: index }, 0)
    first || timeline.set(video, { autoAlpha: 1 }, at)
    first || timeline.fromTo(video, from, { ...to, duration: 0.5, immediateRender: false }, at)
    timeline.fromTo(video, { scale: scene.zoom[0] }, { scale: scene.zoom[1], duration: length, ease: "none", immediateRender: false }, at)
    timeline.call(() => video.play(), null, at)
  }

  addCaption(timeline, caption, at, slot, last) {
    const [from, to] = CAPTIONS[caption.anim]
    timeline.call(() => this.showCaption(caption.text, last), null, at)
    timeline.fromTo(this.caption, from, { ...to, duration: 0.5, immediateRender: false }, at)
    last || timeline.to(this.caption, { opacity: 0, duration: 0.25 }, at + slot - 0.25)
  }

  startAudio() {
    const { music, hits, duration } = this.script
    const track = this.sound(music.track, music.volume)
    track.play()
    track.seek(music.start)
    hits.forEach((hit) => this.timeline.call(() => this.sound(hit.sfx, 0.9).play(), null, hit.at))
    this.timeline.call(() => track.fade(music.volume, 0, 700), null, duration - 0.7)
  }

  sound(src, volume) {
    const howl = new Howl({ src: [src], volume })
    this.sounds.push(howl)
    return howl
  }

  stop() {
    if (!this.playing) return
    this.playing = false
    this.timeline && this.timeline.kill()
    this.sounds.forEach((howl) => howl.unload())
    this.sounds = []
    this.root.classList.remove("playing")
    TrailerPlayer.active = null
    this.poster()
  }
}