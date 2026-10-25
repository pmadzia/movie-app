class MoviesController < ApplicationController
  def index
    @locales = LocaleDirectory.options
    @seed    = Seed.random
    @ui      = UiStrings.for(LocaleDirectory.find(nil).code)
  end
end
