export const YTLINK : string[] = [
  'https://youtu.be/YjOFrKd7dCs',
  'https://youtu.be/yxS7dmbNhHw',
  'https://youtu.be/WubrN77fv3g',
  'https://youtu.be/Df_vEhJeDNs',
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
  date: Date;
  ytlink: string;
  start_time: number;
  end_time: number;
  duration: number;
  reserved: string;
}

