import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { TestCase, ServerResponse, TestStepOrder } from '../interfaces/test-case.interface';
import { api } from '../data/api-url';
import { TestStep } from '../interfaces/test-step.interface';
import { ImportedTestCase } from '../interfaces/imported-test-case.interface';
import { Directory } from '../interfaces/directory.interface';


@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  url = api.url;
  stepOrderForImport: number;
  testCaseDetails: TestCase;
  directory: Directory;


  constructor(private http: HttpClient) { }

  private _testCase: TestCase;

    get testCase(): TestCase {
        return this._testCase;
    }
    set testCase(value: TestCase) {
        this._testCase = value;
    }

  testCaseSource = new Subject<TestCase>()

  getTestCaseById(id: number){
    const params = new HttpParams().set('testCaseId', id);
    return this.http.get<ServerResponse<TestCase>>(this.url + '/test-case', {params})
    .pipe(map(response => response?.result))
  }

  addTestCase(testCase: TestCase): Observable<TestCase> {
    testCase.directoryId = this.directory.directoryId;
    return this.http.post<ServerResponse<TestCase>>(this.url + '/test-case', testCase)
    .pipe(map(response => response?.result))
  }

  importTestCase(importedTestCase: ImportedTestCase): Observable<TestCase> {
    return this.http.post<ServerResponse<TestCase>>(this.url + '/import-test-case', importedTestCase)
    .pipe(map(response => response?.result))
  }

  importableCheck(testCaseId: number){
    const params = new HttpParams()
      .set('testCaseId', testCaseId)
    return this.http.get<ServerResponse<TestCase[]>>(this.url + '/test-case-search', {params})
    .pipe(map(response => response?.result))
  }

  updateTestCase(testCase: TestCase): Observable<TestCase> {
    return this.http.patch<ServerResponse<TestCase>>(this.url + '/test-case', testCase)
    .pipe(map(response => response?.result))
  }

  searchTestCase(title: string, includeDeleted: number){
    const params = new HttpParams()
      .set('title', title)
      .set('includeDeleted', includeDeleted);
    return this.http.get<ServerResponse<TestCase[]>>(this.url + '/test-case-search', {params})
    .pipe(map(response => response?.result))
  }

  addTestStep(testStep: TestStep, order: number){
    testStep.order = order;
    return this.http.post<ServerResponse<TestCase>>(this.url + '/test-step', testStep)
    .pipe(map(response => response?.result))
  }

  updateTestStep(testStep: TestStep){
    return this.http.patch<ServerResponse<TestCase>>(this.url + '/test-step', testStep)
    .pipe(map(response => response?.result))
  }

  deleteTestStep(testStep: TestStep){
    const params = new HttpParams()
    .set('testCaseId', testStep.testCaseId)
    .set('order', testStep.order);
    return this.http.delete<ServerResponse<TestCase>>(this.url + '/test-step', {params})
    .pipe(map(response => response?.result))
  }

  changeStepOrder(stepOrders: any){
    return this.http.post<ServerResponse<TestCase>>(this.url + '/step-order-change', stepOrders)
    .pipe(map(response => response?.result))
  }

  continueCase(){
    this.getTestCaseById(10).subscribe(
      response => {
        this.testCaseSource.next(response);
        this.testCase = response;
      }
    )
  }

  setTestCase(testCase: TestCase){
    this.testCase = this.setTitleForImportedCase({...testCase});
    this.testCaseSource.next(testCase)
  }

  createStepsArray(testCase: TestCase, importedCases: TestCase[]){
    const importedIndex = testCase.testStepOrder.findIndex((item: TestStepOrder) => item.imported);
    if(importedIndex >= 0) {
      const steps = importedCases.find((importedCase: TestCase) => importedCase.testCaseId == testCase.testStepOrder[importedIndex].importedTestCaseId);
      testCase.testStepOrder.splice(importedIndex, 1);
      testCase.testStepOrder.splice(importedIndex, 0, ...steps.testStepOrder );
      console.log(importedIndex);

      this.createStepsArray(testCase, importedCases);
    }
  }

  createStepsArray2(testCase: TestCase){
    const importedIndex = testCase.testStepOrder.findIndex((item: TestStepOrder) => item.importedTestCaseId);
    if(importedIndex >= 0) {
      const steps = testCase.importedTestCases.find((importedCase: TestCase) => importedCase.testCaseId == testCase.testStepOrder[importedIndex].importedTestCaseId);
      testCase.testStepOrder.splice(importedIndex, 1);
      testCase.testStepOrder.splice(importedIndex, 0, ...steps.testStepOrder );

      this.createStepsArray2(testCase);
    }
  }

  createStepsArrayPromise(testCase: TestCase, importedCases: TestCase[]){
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < importedCases.length; i++) {
        const importedIndex = testCase.testStepOrder.findIndex((item: TestStepOrder) => item.imported);
        console.log(importedIndex);
        if(importedIndex >= 0) {
          const steps = importedCases.find((importedCase: TestCase) => importedCase.testCaseId == testCase.testStepOrder[importedIndex].importedTestCaseId);
          testCase.testStepOrder.splice(importedIndex, 1);
          testCase.testStepOrder.splice(importedIndex, 0, ...steps.testStepOrder );
        }
        if(i == importedCases.length - 1) resolve();
      }
    })
  }

  setTitleForImportedCase(testCase: TestCase){
    if(testCase.testStepOrder) {
      testCase.testStepOrder.forEach(step => {
        if(step.importedTestCaseId) {
          const importedCase = testCase.importedTestCases.find(testCaseItem => testCaseItem.testCaseId == step.importedTestCaseId);
          step.importedCaseTitle = importedCase.title;
        }
      })
    }
    return testCase;
  }

  getTestCase(){
    return this.testCase;
  }

  clearTestCase() {
    this.testCase = {};
    this.testCaseDetails = {};
  }
}
