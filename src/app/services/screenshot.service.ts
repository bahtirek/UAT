///<reference types="chrome"/>
import { Injectable } from '@angular/core';
import { Screenshot, ServerResponse } from '../interfaces/screenshot.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { api } from '../data/api-url';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  url = api.url;

  constructor(private http: HttpClient) { }

  postScreenshot(testStepExecutionId: number, blob: string): Observable<Screenshot> {
    return this.http.post<ServerResponse<Screenshot>>(this.url + '/test-step-screenshot', {testStepExecutionId: testStepExecutionId, blob: blob})
    .pipe(map(response => response?.result))
  }

  getScreenshot(uuid: string){
    const params = new HttpParams().set('uuid', uuid);
    return this.http.get<ServerResponse<Screenshot>>(this.url + '/test-step-screenshot', {params})
    .pipe(map(response => response?.result))
  }

  deleteScreenshot(uuid: string, testStepExecutionId: number){
    const params = new HttpParams()
    .set('uuid', uuid)
    .set('testStepExecutionId', testStepExecutionId);
    return this.http.delete<any>(this.url + '/test-step-screenshot', {params})
    .pipe(map(response => response?.result))
  }
}
