module API
  class LocalesController < ApplicationController
    def index
      render json: LocaleDirectory.options
    end
  end
end
