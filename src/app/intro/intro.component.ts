import { Component, OnInit } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { YoutubeService } from '../services/youtube.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FontAwesomeModule, MatButtonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit {
  animatedIcon: string | null = null;

  subsCount = '0.00k';

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    this.youtubeService.getSubsCount$.subscribe(
      (data) => (this.subsCount = (data / 1000).toFixed(1).toString() + 'k'),
    );
  }

  onMouseEnter(icon: string) {
    this.animatedIcon = icon;
  }

  onMouseLeave() {
    this.animatedIcon = null;
  }
}
