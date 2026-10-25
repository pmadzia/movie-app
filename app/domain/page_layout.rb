module PageLayout
  SIZE = 20

  def self.index(page, position)
    (page - 1) * SIZE + position + 1
  end
end
