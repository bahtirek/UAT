import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchUserComponent } from './search-user.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchUserComponent
  ]
})
export class SearchUserModule { }
