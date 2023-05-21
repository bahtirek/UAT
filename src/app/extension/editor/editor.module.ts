import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectangleComponent } from './rectangle/rectangle.component';
import { CircleComponent } from './circle/circle.component';
import { TextComponent } from './text/text.component';
import { LineComponent } from './line/line.component';
import { HighlightComponent } from './highlight/highlight.component';
import { EditorMenuModule } from './editor-menu/editor-menu.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EditorMenuModule
  ],
  exports: [
  ]
})
export class EditorModule { }
