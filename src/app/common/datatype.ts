export interface StreamSong {
  id: number;
  name: string;
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
  date: Date;
  youtube_url: string;
  duration: string;
  song_id: number;
}

export interface Song {
  name: string;
  artist: string;
  url: string;
  duration: number;
  year: number;
  lyrics: string;
}

export interface RenderSong {
  id: number;
  name: string;
  tags: string;
  artist: string;
  date: Date;
  youtube_url: string;
  duration: number;
  start_time: number;
}

