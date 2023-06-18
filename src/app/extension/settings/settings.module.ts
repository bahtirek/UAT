import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';

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
    SettingsComponent,
    ProductComponent,
    ProductDetailsComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingsModule { }
