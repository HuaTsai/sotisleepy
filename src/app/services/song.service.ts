import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamSong, CoverSong } from '../common/datatype'

@Injectable({
  providedIn: 'root'
})
export class SongService {
  // TODO: use http stream & share replay
  streamSongList: StreamSong[] = [];
  coverList: CoverSong[] = [
    {
      name: 'Rightfully',
      date: new Date('2022-06-17'),
      youtube_url: 'SGyLnr1NhdA',
      duration: 220
    },
    {
      name: '勿忘',
      date: new Date('2022-06-26'),
      youtube_url: 'pIBQc4ofohg',
      duration: 250
    },
    {
      name: 'ひとりごつ',
      date: new Date('2022-09-20'),
      youtube_url: 'soqJix0R7DY',
      duration: 94
    },
    {
      name: '花めづる君',
      date: new Date('2022-09-30'),
      youtube_url: 'HUPn0JZjntw',
      duration: 319
    },
    {
      name: 'ディスコミュ星人',
      date: new Date('2022-10-16'),
      youtube_url: 'XKSY00PtKxw',
      duration: 214
    },
    {
      name: '今夜的江灘公園沒有煙花跨年',
      date: new Date('2023-01-01'),
      youtube_url: '1Xk8mydarkQ',
      duration: 308
    },
    {
      name: '奈落の花',
      date: new Date('2023-01-05'),
      youtube_url: 'n1-Og6CrcAA',
      duration: 304
    },
    {
      name: 'ちゅ、多様性。',
      date: new Date('2023-04-01'),
      youtube_url: 'ILQetdG_MFw',
      duration: 190
    },
    {
      name: '夕刻、夢ト見紛ウ ',
      date: new Date('2023-04-30'),
      youtube_url: 'GL7Ak8gxNwU',
      duration: 264
    },
    {
      name: 'キスしちゃだめっ！',
      date: new Date('2023-07-05'),
      youtube_url: 'EWSeiPCBY-U',
      duration: 213
    },
    {
      name: '雛鳥',
      date: new Date('2023-08-10'),
      youtube_url: 'Z2oMGiGCsfw',
      duration: 267
    },
    {
      name: 'イイコと妖狐',
      date: new Date('2023-09-05'),
      youtube_url: 'JZERDon8EII',
      duration: 230
    },
    {
      name: '勇者',
      date: new Date('2023-10-04'),
      youtube_url: '4hfMINXXO20',
      duration: 198
    },
    {
      name: '無神論',
      date: new Date('2023-10-11'),
      youtube_url: 'Pt73ke8_pC0',
      duration: 81
    },
    {
      name: '僕のヒーロー',
      date: new Date('2023-10-16'),
      youtube_url: 'yY15j396Xc4',
      duration: 339
    },
    {
      name: 'ヒビカセ',
      date: new Date('2024-01-01'),
      youtube_url: '65rrdaJ0WXE',
      duration: 259
    }
  ];

  constructor(private http: HttpClient) { }
}
