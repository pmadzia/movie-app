class Seed
  MODULUS = 1 << 63
  RANDOM_RANGE = (1 << 48)...(1 << 63)

  attr_reader :value

  def self.parse(raw)
    new(Integer(raw.to_s.strip, 10, exception: false) || 0)
  end

  def self.random
    new(SecureRandom.random_number(RANDOM_RANGE))
  end

  def initialize(value)
    @value = value % MODULUS
  end

  def to_s
    value.to_s
  end
end
