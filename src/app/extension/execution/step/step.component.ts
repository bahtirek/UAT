import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ExecutionHistory } from 'src/app/interfaces/execution-history.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';
import  screenshotService  from 'src/app/services/browserScreenshot';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {

  step: TestStep = {};
  isModalOn: boolean = false;
  isPassModalOn: boolean = false;
  actualResultToEdit: string;
  caseExecutionStatus: string;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
  ]

  @Input() executionHistory: ExecutionHistory;

  @Output() editScreenshot = new EventEmitter<string>();

  constructor(private router: Router, private executionService: ExecutionService) { }

  ngOnInit(): void {
    this.executionService.activeStepSource.subscribe({
      next: (response) => {
        this.step = response;
        if(!this.step.screenshots) {
          this.step.screenshots = []
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.executionHistory.firstChange) {
      console.log(this.executionHistory);

      this.caseExecutionStatus = changes.executionHistory.currentValue.status
    }
  }

  onScreenshotEdit(blob: string){
    this.editScreenshot.emit(blob);
  }

  saveEditedScreenshot(blob: string){
    this.postScreenshot(blob)
  }

  async getScreenshot (){
    const blob = await screenshotService.getScreenshot();
    this.postScreenshot(blob);
  }

  postScreenshot(blob: string){
    this.executionService.postScreenshot(this.step.testStepExecutionId, blob).subscribe({
      next: (response) => {
        response.testStepExecutionId = this.step.testStepExecutionId;
        this.step.screenshots.push(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteScreenshot(index: number){
    const screenshot = this.step.screenshots[index]
    this.executionService.deleteScreenshot(screenshot.testStepExecutionId, screenshot.screenshotId).subscribe({
      next: (response) => {
        this.step.screenshots.splice(index, 1);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editActualResults(){
    this.actualResultToEdit = this.step.actualResult;
    this.toggleModal();
  }

  saveActualResults(actualResult: string){
    this.step.actualResult = actualResult;
    this.step.result = "Fail";
    this.actualResultToEdit = '';
    this.toggleModal();
  }

  onFail(){
    if(this.step.actualResult) {
      this.editActualResults();
    } else {
      this.toggleModal();
    }
  }

  onPass(){
    if(this.step.result == "Fail") {
      this.togglePassModal();
    } else {
      this.submitPass()
    }
  }

  submitPass(){
    const executedStep: TestStep = {testStepExecutionId: this.step.testStepExecutionId, result: 'pass', actualResult: null}
      this.executionService.patchStepResult(executedStep).subscribe({
        next: (result)=>{
          this.step.result = "Pass"
          this.executionService.nextStepSource.next(this.step.index);
        },
        error: (error)=>{
          console.log(error);
        }
      })
  }

  passFailed() {
    const executedStep: TestStep = {testStepExecutionId: this.step.testStepExecutionId, result: 'pass', actualResult: null}
      this.executionService.patchStepResult(executedStep).subscribe({
        next: (result)=>{
          this.step.actualResult = null;
          this.step.result = "Pass"
          this.executionService.nextStepSource.next(this.step.index);
          this.togglePassModal();
        },
        error: (error)=>{
          console.log(error);
        }
      })
  }

  togglePassModal() {
    this.isPassModalOn = !this.isPassModalOn
  }

  toggleModal(){
    this.isModalOn = !this.isModalOn
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.editActualResults(); break;
    }
  }

  statuses = [
    'Not executed',
    'Complete',
    'Cancel',
    'In progress'
  ]

  onStatusChange(){
    const status = this.caseExecutionStatus.replace(/\s+/g, '-').toLowerCase();
    console.log(status);

    this.executionService.patchTestCaseExecutionStatus(this.executionHistory.testCaseExecutionId, status).subscribe({
      next: (response) => {
        console.log(response);
        this.executionHistory.status = this.caseExecutionStatus;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  backToDetails(){
    const testCaseId = this.executionService.testCaseId;
    this.router.navigate([`test-case/details`], { skipLocationChange: true });
  }

}
