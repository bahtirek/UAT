import { Component, Input, OnInit } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';

@Component({
  selector: 'app-step-details',
  templateUrl: './step-details.component.html',
  styleUrls: ['./step-details.component.less']
})
export class StepDetailsComponent implements OnInit {

  constructor(private executionService: ExecutionService) { }

  activeStep: TestStep

  ngOnInit(): void {
    this.executionService.activeStepSource.subscribe({
      next: (response) => {
        this.activeStep = response;
      }
    })
  }

  @Input() step: TestStep
  @Input() index: number;

  chooseStep(){
    this.step.index = this.index;
    this.executionService.activeStepSource.next(this.step);
  }

}
