import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashRemoverPipe } from './dash-remover.pipe';

@NgModule({
  declarations: [DashRemoverPipe],
  imports: [
    CommonModule
  ],
  entryComponents: [DashRemoverPipe],
  exports: [DashRemoverPipe]
})
export class PipesModule { }
