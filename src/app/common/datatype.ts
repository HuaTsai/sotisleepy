export interface StreamSong {
  id: number;
  name: string;
  date: Date;
  youtube_url: string;
  start_time: string;
  end_time: string;
  duration: number;
}

export interface CoverSong {
  id: number,
  name: string;
  date: Date;
  youtube_url: string;
  duration: string;
  song: number;
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
  date: Date;
  youtube_url: string;
  duration: number;
  start_time: number;
}

