module Api
  class LocalesController < ApplicationController
    def index
      render json: LocaleDirectory.options
    end
  end
end
