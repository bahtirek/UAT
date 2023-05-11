import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderTreeComponent } from './folder-tree.component';
import { FolderNodeComponent } from './folder-node/folder-node.component';
import { FormsModule } from '@angular/forms';
import { MoreButtonMenuModule } from '../more-button-menu/more-button-menu.module';



@NgModule({
  declarations: [
    FolderTreeComponent,
    FolderNodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MoreButtonMenuModule
  ],
  exports: [
    FolderTreeComponent
  ]
})
export class FolderTreeModule { }
