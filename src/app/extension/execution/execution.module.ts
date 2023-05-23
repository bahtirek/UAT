import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionComponent } from './execution.component';
import { StepListComponent } from './step-list/step-list.component';
import { StepComponent } from './step/step.component';
import { RouterModule, Routes } from '@angular/router';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { EditorModule } from '../editor/editor.module';

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
    StepComponent,
    ScreenshotComponent
  ],
  imports: [
    CommonModule,
    MoreButtonMenuModule,
    EditorModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ExecutionComponent
  ]
})
export class ExecutionModule { }
