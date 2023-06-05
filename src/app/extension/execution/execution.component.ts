import { Component, OnInit, ViewChild } from '@angular/core';
import { StepComponent } from './step/step.component';
import { ExecutionService } from 'src/app/services/execution.service';
import { ExecutionHistory } from 'src/app/interfaces/execution-history.interface';
import { TestStep } from 'src/app/interfaces/test-step.interface';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.less']
})
export class ExecutionComponent implements OnInit {

  screenshotToEdit: string;
  executionHistory: ExecutionHistory;
  isEditing: boolean = false;
  steps: TestStep[];

  constructor(private executionService: ExecutionService) { }

  @ViewChild(StepComponent, {static: false}) step: StepComponent;

  ngOnInit(): void {
    const testCaseId = this.executionService.testCaseId;
    this.executionService.executeTest(testCaseId).subscribe({
      next: (response) => {
        console.log(response);
        this.executionHistory = response.testCaseExecution;
        this.steps = response.executionSteps;
      },
      error: (error) => {
        console.log(error);

      },
    })
  }

  closeEditor(){
    this.isEditing = false
  }

  saveScreenshot(blob: string){
    this.isEditing = false
    this.step.saveEditedScreenshot(blob);
  }

  edit(blob: string){
    this.screenshotToEdit = blob;
    this.isEditing = true;
  }

}
