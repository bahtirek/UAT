import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TestStep } from '../interfaces/test-step.interface';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  constructor() { }

  activeStepSource = new Subject<TestStep>();
}
