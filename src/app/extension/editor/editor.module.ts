import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectangleComponent } from './rectangle/rectangle.component';
import { CircleComponent } from './circle/circle.component';
import { TextComponent } from './text/text.component';
import { LineComponent } from './line/line.component';
import { HighlightComponent } from './highlight/highlight.component';
import { EditorMenuModule } from './editor-menu/editor-menu.module';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor.component';
import { LineBtnComponent } from './editor-menu/menu-btns/line-btn/line-btn.component';
import { SquareBtnComponent } from './editor-menu/menu-btns/square-btn/square-btn.component';
import { CircleBtnComponent } from './editor-menu/menu-btns/circle-btn/circle-btn.component';
import { HighlightBtnComponent } from './editor-menu/menu-btns/highlight-btn/highlight-btn.component';
import { TextBtnComponent } from './editor-menu/menu-btns/text-btn/text-btn.component';
import { SaveBtnComponent } from './editor-menu/menu-btns/save-btn/save-btn.component';
import { CloseBtnComponent } from './editor-menu/menu-btns/close-btn/close-btn.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
  }
];

@NgModule({
  declarations: [
    RectangleComponent,
    CircleComponent,
    TextComponent,
    LineComponent,
    HighlightComponent,
    EditorComponent,
    LineBtnComponent,
    SquareBtnComponent,
    CircleBtnComponent,
    LineBtnComponent,
    HighlightBtnComponent,
    TextBtnComponent,
    SaveBtnComponent,
    CloseBtnComponent
  ],
  imports: [
    CommonModule,
    EditorMenuModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }
