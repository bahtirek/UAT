import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-highlight-btn',
  templateUrl: './highlight-btn.component.html',
  styleUrls: ['./highlight-btn.component.less']
})
export class HighlightBtnComponent implements OnInit {

  constructor(private editorService: EditorService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-highlight-button";

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
