module API
  class SeedsController < ApplicationController
    def random
      render json: { seed: Seed.random.to_s }
    end
  end
end
