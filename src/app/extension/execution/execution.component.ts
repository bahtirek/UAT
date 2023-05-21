import { Component, OnInit } from '@angular/core';
import { ScreenshotService } from 'src/app/services/screenshot.service';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.less']
})
export class ExecutionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('execution');

  }

}
