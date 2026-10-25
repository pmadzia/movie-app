module Api
  class MoviesController < ApplicationController
    def index
      render json: MoviePage.new(PageRequest.new(params)).as_json
    end
  end
end
