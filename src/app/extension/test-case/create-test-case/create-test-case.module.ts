import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTestCaseComponent } from './create-test-case.component';
import { CaseStepsComponent } from './case-steps/case-steps.component';
import { CaseTitleComponent } from './case-title/case-title.component';
import { CreateStepComponent } from './case-steps/create-step/create-step.component';
import { DeleteStepComponent } from './case-steps/delete-step/delete-step.component';
import { ImportStepsComponent } from './case-steps/import-steps/import-steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCaseTitleComponent } from './case-title/create-case-title/create-case-title.component';
import { SearchTestCaseModule } from 'src/app/shared/search-test-case/search-test-case.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { ReviewStepsModule } from 'src/app/shared/review-steps/review-steps.module';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';


@NgModule({
  declarations: [
    CreateTestCaseComponent,
    CaseStepsComponent,
    CaseTitleComponent,
    CreateStepComponent,
    DeleteStepComponent,
    ImportStepsComponent,
    CreateCaseTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchTestCaseModule,
    RouterModule,
    ModalModule,
    ReviewStepsModule,
    MoreButtonMenuModule
  ],
  exports: [
    CreateTestCaseComponent,
  ]
})


export class CreateTestCaseModule { }
