//<reference types="chrome"/>
import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.less']
})
export class CloseBtnComponent implements OnInit {

  constructor(private editorService: EditorService) { }

  currentBtn = "ui-br-ext-close-button";

  ngOnInit(): void {
  }

  onMenuBtnClick () {
    this.editorService.activeBtnSubject.next(this.currentBtn);
  }

}
