import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionComponent } from './execution.component';
import { StepListComponent } from './step-list/step-list.component';
import { StepComponent } from './step/step.component';
import { RouterModule, Routes } from '@angular/router';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { EditorModule } from '../editor/editor.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { ActualResultComponent } from './step/actual-result/actual-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepDetailsComponent } from './step-list/step-details/step-details.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
    ScreenshotComponent,
    ActualResultComponent,
    StepDetailsComponent
  ],
  imports: [
    CommonModule,
    MoreButtonMenuModule,
    EditorModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ExecutionComponent
  ]
})
export class ExecutionModule { }
