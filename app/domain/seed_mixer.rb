require "digest"

class SeedMixer
  def self.call(*parts)
    Digest::SHA256.digest(parts.join(":")).unpack1("Q>")
  end
end
