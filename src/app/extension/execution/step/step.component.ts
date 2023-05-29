import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExecutionHistory } from 'src/app/interfaces/execution-history.interface';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';
import  screenshotService  from 'src/app/services/screenshot';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {

  step: TestStep = {};
  isModalOn: boolean = false;
  actualResultToEdit: string;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
  ]

  @Input() executionHistory: ExecutionHistory;

  constructor(private executionService: ExecutionService) { }

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

  @Output() editScreenshot = new EventEmitter<string>();

  onScreenshotEdit(index: number){
    const dataUrl = this.step.screenshots[index];
    this.editScreenshot.emit(dataUrl);
  }

  saveEditedScreenshot(dataUrl: string){
    this.step.screenshots.push(dataUrl) ;
  }

  async getScreenshot (){
    const screenshot = await screenshotService.getScreenshot();
    this.step.screenshots.push(screenshot);
  }

  deleteScreenshot(index: number){
    this.step.screenshots.splice(index, 1);
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
    this.step.result = "Pass"
    this.executionService.nextStepSource.next(this.step.index);
  }

  toggleModal(){
    this.isModalOn = !this.isModalOn
  }

  onAction(event: string){
    switch (event) {
      case 'edit': this.editActualResults(); break;
    }
  }

}
