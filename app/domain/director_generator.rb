class DirectorGenerator < Generator
  def call(rng)
    FakerScope.run(locale: profile.faker_locale, random: rng.random) { Faker::Name.name }
  end
end
