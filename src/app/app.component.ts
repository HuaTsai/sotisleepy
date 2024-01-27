import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { ContainerComponent } from './container/container.component';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faYoutube, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SongListComponent, ContainerComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(faConfig: FaConfig, library: FaIconLibrary) {
    faConfig.defaultPrefix = 'fab';
    faConfig.fixedWidth = true;
    library.addIcons(faYoutube);
    library.addIcons(faFacebook);
    library.addIcons(faTwitter);
    library.addIcons(faInstagram);
  }
}
