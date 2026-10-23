class DescriptionGenerator < Generator
  SLOTS    = %w[hero action event place].freeze
  SECTIONS = %w[openings twists endings].freeze

  def call(rng)
    slots = slots_for(rng)
    SECTIONS.map { |section| sentence(rng, section, slots) }.join(" ")
  end

  private

  def slots_for(rng)
    SLOTS.to_h { |slot| [ slot.to_sym, rng.pick(data("slots", slot)) ] }
  end

  def sentence(rng, section, slots)
    format(rng.pick(data(section)), slots).upcase_first
  end

  def data(*keys)
    profile.dig("description", *keys)
  end
end
