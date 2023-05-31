import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { TestStep } from '../interfaces/test-step.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api } from '../data/api-url';

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

  /* getTestCaseExecution(id: number){
    const params = new HttpParams().set('testCaseExecutionId', id);
    return this.http.get<ServerResponse<TestCase>>(this.url + '/test-case', {params})
    .pipe(map(response => response?.result))
  } */

}
