class PersonName
  def self.call
    "#{Faker::Name.first_name} #{Faker::Name.last_name}"
  end
end
