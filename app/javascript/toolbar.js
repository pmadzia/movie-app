import { debounce } from "./debounce"

export class Toolbar {
  constructor(root, api, onChange) {
    this.api = api
    this.fields = this.findFields(root)
    this.likesOutput = root.querySelector("#likes-output")
    this.notify = debounce(() => onChange(this.values()))
    this.bind(root.querySelector("#random-seed"), onChange)
  }

  values() {
    return Object.fromEntries(
      Object.entries(this.fields).map(([name, element]) => [name, element.value])
    )
  }

  findFields(root) {
    const ids = ["locale", "seed", "likes", "reviews"]
    return Object.fromEntries(ids.map((id) => [id, root.querySelector(`#${id}`)]))
  }

  bind(randomButton, onChange) {
    Object.values(this.fields).forEach((el) => el.addEventListener("input", () => this.changed()))
    randomButton.addEventListener("click", () => this.randomize(onChange))
  }

  changed() {
    this.likesOutput.textContent = this.fields.likes.value
    this.notify()
  }

  async randomize(onChange) {
    this.fields.seed.value = await this.api.randomSeed()
    onChange(this.values())
  }
}