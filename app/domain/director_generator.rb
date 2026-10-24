class DirectorGenerator < Generator
  def call(rng)
    FakerScope.run(locale: profile.faker_locale, random: rng.random) { PersonName.call }
  end
end
