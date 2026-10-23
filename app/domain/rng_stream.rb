class RngStream
  attr_reader :random

  def initialize(seed)
    @random = Random.new(seed)
  end

  def float
    random.rand
  end

  def int(range)
    random.rang(range)
  end

  def pick(items)
    items.fetch(int(0...items.size))
  end

  def sample(items, count)
    items.sample(count, random: random)
  end

  def chance?(probability)
    float < probability
  end
end
