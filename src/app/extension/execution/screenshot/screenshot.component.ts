import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoreButtonAction } from 'src/app/interfaces/more-button-action.interface';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.less']
})
export class ScreenshotComponent implements OnInit {

  constructor() { }

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
  }

  @Input() screenshot: string;
  //@Input() index: number;

  @Output() deleteScreenshot = new EventEmitter<void>()

  onAction(event: string){
    switch (event) {
      case 'edit': this.onEdit(); break;
      case 'delete': this.onDelete(); break;
    }
  }
  onEdit() {
    throw new Error('Method not implemented.');
  }
  onDelete() {
    this.deleteScreenshot.emit()
  }

}
