class FakerScope
  def self.run(locale:, random:)
    previous = [ Faker::Config.locale, Faker::Config.random ]
    Faker::Config.locale = locale
    Faker::Config.random = random
    yield
  ensure
    Faker::Config.locale, Faker::Config.random = previous
  end
end
