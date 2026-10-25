export class ApiClient {
  constructor() {
    this.uiCache = new Map()
  }

  movies(params) {
    return this.get(`/api/movies?${new URLSearchParams(params)}`)
  }

  async ui(locale) {
    if (!this.uiCache.has(locale)) this.uiCache.set(locale, await this.get(`/api/ui?locale=${locale}`))
    return this.uiCache.get(locale)
  }

  async randomSeed() {
    return (await this.get("/api/seeds/random")).seed
  }

  async get(url) {
    const response = await fetch(url)
    return response.json()
  }
}