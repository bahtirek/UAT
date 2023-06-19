import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { VersionComponent } from './version/version.component';
import { CreateVersionComponent } from './version/create-version/create-version.component';
import { DeleteVersionComponent } from './version/delete-version/delete-version.component';
import { EnvironmentComponent } from './environment/environment.component';
import { CreateEnvironmentComponent } from './environment/create-environment/create-environment.component';
import { DeleteEnvironmentComponent } from './environment/delete-environment/delete-environment.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'version',
        component: VersionComponent
      },
      {
        path: 'environment',
        component: EnvironmentComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    SettingsComponent,
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
  ]
})
export class SettingsModule { }
