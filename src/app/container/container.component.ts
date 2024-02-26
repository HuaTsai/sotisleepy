import { Component, Input } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { RenderSong } from '../common/datatype';
import { IntroComponent } from '../intro/intro.component';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafePipe } from '../common/safe.pipe';
import { MediaDirective } from '../common/media.directive';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  // videoId = 'https://www.youtube.com/embed/og7GA4PPsCw?autoplay=1&cc_load_policy=1&enablejsapi=1&start=12145&end=12150';
  videoId = 'https://www.youtube.com/embed/og7GA4PPsCw';
  videoShort = 'https://www.youtube.com/embed/Bg1dwt79iG8';

  dataLoadedCount = 0;
  allDataLoaded = false;

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
      'https://www.youtube-nocookie.com/embed/' + song.youtube_url +
      '?autoplay=1&cc_load_policy=1&enablejsapi=1' +
      '&start=' + song.start_time +
      '&end=' + (song.start_time + song.duration) // XXX: May remove
    );
  }

  getSongSelected(song: RenderSong) {
    this.videoId = this.toEmbedUrl(song);
  }
}
