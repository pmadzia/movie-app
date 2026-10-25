class TrailerScript
  DURATION    = 8
  SCENES      = 2..3
  CAPTIONS    = %w[fade slide zoom tracking].freeze
  TRANSITIONS = %w[fade wipe slide iris].freeze
  FILTERS = { hue: "hue-rotate(%ddeg)", gray: "grayscale(%.2f)" }.freeze
  LOOKS = [
    { hue: 0..0,      contrast: 1.1..1.3, saturate: 1.0..1.2, brightness: 0.85..1.0,  sepia: 0.0..0.1,  gray: 0.0..0.0 },  # natural
    { hue: 170..200,  contrast: 1.1..1.4, saturate: 1.1..1.5, brightness: 0.75..0.95, sepia: 0.0..0.1,  gray: 0.0..0.0 },  # cold blue
    { hue: -25..-10,  contrast: 1.1..1.3, saturate: 1.2..1.6, brightness: 0.85..1.05, sepia: 0.2..0.5,  gray: 0.0..0.0 },  # warm orange
    { hue: 80..130,   contrast: 1.2..1.5, saturate: 0.6..1.0, brightness: 0.7..0.9,   sepia: 0.0..0.2,  gray: 0.0..0.2 },  # toxic green
    { hue: 0..0,      contrast: 1.3..1.7, saturate: 0.0..0.0, brightness: 0.7..0.95,  sepia: 0.0..0.0,  gray: 1.0..1.0 },  # noir
    { hue: 300..340,  contrast: 1.1..1.4, saturate: 1.2..1.8, brightness: 0.75..0.95, sepia: 0.0..0.2,  gray: 0.0..0.0 },  # magenta
    { hue: -10..10,   contrast: 1.0..1.2, saturate: 0.3..0.6, brightness: 0.8..1.0,   sepia: 0.3..0.6,  gray: 0.0..0.2 }   # faded vintage
  ].freeze

  def initialize(movie, profile, rng)
    @movie   = movie
    @profile = profile
    @rng     = rng
  end

  def call
    scenes = build_scenes
    { duration: DURATION, title: @movie.title, scenes: scenes, captions: captions,
      music: music, hits: hits(scenes.size) }
  end

  private

  def build_scenes
    @rng.sample(AssetLibrary.clips, @rng.int(SCENES)).map { |clip| scene(clip) }
  end

  def scene(clip)
    { clip: clip, start: (@rng.float * 2).round(2), speed: (0.7 + @rng.float * 0.6).round(2),
      zoom: [1.0, (1.08 + @rng.float * 0.15).round(2)].rotate(@rng.int(0..1)),
      filter: grade, transition: @rng.pick(TRANSITIONS) }
  end

  def grade
    look = @look ||= @rng.pick(LOOKS)
    look.map { |name, range| css(name, @rng.float * (range.end - range.begin) + range.begin) }.join(" ")
  end

  def css(name, value)
    format(FILTERS.fetch(name, "#{name}(%.2f)"), value)
  end

  def captions
    texts.map { |text| { text: text, anim: @rng.pick(CAPTIONS) } }
  end

  def texts
    [ pick("taglines"), "#{pick('presented_by')} #{@movie.director}", @movie.title ]
  end

  def music
    { track: @rng.pick(AssetLibrary.music), start: @rng.int(0..10), volume: (0.5 + @rng.float * 0.3).round(2) }
  end

  def hits(scene_count)
    times = (1...scene_count).map { |i| i * DURATION.fdiv(scene_count) } + [DURATION - DURATION.fdiv(texts.size)]
    times.map { |at| { at: at.round(2), sfx: @rng.pick(AssetLibrary.sfx) } }
  end

  def pick(key)
    @rng.pick(@profile.dig("trailer", key))
  end
end
