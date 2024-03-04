import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamSong, CoverSong } from '../common/datatype'
import { Observable, delay, retryWhen, shareReplay, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  songs$ = this.http.get<StreamSong[]>(this.apiUrl + '/songs/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  covers$ = this.http.get<CoverSong[]>(this.apiUrl + '/covers/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  streams$ = this.http.get<StreamSong[]>(this.apiUrl + '/streams/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  getLyrics(id: number): Observable<string> {
    return this.http.get<string>(this.apiUrl + '/lyrics/' + id.toString() + '/').pipe(
      shareReplay(1),
      retryWhen(errors => errors.pipe(delay(1000), take(3)))
    );
  }
}
