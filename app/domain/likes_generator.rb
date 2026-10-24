class LikesGenerator
  def initialize(average)
    @average = average
  end

  def call(streams)
    FractionalCount.call(@average, streams.for(:likes))
  end
end
