import { Injectable, resolveForwardRef } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { TestStep } from '../interfaces/test-step.interface';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor() { }
  steps2: TestStep[] = [
    {
      testStepId: 13,
      description: '11333',
      expected: '11 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis assumenda ipsam cumque! Porro esse eveniet vitae rerum odit at consequatur earum culpa, accusamus, magni voluptates, fuga autem distinctio et natus!',
      order:2
    },
    {
      testStepId: 11,
      description: '11 111',
      expected: '11 111',
      order: 0
    },
    {
      testStepId: 12,
      description: '11 222',
      expected: '11 222',
      order: 1
    },
    {
      testStepId: 17,
      description: '11 777',
      expected: '11 777',
      order: 6
    },
    {
      testStepId: 14,
      description: '11 444',
      expected: '11 444',
      order: 3
    },
    {
      testStepId: 16,
      description: '11 666',
      expected: '11 666',
      order: 5
    },
    {
      testStepId: 15,
      description: '11 555',
      expected: '11 555',
      order: 4
    },
  ];
  steps: any = [];

  stepsSource = new Subject<TestStep[]>()

  async pushSteps(steps: TestStep[]){
    if(steps && steps.length > 0) {
      this.steps = await this.sortSteps([...steps]);
      this.stepsSource.next(this.steps);
    }
  }

  async saveStep(step: TestStep, stepIndex?: number){
    /* if(step.testStepId) {
      const existingStep = this.steps.find((item: TestStep) => item.testStepId == step.testStepId);
      existingStep.description = step.description;
      existingStep.expected = step.expected;
      this.pushSteps(this.steps);
    } else {
      if(stepIndex) {
        step.order = stepIndex;
        this.steps.splice(stepIndex + 1, 0, step);
        this.steps = await this.assignIndexAsOrder([...this.steps]);
        this.stepsSource.next(this.steps);
      } else {
        this.steps.push(step);
        this.steps[this.steps.length - 1].order = this.steps.length - 1;
        this.stepsSource.next(this.steps);
      }
    } */
  }

  moveStep(index: number){
    /* const element2 = this.steps[index-1]
    const element = this.steps.splice(index, 1)[0];    

    element.order= element.order - 1;
    element2.order= element2.order + 1;

    this.steps.splice(element.order, 0, element);
    this.stepsSource.next(this.steps); */
  }

  async deleteStep(testStepId: number){
    /* const index = this.steps.findIndex((step: TestStep) => step.testStepId== testStepId)
    this.steps.splice(index, 1);
    this.steps = await this.assignIndexAsOrder([...this.steps]);
    this.stepsSource.next(this.steps); */
  }

  async importSteps(testStepId: number, stepIndex?: number){
    //const steps = this.getSteps(id);
    /* const array: any = await this.sortSteps(JSON.parse(JSON.stringify(this.steps2)))
    if(stepIndex) {
      this.steps.splice(stepIndex + 1, 0, ...array );
      this.steps = await this.assignIndexAsOrder([...this.steps]);
      this.stepsSource.next(this.steps);
    } else {
      this.steps  = this.steps.concat(array);
      this.steps = await this.assignIndexAsOrder([...this.steps]);
      this.stepsSource.next(this.steps);
    } */
  }

  getSteps(id?: number){
    return this.steps;
  }

  sortSteps(array: any) {
    return new Promise (async (resolve) => {
      for (let index = 0; index < array.length; index++) {
        const element = array.splice(index, 1)[0];
        array.splice(element.order, 0, element);
        if(index == array.length - 1) {
          resolve(array)
        };
      }
    })
  }

  assignIndexAsOrder(array: any){
    return new Promise (async(resolve) => {
      for (let index = 0; index < array.length; index++) {
        array[index].order = index;
        if(index == array.length - 1) {
          resolve(array)
        }
      }
    })
  }

}
