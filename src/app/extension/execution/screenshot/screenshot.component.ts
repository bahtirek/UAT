import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';
import { Screenshot } from 'src/app/interfaces/screenshot.interface';
import { ExecutionService } from 'src/app/services/execution.service';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.less']
})
export class ScreenshotComponent implements OnInit {

  constructor(private executionService: ExecutionService) { }

  showImage: boolean = false;
  blob: string;

  actions: MoreButtonAction[] = [
    {
      name: 'Edit',
      action: 'edit',
      display: true
    },
    {
      name: 'Delete',
      action: 'delete',
      display: true
    },
  ]

  ngOnInit(): void {
    console.log(this.screenshot.testStepExecutionId, this.screenshot.screenshotId);

    this.executionService.getScreenshot(this.screenshot.testStepExecutionId, this.screenshot.screenshotId).subscribe({
      next: (response) => {
        this.blob = response.blob
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  @Input() screenshot: Screenshot;

  @Output() deleteScreenshot = new EventEmitter<void>()
  @Output() edit = new EventEmitter<string>()

  onAction(event: string){
    switch (event) {
      case 'edit': this.onEdit(); break;
      case 'delete': this.onDelete(); break;
    }
  }
  onEdit() {
    this.edit.emit(this.blob)
  }
  onDelete() {
    this.deleteScreenshot.emit()
  }

  toggleImage(){
    if(this.showImage) {
      this.showImage = false;
    } else {
      this.showImage = true;
    }
  }

}
