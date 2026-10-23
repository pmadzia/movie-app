class MovieBuilder
  GENERATORS = {
    title:       TitleGenerator,
    actors:      ActorGenerator,
    year:        YearGenerator,
    genre:       GenreGenerator,
    director:    DirectorGenerator,
    duration:    DurationGenerator,
    rating:      RatingGenerator,
    description: DescriptionGenerator
  }.freeze

  def initialize(profile:, seed:, page:)
    @profile = profile
    @seed    = seed
    @page    = page
  end

  def build(position)
    rng = streams(position).for(:core)
    Movie.new(index: PageLayout.index(@page, position), **attributes(rng))
  end

  private

  def streams(position)
    RecordStreams.new(seed: @seed, page: @page, position: position)
  end

  def generators
    @generators ||= GENERATORS.transform_values { |cls| cls.new(@profile) }
  end

  def attributes(rng)
    generators.transform_values { |generator| generator.call(rng) }
  end
end
