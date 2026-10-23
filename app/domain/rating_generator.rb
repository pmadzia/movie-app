class RatingGenerator < Generator
  def call(rng)
    rng.pick(profile.dig("ratings"))
  end
end
