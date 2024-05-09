import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChange,
} from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StreamSong, CoverSong, RenderSong } from '../common/datatype';
import { SongService } from '../services/song.service';
import { CommonModule } from '@angular/common';
import { MinutesSecondsPipe } from '../common/minutes-seconds.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MinutesSecondsPipe,
    MatChipsModule,
    FontAwesomeModule,
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'artist', 'date', 'duration'];
  dataSource = new MatTableDataSource<RenderSong>();
  currentIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() songType!: string;
  @Output() dataLoadedEvent = new EventEmitter<boolean>();

  constructor(private songService: SongService) {}

  ngOnChanges(changes: SimpleChange) {
    if (this.songType === 'covers') {
      this.songService.covers$.subscribe((covers) => {
        this.dataSource.data = this.convertCoverSongToRenderSong(covers);
        this.dataLoadedEvent.emit(true);
      });
    } else if (this.songType === 'publics') {
      this.songService.publics$.subscribe((publics) => {
        this.dataSource.data = this.convertStreamSongToRenderSong(publics);
        this.dataLoadedEvent.emit(true);
      });
    } else if (this.songType === 'members') {
      this.songService.members$.subscribe((members) => {
        this.dataSource.data = this.convertStreamSongToRenderSong(members);
        this.dataLoadedEvent.emit(true);
      });
    } else if (this.songType === 'unlisteds') {
      this.songService.unlisteds$.subscribe((unlisteds) => {
        this.dataSource.data = this.convertStreamSongToRenderSong(unlisteds);
        this.dataLoadedEvent.emit(true);
      });
    } else if (this.songType === 'originals') {
      this.dataSource.data = [
        {
          id: 1,
          name: '勇者様だぞ！',
          tags: '第一首也是最後一首原創曲',
          artist: 'Myo Sotis ft. 暗雨Anyu',
          lang: 'Japanese',
          date: new Date('2024-05-09'),
          youtube_url: 'tpXMYr7G3rM',
          duration: 85,
          start_time: 0,
          song_id: 29,
        }
      ];
    }
  }

  convertStringToSeconds(time: string): number {
    const parts = time.split(':').map((part) => +part);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    } else {
      throw new Error('Invalid time format');
    }
  }

  convertCoverSongToRenderSong(song: CoverSong[]): RenderSong[] {
    let renderSong: RenderSong[] = [];
    for (let i = 0; i < song.length; i++) {
      renderSong.push({
        id: song[i].id,
        name: song[i].name,
        tags: song[i].tags,
        artist: song[i].artist,
        lang: song[i].lang,
        date: song[i].date,
        youtube_url: song[i].youtube_url,
        duration: this.convertStringToSeconds(song[i].duration),
        start_time: 0,
        song_id: song[i].song_id,
      });
    }
    return renderSong;
  }

  convertStreamSongToRenderSong(song: StreamSong[]): RenderSong[] {
    let renderSong: RenderSong[] = [];
    for (let i = 0; i < song.length; i++) {
      let start_time = this.convertStringToSeconds(song[i].start_time);
      let end_time = this.convertStringToSeconds(song[i].end_time);
      renderSong.push({
        id: song[i].id,
        name: song[i].name,
        tags: song[i].tags,
        artist: song[i].artist,
        lang: song[i].lang,
        date: song[i].date,
        youtube_url: song[i].youtube_url,
        duration: end_time - start_time,
        start_time: start_time,
        song_id: song[i].song_id,
      });
    }
    return renderSong;
  }

  toExternalUrl(song: RenderSong): string {
    return (
      'https://www.youtube.com/watch?v=' +
      song.youtube_url +
      '&t=' +
      '&start=' +
      song.start_time
    );
  }

  toRenderableArtist(artist: string): string {
    if (artist.includes("After the Rain")) {
      return "After the Rain";
    } else if (artist.includes("サザンオールスターズ")) {
      return "サザンオールスターズ";
    } else {
      return artist;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.firstPageLabel = '';
    this.paginator._intl.previousPageLabel = '';
    this.paginator._intl.nextPageLabel = '';
    this.paginator._intl.lastPageLabel = '';
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @Output() songSelected = new EventEmitter<{renderSong: RenderSong, songType: string}>();
  selectSong(song: RenderSong) {
    this.currentIndex = this.dataSource.filteredData.indexOf(song);
    this.songSelected.emit({renderSong: song, songType: this.songType});
    if (this.songType === 'members') {
      window.open(this.toExternalUrl(song), "_blank");
    }
  }

  selectNextSong() {
    if (this.currentIndex + 1 < this.dataSource.filteredData.length) {
      this.currentIndex++;
      this.songSelected.emit({renderSong: this.dataSource.filteredData[this.currentIndex], songType: this.songType});
    }
  }
}
