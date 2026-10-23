class RecordStreams
  def initialize(seed:, page:, position:)
    @seed     = seed
    @page     = page
    @position = position
  end

  def for(channel)
    RngStream.new(SeedMixer.call(@seed.value, @page, @position, channel))
  end
end
