class YearGenerator < Generator
  YEARS = 1980...2026

  def call(rng)
    rng.int(YEARS)
  end
end
