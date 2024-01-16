import { Component } from '@angular/core';
import { SongListComponent } from '../song-list/song-list.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SongListComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
