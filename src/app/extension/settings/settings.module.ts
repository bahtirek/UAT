import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { MoreButtonMenuModule } from 'src/app/shared/more-button-menu/more-button-menu.module';
import { BrowsersComponent } from './browsers/browsers.component';
import { CreateBrowserComponent } from './browsers/create-browser/create-browser.component';
import { DeleteBrowserComponent } from './browsers/delete-browser/delete-browser.component';
import { DevicesComponent } from './devices/devices.component';
import { CreateDeviceComponent } from './devices/create-device/create-device.component';
import { DeleteDeviceComponent } from './devices/delete-device/delete-device.component';
import { UsersModule } from './users/users.module';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { EnvironmentComponent } from './environment/environment.component';
import { CreateEnvironmentComponent } from './environment/create-environment/create-environment.component';
import { DeleteEnvironmentComponent } from './environment/delete-environment/delete-environment.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'project',
        component: ProjectsComponent
      },
      {
        path: 'users',
        loadChildren: () => UsersModule
      },
      {
        path: 'browsers',
        component: BrowsersComponent
      },
      {
        path: 'devices',
        component: DevicesComponent
      },
      {
        path: 'environments',
        component: EnvironmentComponent
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
    ProjectsComponent,
    CreateProjectComponent,
    DeleteProjectComponent,
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
