import { Component, OnInit } from '@angular/core';
import { TestStep } from 'src/app/interfaces/test-step.interface';
import { ScreenshotService } from 'src/app/services/screenshot.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {

  step: TestStep = {};

  constructor(private screenshotService: ScreenshotService) { }

  ngOnInit(): void {
    this.step.screenshots = []
  }

  async getScreenshot (){
    const screenshot = await this.screenshotService.getScreenshot();
    this.step.screenshots.push(screenshot) ;
  }

  deleteScreenshot(index: number){
    this.step.screenshots.splice(index, 1);
  }

}
