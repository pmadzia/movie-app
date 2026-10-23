class LocaleProfile
  attr_reader :code, :label, :faker_locale

  def initialize(data)
    @data         = data
    @code         = data.fetch("code")
    @label        = data.fetch("label")
    @faker_locale = data.fetch("faker_locale")
  end

  def dig(*keys)
    @data.dig(*keys)
  end

  def to_option
    { code: code, label: label }
  end
end
