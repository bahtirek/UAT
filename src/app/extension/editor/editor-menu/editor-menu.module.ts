import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorMenuComponent } from './editor-menu.component';


@NgModule({
  declarations: [
    EditorMenuComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditorMenuComponent
  ]
})
export class EditorMenuModule { }
