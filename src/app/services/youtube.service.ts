import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  channelId = 'UCgGso0vVI2wfXHeXcxn1sZA';
  apiUrl = 'https://youtube.googleapis.com/youtube/v3/';
  // video api: 'videos?part=snippet%2CcontentDetails%2Cstatistics&id=HUPn0JZjntw'

  constructor(private http: HttpClient) {}

  getInfo() {
    let options = {
      headers: { 'accept': 'text/plain' },
      observe: 'body' as const,
      responseType: 'json' as const
    };

    this.http
      .get(
        this.apiUrl + 'channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCgGso0vVI2wfXHeXcxn1sZA' +
      options)
      .subscribe((res) => console.log(res));
  }
}
