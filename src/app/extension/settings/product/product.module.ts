import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ProductComponent } from './product/product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { VersionComponent } from './version/version.component';
import { CreateVersionComponent } from './version/create-version/create-version.component';
import { DeleteVersionComponent } from './version/delete-version/delete-version.component';
import { EnvironmentComponent } from './environment/environment.component';
import { CreateEnvironmentComponent } from './environment/create-environment/create-environment.component';
import { DeleteEnvironmentComponent } from './environment/delete-environment/delete-environment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductComponent
      },
      {
        path: 'details',
        component: ProductDetailsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    DeleteProductComponent,
    VersionComponent,
    CreateVersionComponent,
    DeleteVersionComponent,
    EnvironmentComponent,
    CreateEnvironmentComponent,
    DeleteEnvironmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    MoreButtonMenuModule,
    RouterModule.forChild(routes),
  ],
  exports: [

  ]
})
export class ProductModule { }
