module PageLayout
  SIZE = 10

  def self.index(page, position)
    (page - 1) * SIZE + position + 1
  end
end
