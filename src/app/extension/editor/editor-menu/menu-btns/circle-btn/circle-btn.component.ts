import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-circle-btn',
  templateUrl: './circle-btn.component.html',
  styleUrls: ['./circle-btn.component.less']
})
export class CircleBtnComponent implements OnInit {

  constructor(private editorService: EditorService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-circle-button";

  ngOnInit(): void {
    this.editorService.activeBtnSubject.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
      }
    )
  }

  onMenuBtnClick () {
    this.editorService.activeBtnSubject.next(this.currentBtn);
  }

}
