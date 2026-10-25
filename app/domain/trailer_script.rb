class TrailerScript
  DURATION    = 8
  SCENES      = 2..3
  CAPTIONS    = %w[fade slide zoom tracking].freeze
  TRANSITIONS = %w[fade wipe slide iris].freeze

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
    "hue-rotate(#{@rng.int(-30..30)}deg) contrast(#{(1 + @rng.float * 0.3).round(2)}) " \
      "saturate(#{(0.7 + @rng.float * 0.6).round(2)}) brightness(#{(0.75 + @rng.float * 0.2).round(2)}) " \
      "sepia(#{(@rng.float * 0.4).round(2)})"
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
