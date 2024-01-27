import { Component, Input } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { RenderSong } from '../common/datatype';
import { IntroComponent } from '../intro/intro.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [YouTubePlayer, MatTabsModule, SongListComponent, IntroComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  videoId = 'YjOFrKd7dCs';
  getSongSelected(song: RenderSong) {
    this.videoId = song.youtube_url;
  }
}
