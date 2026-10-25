class AssetLibrary
  ROOT = Rails.root.join("public")

  class << self
    def clips = list("clips", "*.mp4")
    def music = list("music", "*.mp3")
    def sfx   = list("sfx", "*.mp3")

    private

    def list(folder, pattern)
      (@cache ||= {})[folder] ||= Dir[ROOT.join(folder, pattern).to_s].sort.map { |f| "/#{folder}/#{File.basename(f)}" }
    end
  end
end
