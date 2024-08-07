import { Component, Input, OnInit } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { YoutubeService } from '../services/youtube.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FontAwesomeModule, MatButtonModule, MatTooltipModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  animatedIcon: string | null = null;

  subsCountK = '0.00k';
  subsCount = '0';

  streamsCount = 0;
  coversCount = 0;

  constructor(private youtubeService: YoutubeService, private songService: SongService) {}

  ngOnInit() {
    // this.youtubeService.getSubsCount$.subscribe(
    //   (data) => {
    //     this.subsCount = data.toString();
    //     this.subsCountK = (data / 1000).toFixed(1).toString() + 'k';
    //   }
    // );
    this.songService.statistic$.subscribe(
      (data) => {
        this.streamsCount = data.stream_count;
        this.coversCount = data.cover_count;
      }
    )
  }

  onMouseEnter(icon: string) {
    this.animatedIcon = icon;
  }

  onMouseLeave() {
    this.animatedIcon = null;
  }
}
