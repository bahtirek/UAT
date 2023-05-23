import { Component, OnInit, ViewChild } from '@angular/core';
import { ScreenshotService } from 'src/app/services/screenshot.service';
import { EditorComponent } from '../editor/editor.component';
import { StepComponent } from './step/step.component';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.less']
})
export class ExecutionComponent implements OnInit {
  screenshotToEdit: string;

  constructor() { }

  @ViewChild(StepComponent, {static: false}) step: StepComponent;
  isEditing: boolean = false;

  ngOnInit(): void {
    console.log('execution');

  }

  closeEditor(){
    console.log(this.isEditing);
    this.isEditing = false
    console.log(this.isEditing);

  }

  saveScreenshot(dataUrl: string){
    this.isEditing = false
    this.step.saveEditedScreenshot(dataUrl);
  }

  edit(dataUrl: string){
    this.screenshotToEdit = dataUrl;
    this.isEditing = true;
  }

}
