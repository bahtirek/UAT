import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentChoiceComponent } from './environment-choice.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EnvironmentChoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EnvironmentChoiceComponent
  ],
})
export class EnvironmentChoiceModule { }
