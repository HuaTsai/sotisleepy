import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { RenderSong } from '../common/datatype';
import { IntroComponent } from '../intro/intro.component';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafePipe } from '../common/safe.pipe';
import { MediaDirective } from '../common/media.directive';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../services/youtube.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    SongListComponent,
    IntroComponent,
    SafePipe,
    MediaDirective,
    ClipboardModule,
    MatTooltipModule,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  // videoId = 'https://www.youtube-nocookie.com/embed/ya5lC2iYqgE';
  videoId = 'https://www.youtube-nocookie.com/embed/';
  songId = 0;
  lyrics = '';
  videoShort = 'https://www.youtube.com/embed/Bg1dwt79iG8';

  dataLoadedCount = 0;
  allDataLoaded = false;

  constructor(
    private youtubeService: YoutubeService,
    private songService: SongService,
  ) {}

  ngOnInit() {
    this.youtubeService.getLatestUrl$.subscribe(
      (data) =>
        (this.videoId = 'https://www.youtube-nocookie.com/embed/' + data),
    );
  }

  // TODO: Add youtube player api
  // ytstatus = 'unstarted';
  //
  // onYoutubeIframeAPIReady() {
  //   player = new YT.Player('player', {
  //     events: {
  //       'onStateChange': onPlayerStateChange
  //     }
  //   });
  // }

  // onPlayerStateChange(event) {
  //   if (event.data === YT.PlayerState.PLAYING) {
  //     this.ytstatus = 'Playing';
  //   }
  // }

  onDataLoaded(event: boolean) {
    this.dataLoadedCount++;
    if (this.dataLoadedCount === 2) {
      this.allDataLoaded = true;
    }
  }

  toEmbedUrl(song: RenderSong): string {
    return (
      'https://www.youtube-nocookie.com/embed/' +
      song.youtube_url +
      '?autoplay=1&cc_load_policy=1&enablejsapi=1' +
      '&start=' +
      song.start_time +
      '&end=' +
      (song.start_time + song.duration) // XXX: May remove
    );
  }

  getSongSelected(song: RenderSong) {
    this.videoId = this.toEmbedUrl(song);
    this.songId = song.song_id;
  }

  @ViewChild('sharetooltip') tooltip!: MatTooltip;
  copyLink() {
    this.tooltip.show();
    setTimeout(() => this.tooltip.hide(2000));
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log(event.tab.textLabel);
    if (event.tab.textLabel === 'Lyrics') {
      this.songService
        .getLyrics(this.songId)
        .subscribe((data) => (this.lyrics = data));
    }
  }
}
