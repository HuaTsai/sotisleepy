export const YTLINK : string[] = [
  'YjOFrKd7dCs',
  'yxS7dmbNhHw',
  'WubrN77fv3g',
  'Df_vEhJeDNs',
];

export const SONGS: string[] = [
  'ダーリン',
  '愛を伝えたいだとか',
  '花鳥風月',
  'ぼうやの夢よ',
  '花瓶の花',
];

export interface Song {
  id: number;
  name: string;
  artist: string;
  date: Date;
  ytlink: string;
  start_time: number;
  end_time: number;
  duration: number;
  reserved: string;
}

