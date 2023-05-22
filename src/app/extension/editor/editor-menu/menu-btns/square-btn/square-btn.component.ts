import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-square-btn',
  templateUrl: './square-btn.component.html',
  styleUrls: ['./square-btn.component.less']
})
export class SquareBtnComponent implements OnInit {

  constructor(private editorService: EditorService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-square-button";

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
