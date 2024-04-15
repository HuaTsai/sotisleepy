import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'

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
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  tiles: Tile[] = [
    {rows: 2, cols: 5, item: "總曲目", value: "18xx曲"},
    {rows: 1, cols: 15, item: "未重複總曲目", value: "18xx曲"},
    {rows: 1, cols: 5, item: "日文歌", value: "18xx曲"},
    {rows: 1, cols: 5, item: "中文歌", value: "18xx曲"},
    {rows: 1, cols: 5, item: "英文歌", value: "18xx曲"},
    {rows: 1, cols: 4, item: "公開", value: "18xx曲"},
    {rows: 1, cols: 4, item: "會限", value: "18xx曲"},
    {rows: 1, cols: 4, item: "翻唱", value: "18xx曲"},
    {rows: 1, cols: 4, item: "未公開／Fanbox", value: "18xx曲"},
    {rows: 1, cols: 4, item: "無法觀看／私人／刪除", value: "18xx曲"},
    {rows: 1, cols: 5, item: "總唱歌時長", value: "18xx曲"},
    {rows: 1, cols: 5, item: "單一直播最高歌曲數量", value: "18xx曲"},
    {rows: 1, cols: 5, item: "僅於會限唱過的曲目", value: "18xx曲"},
    {rows: 1, cols: 5, item: "最近新曲", value: "18xx曲"},
  ]
}
