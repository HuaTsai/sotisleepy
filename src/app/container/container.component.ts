import { Component, Input } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { Song } from '../song-list/song';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [YouTubePlayer, SongListComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  videoId = 'YjOFrKd7dCs';
  getSongSelected(song: Song) {
    this.videoId = song.ytlink;
  }
}
