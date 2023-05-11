import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoriesComponent } from './directories.component';
import { DirectoryComponent } from './directory/directory.component';
import { TestCaseComponent } from './test-case/test-case.component';
import { MoreButtonMenuModule } from '../more-button-menu/more-button-menu.module';



@NgModule({
  declarations: [
    DirectoriesComponent,
    DirectoryComponent,
    TestCaseComponent
  ],
  imports: [
    CommonModule,
    MoreButtonMenuModule
  ],
  exports: [
    DirectoriesComponent
  ]
})
export class DirectoriesModule { }
