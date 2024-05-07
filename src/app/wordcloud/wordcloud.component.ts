import { Component, OnInit } from '@angular/core';
import { AngularD3CloudModule } from 'angular-d3-cloud';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-wordcloud',
  standalone: true,
  imports: [AngularD3CloudModule],
  templateUrl: './wordcloud.component.html',
  styleUrl: './wordcloud.component.scss',
})
export class WordcloudComponent implements OnInit {
  wcdata: {text: string, value: number}[] = [];
  towcdataid = new Map<string, number>();

  readonly generalWeight = 5;
  readonly coverWeight = 2;

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.publics$.subscribe((publics) => {
      let data = new Map<string, Set<string>>();
      publics.forEach((stream) => {
        if (!data.has(stream.name)) {
          data.set(stream.name, new Set<string>());
        }
        data.get(stream.name)?.add(stream.youtube_url);
      });
      this.updateWordCloudData(data);
    });

    this.songService.members$.subscribe((members) => {
      let data = new Map<string, Set<string>>();
      members.forEach((member) => {
        if (!data.has(member.name)) {
          data.set(member.name, new Set<string>());
        }
        data.get(member.name)?.add(member.youtube_url);
      });
      this.updateWordCloudData(data);
    });

    this.songService.unlisteds$.subscribe((unlisteds) => {
      let data = new Map<string, Set<string>>();
      unlisteds.forEach((unlisted) => {
        if (!data.has(unlisted.name)) {
          data.set(unlisted.name, new Set<string>());
        }
        data.get(unlisted.name)?.add(unlisted.youtube_url);
      });
      this.updateWordCloudData(data);
    });

    this.songService.covers$.subscribe((covers) => {
      let data = new Map<string, Set<string>>();
      covers.forEach((cover) => {
        if (!data.has(cover.name)) {
          data.set(cover.name, new Set<string>());
        }
        data.get(cover.name)?.add(cover.youtube_url);
      });
      this.updateWordCloudData(data, this.coverWeight);
    });
  }

  updateWordCloudData(data: Map<string, Set<string>>, weight = 1) {
    for (let [name, urls] of data.entries()) {
      if (!this.towcdataid.has(name)) {
        this.towcdataid.set(name, this.wcdata.length);
        this.wcdata = [...this.wcdata, {text: name, value: urls.size * this.generalWeight * weight}];
      } else {
        const id = this.towcdataid.get(name)!;
        this.wcdata[id].value += urls.size * this.generalWeight * weight;
        this.wcdata = [...this.wcdata];
      }
    }
  }
}
