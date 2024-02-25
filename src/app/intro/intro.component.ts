import { Component, OnInit } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { YoutubeService } from '../services/youtube.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    this.youtubeService.getSubsCount$.subscribe(
      (data) => {
        this.subsCount = data.toString();
        this.subsCountK = (data / 1000).toFixed(1).toString() + 'k';
      }
    );
  }

  onMouseEnter(icon: string) {
    this.animatedIcon = icon;
  }

  onMouseLeave() {
    this.animatedIcon = null;
  }
}
