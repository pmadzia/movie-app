class GenreGenerator < Generator
  def call(rng)
    rng.pick(profile.dig("genres"))
  end
end
