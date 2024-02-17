import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getSubsCount$ = this.http.get<number>(this.apiUrl + '/subscount').pipe(
    shareReplay(1)
  );
}
