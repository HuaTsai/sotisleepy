import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamSong, CoverSong, Statistic, LyricsURL } from '../common/datatype'
import { Observable, delay, retryWhen, shareReplay, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  covers$ = this.http.get<CoverSong[]>(this.apiUrl + '/covers/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  publics$ = this.http.get<StreamSong[]>(this.apiUrl + '/streams/public/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  members$ = this.http.get<StreamSong[]>(this.apiUrl + '/streams/member/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  unlisteds$ = this.http.get<StreamSong[]>(this.apiUrl + '/streams/unlisted/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  statistic$ = this.http.get<Statistic>(this.apiUrl + '/statistic/').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );

  getLyrics(id: number): Observable<LyricsURL> {
    return this.http.get<LyricsURL>(this.apiUrl + '/lyrics/' + id.toString() + '/').pipe(
      shareReplay(1),
      retryWhen(errors => errors.pipe(delay(1000), take(3)))
    );
  }
}
