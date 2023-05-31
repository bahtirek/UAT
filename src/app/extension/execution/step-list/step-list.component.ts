import { Component, Input, OnInit } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.less']
})
export class StepListComponent implements OnInit {

  constructor(private executionService: ExecutionService) { }

  @Input() steps: TestStep[];

  ngOnInit(): void {
    this.executionService.nextStepSource.subscribe({
      next: (response) => {
        this.switchStep(response + 1)
      }
    })
  }

  switchStep(index: number){
    const step = this.steps[index];
    if(!step) return false;
    if(step.result == "Not executed") {
      step.index = index;
      this.executionService.activeStepSource.next(step)
    } else {
      this.switchStep(step.index + 1)
    }
  }

}
