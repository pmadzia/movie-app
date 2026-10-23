class ActorGenerator < Generator
  COUNT = 1...4

  def call(rng)
    count = rng.int(COUNT)
    FakerScope.run(locale: profile.faker_locale, random: rng.random) do
      Array.new(count) { Faker::Name.name }.uniq
    end
  end
end
