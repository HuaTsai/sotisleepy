import { Component, Input } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';
import { RenderSong } from '../common/datatype';
import { IntroComponent } from '../intro/intro.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafePipe } from '../common/safe.pipe';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatButtonModule, MatToolbarModule, SongListComponent, IntroComponent, SafePipe],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  videoId = 'https://www.youtube.com/embed/YjOFrKd7dCs';
  videoShort = 'https://www.youtube.com/embed/Bg1dwt79iG8';

  toEmbedUrl(song: RenderSong, autoplay: boolean = true): string {
    return (
      'https://www.youtube.com/embed/' +
      song.youtube_url +
      '?cc_load_policy=1' +
      '&start=' + song.start_time +
      '&end=' + (song.start_time + song.duration) +  // XXX: May remove
      (autoplay ? '&autoplay=1' : '')
    );
  }

  getSongSelected(song: RenderSong) {
    this.videoId = this.toEmbedUrl(song, true);
  }
}
