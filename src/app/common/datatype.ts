export interface StreamSong {
  id: number;
  name: string;
  artist: string;
  lang: string;
  date: Date;
  youtube_url: string;
  start_time: string;
  end_time: string;
  song_id: number;
  status: string;
  tags: string;
}

export interface CoverSong {
  id: number,
  name: string;
  artist: string;
  lang: string;
  date: Date;
  youtube_url: string;
  duration: string;
  song_id: number;
  tags: string;
}

export interface RenderSong {
  id: number;
  name: string;
  tags: string;
  artist: string;
  lang: string;
  date: Date;
  youtube_url: string;
  duration: number;
  start_time: number;
  song_id: number;
}

export interface LyricsURL {
  lyrics: string;
  url: string;
}

export interface Statistics {
  total_count: number;

  // total = stream (public + member + unlisted + other) + cover
  stream_count: number;
  public_count: number;
  member_count: number;
  unlisted_count: number;
  other_count: number;
  cover_count: number;

  nonrepeat: {
    all: number;
    jp: number;
    zh: number;
    en: number;
  };

  singing_time: string;
  max_songs_per_stream: number;
  songs_member_only: number;
  latest_song: string;

  top_songs_public: string[];
  top_songs_all: string[];
  top_artists: string[];
}

