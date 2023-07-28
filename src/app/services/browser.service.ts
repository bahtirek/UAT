import { Injectable } from '@angular/core';
import { api } from '../data/api-url';
import { Browser, ServerResponse } from '../interfaces/browser.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  url = api.url;
  browser: Browser;

  constructor(private http: HttpClient) { }

  browserSource = new Subject<Browser>()

  getAllBrowsers(){
    return this.http.get<any>(this.url)
    .pipe(map(response => response?.result))
  }

  getBrowserById(id: number) {
    const params = new HttpParams().set('browserId', id);
    return this.http.get<ServerResponse<Browser>>(this.url + '/browser', {params})
    .pipe(map(response => response?.result))
  }

  addBrowser(browser: Browser) {
    return this.http.post<ServerResponse<Browser>>(this.url + '/browser', browser)
    .pipe(map(response => response?.result))
  }

  updateBrowser(browser: Browser) {
    return this.http.patch<ServerResponse<Browser>>(this.url + '/browser', browser)
    .pipe(map(response => response?.result))
  }

  deleteBrowser(browserId: number) {
    const params = new HttpParams()
    .set('browserId', browserId)
    return this.http.delete<ServerResponse<Browser>>(this.url + '/browser', {params: params})
    .pipe(map(response => response?.result))
  }
}

