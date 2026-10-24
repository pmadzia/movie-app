class ReviewsGenerator
  def initialize(profile, average)
    @average = average
    @review  = ReviewGenerator.new(profile)
  end

  def call(streams)
    Array.new(count(streams)) { |i| @review.call(streams.for("review:#{i}")) }
  end

  private

  def count(streams)
    FractionalCount.call(@average, streams.for(:review_count))
  end
end
