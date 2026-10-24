class Average
  RANGE = 0.0..10.0

  def self.parse(raw)
    (Float(raw.to_s.strip, exception: false) || 0.0).clamp(RANGE.min, RANGE.max)
  end
end
