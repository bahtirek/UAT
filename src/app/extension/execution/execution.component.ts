import { Component, OnInit, ViewChild } from '@angular/core';
import { ScreenshotService } from 'src/app/services/screenshot.service';
import { EditorComponent } from '../editor/editor.component';
import { StepComponent } from './step/step.component';
import { ExecutionService } from 'src/app/services/execution.service';
import { ExecutionHistory } from 'src/app/interfaces/execution-history.interface';
import { TestCase } from 'src/app/interfaces/test-case.interface';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.less']
})
export class ExecutionComponent implements OnInit {
  screenshotToEdit: string;

  constructor(private executionService: ExecutionService) { }

  @ViewChild(StepComponent, {static: false}) step: StepComponent;
  isEditing: boolean = false;
  testCase: TestCase;

  ngOnInit(): void {

  }

  closeEditor(){
    this.isEditing = false
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
