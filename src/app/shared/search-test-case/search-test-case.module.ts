import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTestCaseComponent } from './search-test-case.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchTestCaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchTestCaseComponent
  ]
})
export class SearchTestCaseModule { }
