class DurationGenerator < Generator
  MINUTES = 90..180

  def call(rng)
    rng.int(MINUTES)
  end
end
