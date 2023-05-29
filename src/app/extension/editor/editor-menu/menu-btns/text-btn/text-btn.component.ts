import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-text-btn',
  templateUrl: './text-btn.component.html',
  styleUrls: ['./text-btn.component.less']
})
export class TextBtnComponent implements OnInit {

  constructor(private editorService: EditorService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-text-button";

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
