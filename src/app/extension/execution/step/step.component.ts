import { Component, OnInit } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ScreenshotService } from 'src/app/services/screenshot.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {

  step: TestStep;

  constructor(private screenshotService: ScreenshotService) { }

  ngOnInit(): void {
  }

  async getScreenshot (){
    const screenshot = this.screenshotService.getScreenshot();
    console.log('screenshot', screenshot);

  }

}
