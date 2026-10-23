class TitleGenerator < Generator
  def call(rng)
    parts = words_for(rng, rng.pick(nouns.keys))
    format(rng.pick(profile.dig("title", "patterns")), parts)
  end

  def words_for(rng, gender)
    {
      adjective:  rng.pick(words("adjectives", gender)),
      noun:       rng.pick(words("nouns", gender)),
      other_noun: rng.pick(nouns.values.flatten),
      suffix:     rng.pick(profile.dig("title", "suffixes"))
    }
  end

  def words(kind, gender)
    profile.dig("title", kind, gender)
  end

  def nouns
    profile.dig("title", "nouns")
  end
end
