import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatIconModule, FontAwesomeModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  animatedIcon: string | null = null;

  onMouseEnter(icon: string) {
    this.animatedIcon = icon;
  }

  onMouseLeave() {
    this.animatedIcon = null;
  }
}
