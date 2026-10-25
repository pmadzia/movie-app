class UiStrings
  def self.for(locale_code)
    I18n.t("ui", locale: locale_code).with_indifferent_access
  end
end
