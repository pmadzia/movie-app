class PageNumber
  def self.parse(raw)
    [ Integer(raw.to_s.strip, 10, exception: false) || 1, 1 ].max
  end
end
