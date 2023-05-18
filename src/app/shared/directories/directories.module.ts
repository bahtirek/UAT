import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoriesComponent } from './directories.component';
import { DirectoryComponent } from './directory/directory.component';
import { TestCaseComponent } from './test-case/test-case.component';
import { MoreButtonMenuModule } from '../more-button-menu/more-button-menu.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [
    DirectoriesComponent,
    DirectoryComponent,
    TestCaseComponent,
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    MoreButtonMenuModule,
    ReactiveFormsModule,
    ModalModule
  ],
  exports: [
    DirectoriesComponent
  ]
})
export class DirectoriesModule { }
