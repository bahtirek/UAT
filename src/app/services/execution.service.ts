import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { TestStep } from '../interfaces/test-step.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api } from '../data/api-url';
import { Screenshot, ServerResponse } from '../interfaces/screenshot.interface';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  url = api.url;
  activeStepSource = new Subject<TestStep>();
  nextStepSource = new Subject<number>();
  testCaseId: number;

  constructor(private http: HttpClient) { }

  executeTest(testCaseId: number): Observable<any> {
    return this.http.post<any>(this.url + '/test-case-execution', {testCaseId: testCaseId})
    .pipe(map(response => response?.result))
  }

  patchStepResult(executedStep: TestStep): Observable<any> {
    return this.http.patch<any>(this.url + '/test-step-execution', executedStep)
    .pipe(map(response => response?.result))
  }

  postScreenshot(testStepExecutionId: number, blob: string): Observable<Screenshot> {
    return this.http.post<ServerResponse<Screenshot>>(this.url + '/test-step-screenshot', {testStepExecutionId: testStepExecutionId, blob: blob})
    .pipe(map(response => response?.result))
  }

  getScreenshot(testStepExecutionId: number, screenshotId: number){
    const params = new HttpParams()
    .set('screenshotId', screenshotId)
    .set('testStepExecutionId', testStepExecutionId);
    return this.http.get<ServerResponse<Screenshot>>(this.url + '/test-step-screenshot', {params: params})
    .pipe(map(response => response?.result))
  }

  deleteScreenshot(testStepExecutionId: number, screenshotId: number){
    const params = new HttpParams()
    .set('screenshotId', screenshotId)
    .set('testStepExecutionId', testStepExecutionId);
    return this.http.delete<any>(this.url + '/test-step-screenshot', {params: params})
    .pipe(map(response => response?.result))
  }

  patchTestCaseExecutionStatus(testCaseExecutionId: number, status: string){
    return this.http.patch<ServerResponse<any>>(this.url + '/test-case-status', {testCaseExecutionId: testCaseExecutionId, status: status})
    .pipe(map(response => response?.result))
  }


  /* getTestCaseExecution(id: number){
    const params = new HttpParams().set('testCaseExecutionId', id);
    return this.http.get<ServerResponse<TestCase>>(this.url + '/test-case', {params})
    .pipe(map(response => response?.result))
  } */

}
