class PageRequest
  attr_reader :seed, :profile, :page, :likes, :reviews

  def initialize(params)
    @seed    = Seed.parse(params[:seed])
    @profile = LocaleDirectory.find(params[:locale])
    @page    = PageNumber.parse(params[:page])
    @likes   = Average.parse(prarams[:likes])
    @reviews = Average.parse(params[:reviews])
  end
end
