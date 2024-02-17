import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamSong, CoverSong } from '../common/datatype'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  // TODO: use http stream & share replay, make apiUrl configurable
  // readonly apiUrl = 'http://localhost:8000';
  readonly apiUrl = 'https://sotis-website-412614.de.r.appspot.com/api';

  streamSongList: StreamSong[] = [];
  coverList: CoverSong[] = [];

  constructor(private http: HttpClient) {}

  getCovers(): Observable<CoverSong[]> {
    return this.http.get<CoverSong[]>(this.apiUrl + '/covers/');
  }
}
