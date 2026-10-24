class ReviewGenerator < Generator
  def call(rng)
    text = rng.pick(profile.dig("reviews", "templates"))
    FakerScope.run(locale: profile.faker_locale, random: rng.random) do
      Review.new(text: text, author: PersonName.call, company: Faker::Company.name)
    end
  end
end
