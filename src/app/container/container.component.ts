import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { StatisticsComponent } from '../statistics/statistics.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    StatisticsComponent,
    MatDialogModule,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  videoId = 'https://www.youtube-nocookie.com/embed/';
  songId = 0;
  lyrics = '';
  originalURL = '';
  videoShort = 'https://www.youtube.com/embed/Bg1dwt79iG8';

  dataLoadedCount = 0;
  allDataLoaded = false;

  constructor(
    private youtubeService: YoutubeService,
    private songService: SongService,
    public dialog: MatDialog,
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
    if (this.dataLoadedCount === 4) {
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

  getSongSelected(song: RenderSong, ispublic = true) {
    if (ispublic) {
      this.videoId = this.toEmbedUrl(song);
    }
    this.songId = song.song_id;
  }

  @ViewChild('sharetooltip') tooltip!: MatTooltip;
  copyLink() {
    this.tooltip.show();
    setTimeout(() => this.tooltip.hide(2000));
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.tab.textLabel === '歌詞') {
      this.songService.getLyrics(this.songId).subscribe((data) => {
        this.lyrics = data.lyrics;
        this.originalURL = data.url;
      });
    }
  }

  openInfo() {
    const dialogRef = this.dialog.open(ReleaseNotesComponent);
  }
}

@Component({
  selector: 'release-notes',
  templateUrl: 'release-notes.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ReleaseNotesComponent implements OnInit, OnDestroy {
  readonly gradDate = new Date('2024-05-10T12:00:00Z');
  diffDays = 0;
  diffHours = 0;
  timeoutId?: number;
  timerId?: number;

  ngOnInit() {
    this.updateDiff();
    const now = new Date();
    const msToNextHour = 1000 * 60 * 60 - now.getTime() % (1000 * 60 * 60);
    this.timeoutId = setTimeout(() => {
      this.updateDiff();
      this.timerId = setInterval(() => this.updateDiff(), 1000 * 60 * 60);
    }, msToNextHour);
  }

  ngOnDestroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.timerId) clearInterval(this.timerId);
  }

  updateDiff() {
    const now = new Date();
    const diff = this.gradDate.getTime() - now.getTime();
    this.diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }
}

