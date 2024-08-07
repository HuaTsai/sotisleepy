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
import { WordcloudComponent } from '../wordcloud/wordcloud.component';

declare var YT: any;

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
    WordcloudComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  latestUrl = 'pDWZTs2UvG8';
  startSeconds = 0;
  songId = 0;
  songType = '';
  lyrics = '';
  originalURL = '';
  player?: any;

  dataLoadedCount = 0;
  allDataLoaded = false;

  constructor(
    private youtubeService: YoutubeService,
    private songService: SongService,
    public dialog: MatDialog,
  ) {}

  @ViewChild('streams') streamsSongList!: SongListComponent;
  @ViewChild('covers') coversSongList!: SongListComponent;
  @ViewChild('unlisteds') unlistedsSongList!: SongListComponent;

  ngOnInit() {
    // this.youtubeService.getLatestUrl$.subscribe((data) => {
    //   this.latestUrl = data;
    //   this.player = new YT.Player('player', {
    //     events: {
    //       'onStateChange': (event: any) => {
    //         if (event.data === YT.PlayerState.ENDED) {
    //           if (this.songType === 'publics') {
    //             this.streamsSongList.selectNextSong();
    //           } else if (this.songType === 'covers') {
    //             this.coversSongList.selectNextSong();
    //           } else if (this.songType === 'unlisteds') {
    //             this.unlistedsSongList.selectNextSong();
    //           }
    //         }
    //       }
    //     }
    //   });
    // });
  }

  onDataLoaded(event: boolean) {
    this.dataLoadedCount++;
    if (this.dataLoadedCount === 4) {
      this.allDataLoaded = true;
    }
  }

  getSongSelected(value: {renderSong: RenderSong, songType: string}) {
    this.latestUrl = value.renderSong.youtube_url;
    this.songId = value.renderSong.song_id;
    this.songType = value.songType;
    this.startSeconds = value.renderSong.start_time;
    // if (value.songType !== 'members') {
    //   this.player.loadVideoById({
    //     videoId: value.renderSong.youtube_url,
    //     startSeconds: value.renderSong.start_time,
    //     endSeconds: value.renderSong.start_time + value.renderSong.duration
    //   });
    // }
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

  @ViewChild(WordcloudComponent) wordcloud!: WordcloudComponent;
  onClickWordCloudTab() {
    this.wordcloud.refresh();
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
  // readonly gradDate = new Date('2024-05-10T12:00:00Z');
  // diffDays = 0;
  // diffHours = 0;
  // timeoutId?: number;
  // timerId?: number;

  ngOnInit() {
    // this.updateDiff();
    // const now = new Date();
    // const msToNextHour = 1000 * 60 * 60 - now.getTime() % (1000 * 60 * 60);
    // this.timeoutId = setTimeout(() => {
    //   this.updateDiff();
    //   this.timerId = setInterval(() => this.updateDiff(), 1000 * 60 * 60);
    // }, msToNextHour);
  }

  ngOnDestroy() {
    // if (this.timeoutId) clearTimeout(this.timeoutId);
    // if (this.timerId) clearInterval(this.timerId);
  }

  updateDiff() {
    // const now = new Date();
    // const diff = this.gradDate.getTime() - now.getTime();
    // this.diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    // this.diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }
}

