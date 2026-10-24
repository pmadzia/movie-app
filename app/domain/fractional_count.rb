class FractionalCount
  def self.call(average, rng)
    (average + rng.float).floor
  end
end
