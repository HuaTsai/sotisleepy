import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { ContainerComponent } from './container/container.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBug,
  faHeart,
  faShareNodes,
  faArrowTrendUp,
  faArrowUpRightFromSquare,
  faUserGroup,
  faGuitar,
  faLightbulb,
  faCircleInfo,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SongListComponent,
    ContainerComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(faConfig: FaConfig, library: FaIconLibrary) {
    faConfig.fixedWidth = true;
    library.addIcons(faBug);
    library.addIcons(faHeart);
    library.addIcons(faShareNodes);
    library.addIcons(faArrowTrendUp);
    library.addIcons(faArrowUpRightFromSquare);
    library.addIcons(faUserGroup);
    library.addIcons(faGuitar);
    library.addIcons(faLightbulb);
    library.addIcons(faCircleInfo);
    library.addIcons(faArrowsRotate);

    // Brand icons
    library.addIcons(faYoutube);
    library.addIcons(faFacebook);
    library.addIcons(faTwitter);
    library.addIcons(faInstagram);
  }
}
