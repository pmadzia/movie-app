class MoviePage
  def initialize(request)
    @request = request
  end

  def as_json(*)
    {
      page:   @request.page,
      seed:   @request.seed.to_s,
      locale: @request.profile.code,
      items:  Array.new(PageLayout::SIZE) { |position| item(position) }
    }
  end

  private

  def streams_for(position)
    RecordStreams.new(seed: @request.seed, page: @request.page, position: position)
  end

  def builder
    @builder ||= MovieBuilder.new(profile: @request.profile, seed: @request.seed, page: @request.page)
  end

  def likes
    @likes ||= LikesGenerator.new(@request.likes)
  end

  def reviews
    @reviews ||= ReviewsGenerator.new(@request.profile, @request.reviews)
  end

  def item(position)
    streams = streams_for(position)
    movie   = builder.build(position)
    movie.to_h.merge(
      likes:   likes.call(streams),
      reviews: reviews.call(streams).map(&:to_h),
      trailer: TrailerScript.new(movie, @request.profile, streams.for(:trailer)).call
    )
  end
end
