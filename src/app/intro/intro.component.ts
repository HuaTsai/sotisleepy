import { Component } from '@angular/core';
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
export class IntroComponent {
  animatedIcon: string | null = null;

  constructor(private youtubeService: YoutubeService) {}

  onMouseEnter(icon: string) {
    this.animatedIcon = icon;
  }

  onMouseLeave() {
    this.animatedIcon = null;
  }

  getSubsCount(): string {
    let subsCount = 0;
    this.youtubeService.getSubsCount$.subscribe(data => subsCount = data);
    return (subsCount / 1000).toFixed(1).toString() + 'k';
  }
}
