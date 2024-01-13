import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SONGS, YTLINK, Song } from './song';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'ytlink', 'reserved'];
  dataSource: MatTableDataSource<Song>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const songs = Array.from({ length: 50 }, (_, k) =>
      this.createNewSong(k + 1),
    );
    this.dataSource = new MatTableDataSource(songs);
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

  createNewSong(id: number): Song {
    return {
      id: id,
      name: SONGS[Math.round(Math.random() * (SONGS.length - 1))],
      ytlink: YTLINK[Math.round(Math.random() * (YTLINK.length - 1))],
      reserved: Math.round(Math.random() * 100).toString(),
      date: new Date(),
      start_time: Math.round(Math.random() * 100),
      end_time: Math.round(Math.random() * 100),
      duration: Math.round(Math.random() * 100)
    };
  }

  sayHello(song: Song) {
    console.log('Hello: ', song.ytlink)
  }
}
