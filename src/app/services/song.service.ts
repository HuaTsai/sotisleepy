import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamSong, CoverSong } from '../common/datatype'
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  songs$ = this.http.get<StreamSong[]>(this.apiUrl + '/songs/').pipe(
    shareReplay(1)
  );

  covers$ = this.http.get<CoverSong[]>(this.apiUrl + '/covers/').pipe(
    shareReplay(1)
  );

  streams$ = this.http.get<StreamSong[]>(this.apiUrl + '/streams/').pipe(
    shareReplay(1)
  );
}
