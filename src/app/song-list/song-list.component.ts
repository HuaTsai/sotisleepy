import { Component, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
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
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'date', 'youtube_url', 'duration'];
  dataSource = new MatTableDataSource<RenderSong>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() songType!: string;

  constructor(private songService: SongService) {}

  ngOnChanges(changes: SimpleChange) {
    if (this.songType === 'covers') {
      this.songService.covers$.subscribe(covers =>
        this.dataSource.data = this.convertCoverSongToRenderSong(covers)
      );
    } else if (this.songType === 'streams') {
      this.songService.streams$.subscribe(streams =>
        this.dataSource.data = this.convertStreamSongToRenderSong(streams)
      );
    }
  }

  convertStringToSeconds(time: string): number {
    const parts = time.split(':').map(part => +part);
    if (parts.length === 3) {
      return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
    } else if (parts.length === 2) {
      return (parts[0] * 60) + parts[1];
    } else if (parts.length === 3) {
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
        date: song[i].date,
        youtube_url: song[i].youtube_url,
        duration: this.convertStringToSeconds(song[i].duration),
        start_time: 0,
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
        date: song[i].date,
        youtube_url: song[i].youtube_url,
        duration: end_time - start_time,
        start_time: start_time
      });
    }
    return renderSong;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // @Input() type: string = 'song';
  @Output() songSelected = new EventEmitter<RenderSong>();
  selectSong(song: RenderSong) {
    this.songSelected.emit(song);
  }
}
