import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { ProductModule } from './product/product.module';
import { BrowsersComponent } from './browsers/browsers.component';
import { CreateBrowserComponent } from './browsers/create-browser/create-browser.component';
import { DeleteBrowserComponent } from './browsers/delete-browser/delete-browser.component';
import { DevicesComponent } from './devices/devices.component';
import { CreateDeviceComponent } from './devices/create-device/create-device.component';
import { DeleteDeviceComponent } from './devices/delete-device/delete-device.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'product',
        loadChildren: () => ProductModule
      },
      {
        path: 'browsers',
        component: BrowsersComponent
      },
      {
        path: 'devices',
        component: DevicesComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    SettingsComponent,
    BrowsersComponent,
    CreateBrowserComponent,
    DeleteBrowserComponent,
    DevicesComponent,
    CreateDeviceComponent,
    DeleteDeviceComponent,
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
