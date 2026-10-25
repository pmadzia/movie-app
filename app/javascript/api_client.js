export class ApiClient {
  movies(params) {
    return this.get(`/api/movies?${new URLSearchParams(params)}`)
  }

  async randomSeed() {
    return (await this.get("/api/seeds/random")).seed
  }

  async get(url) {
    const response = await fetch(url)
    return response.json()
  }
}