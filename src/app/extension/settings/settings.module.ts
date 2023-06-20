import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { ProductModule } from './product/product.module';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'product',
        loadChildren: () => ProductModule
      },
    ]
  }
];

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    MoreButtonMenuModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
