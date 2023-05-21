import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorMenuComponent } from './editor-menu.component';
import { DropMenuComponent } from './drop-menu/drop-menu.component';
import { EditorCloseBtnComponent } from './editor-close-btn/editor-close-btn.component';
import { SaveBtnComponent } from './save-btn/save-btn.component';



@NgModule({
  declarations: [
    EditorMenuComponent,
    DropMenuComponent,
    EditorCloseBtnComponent,
    SaveBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditorMenuComponent
  ]
})
export class EditorMenuModule { }
