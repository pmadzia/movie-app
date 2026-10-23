class LocaleDirectory
  DIRECTORY = Rails.root.join("config/movie_locales")

  class << self
    def all
      @all ||= load_profiles
    end

    def find(code)
      all.fetch(code) { all.values.first }
    end

    def options
      all.values.map(&:to_option)
    end

    private

    def build(file)
      LocaleProfile.new(YAML.safe_load_file(file))
    end

    def load_profiles
      Dir[DIRECTORY.join("*.yml")].sort.map { |file| build(file) }.index_by(&:code)
    end
  end
end
