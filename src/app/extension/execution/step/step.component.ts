import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ExecutionService } from 'src/app/services/execution.service';
import { ScreenshotService } from 'src/app/services/screenshot.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {

  step: TestStep = {};
  isModalOn: boolean = false;
  actualResultsToEdit: string;
  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
  ]

  constructor(private screenshotService: ScreenshotService, private executionService: ExecutionService) { }

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
    const screenshot = await this.screenshotService.getScreenshot();
    this.step.screenshots.push(screenshot);
  }

  deleteScreenshot(index: number){
    this.step.screenshots.splice(index, 1);
  }

  editActualResults(){
    this.actualResultsToEdit = this.step.actualResults;
    this.toggleModal();
  }

  saveActualResults(actualResults: string){
    this.step.actualResults = actualResults;
    this.step.status = 1;
    this.actualResultsToEdit = '';
    this.toggleModal();
  }

  onFail(){
    if(this.step.actualResults) {
      this.editActualResults();
    } else {
      this.toggleModal();
    }
  }

  onPass(){
    this.step.status = 0
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
