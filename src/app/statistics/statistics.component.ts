import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { SongService } from '../services/song.service';
import { Statistics } from '../common/datatype';

export interface Tile {
  cols: number;
  rows: number;
  item: string;
  value: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  tiles: Tile[] = [
    { rows: 2, cols: 5, item: '總曲目', value: '0 曲' },
    { rows: 1, cols: 15, item: '未重複總曲目', value: '0 曲' },
    { rows: 1, cols: 5, item: '日文歌', value: '0 曲' },
    { rows: 1, cols: 5, item: '中文歌', value: '0 曲' },
    { rows: 1, cols: 5, item: '英文歌', value: '0 曲' },
    { rows: 1, cols: 4, item: '公開', value: '0 曲' },
    { rows: 1, cols: 4, item: '會限', value: '0 曲' },
    { rows: 1, cols: 4, item: '翻唱', value: '0 曲' },
    { rows: 1, cols: 4, item: '未公開／Fanbox', value: '0 曲' },
    { rows: 1, cols: 4, item: '無法觀看／私人／刪除', value: '0 曲' },
    { rows: 1, cols: 5, item: '總唱歌時長', value: '0d 0h 0m' },
    { rows: 1, cols: 5, item: '單一直播最高歌曲數量', value: '0 曲' },
    { rows: 1, cols: 5, item: '僅於會限唱過的曲目', value: '0 曲' },
    { rows: 1, cols: 5, item: '最近新曲', value: '' },
  ];

  public_rank = {
    item: '最常唱歌曲排名（公開）',
    value: ['']
  }

  all_rank = {
    item: '最常唱歌曲排名（全部）',
    value: ['']
  }

  artist_rank = {
    item: '最常唱原唱或作者排名',
    value: ['']
  }

  audience_rank = {
    item: '觀眾夜間歌回投票排名',
    value: [
      '1. 花に亡霊',
      '2. 僕が死のうと思ったのは',
      '3. 所念皆星河',
      '4. すずめ',
      '5. 前前前世',
      '5. 寄り酔い',
      '6. 食虫植物',
      '6. 海の幽霊',
      '7. 君の知らない物語',
      '7. アヤノの幸福理論',
      '8. 深昏睡',
      '9. ドライフラワー',
      '10. 点描の唄',
      '10. シリウスの心臓',
    ]
  }

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.songService.statistic$.subscribe((data) => {
      this.tiles[0].value = data.total_count.toString() + ' 曲';
      this.tiles[1].value = data.nonrepeat.all.toString() + ' 曲';
      this.tiles[2].value = data.nonrepeat.jp.toString() + ' 曲';
      this.tiles[3].value = data.nonrepeat.zh.toString() + ' 曲';
      this.tiles[4].value = data.nonrepeat.en.toString() + ' 曲';
      this.tiles[5].value = data.public_count.toString() + ' 曲';
      this.tiles[6].value = data.member_count.toString() + ' 曲';
      this.tiles[7].value = data.cover_count.toString() + ' 曲';
      this.tiles[8].value = data.unlisted_count.toString() + ' 曲';
      this.tiles[9].value = data.other_count.toString() + ' 曲';
      this.tiles[10].value = data.singing_time;
      this.tiles[11].value = data.max_songs_per_stream.toString() + ' 曲';
      this.tiles[12].value = data.songs_member_only.toString() + ' 曲';
      this.tiles[13].value = data.latest_song;
      this.public_rank['value'] = data.top_songs_public.map((item, index) => (index + 1).toString() + '. ' + item);
      this.all_rank['value'] = data.top_songs_all.map((item, index) => (index + 1).toString() + '. ' + item);
      this.artist_rank['value'] = data.top_artists.map((item, index) => (index + 1).toString() + '. ' + item);
    });
  }
}
