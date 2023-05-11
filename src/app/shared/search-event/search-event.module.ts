import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEventComponent } from './search-event.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchEventComponent
  ]
})
export class SearchEventModule { }
