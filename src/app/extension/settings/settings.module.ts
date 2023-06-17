import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductModule } from './product/product.module';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ProductModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
