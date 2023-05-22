import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-save-btn',
  templateUrl: './save-btn.component.html',
  styleUrls: ['./save-btn.component.less']
})
export class SaveBtnComponent implements OnInit {


  constructor(private editorService: EditorService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-save-button";

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
