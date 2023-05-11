import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterComponent } from './toaster/toaster.component';
import { ToasterContainerComponent } from './toaster-container.component';


@NgModule({
  declarations: [
    ToasterComponent,
    ToasterContainerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    ToasterContainerComponent
  ]
})
export class ToasterModule { }
