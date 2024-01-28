import { Component, Output, EventEmitter } from '@angular/core';
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
    MinutesSecondsPipe
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'youtube_url', 'duration'];
  dataSource: MatTableDataSource<RenderSong>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private songService: SongService) {
    const songs = this.convertCoverSongToRenderSong(songService.coverList);
    this.dataSource = new MatTableDataSource(songs);
  }

  convertCoverSongToRenderSong(song: CoverSong []): RenderSong [] {
    var renderSong: RenderSong[] = [];
    for (var i = 0; i < song.length; i++) {
      renderSong.push({
        id: i + 1,
        name: song[i].name,
        youtube_url: song[i].youtube_url,
        duration: song[i].duration,
        start_time: 0,
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
