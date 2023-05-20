import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionComponent } from './execution.component';
import { StepListComponent } from './step-list/step-list.component';
import { StepComponent } from './step/step.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExecutionComponent,
  }
];

@NgModule({
  declarations: [
    ExecutionComponent,
    StepListComponent,
    StepComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ExecutionComponent
  ]
})
export class ExecutionModule { }
