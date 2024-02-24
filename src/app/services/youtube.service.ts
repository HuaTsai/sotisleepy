import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, retryWhen, shareReplay, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getSubsCount$ = this.http.get<number>(this.apiUrl + '/subscount').pipe(
    shareReplay(1),
    retryWhen(errors => errors.pipe(delay(1000), take(3)))
  );
}
