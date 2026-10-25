class MoviesController < ApplicationController
  def index
    @locales = LocaleDirectory.options
    @seed    = Seed.random
  end
end
