module Api
  class UiController < ApplicationController
    def show
      render json: UiStrings.for(LocaleDirectory.find(params[:locale]).code)
    end
  end
end
