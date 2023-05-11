import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExtensionComponent } from './extension.component';
import { ToasterModule } from '../shared/toaster/toaster.module';
import { LoaderModule } from '../shared/loader/loader.module';
import { AuthGuard } from '../guards/auth.guard';
import { DirectoriesModule } from '../shared/directories/directories.module';
import { MenuModule } from './menu/menu.module';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: ExtensionComponent,
    children: [
      {
        path: '',
        children: [
          /* {
            path: 'test-case',
            loadChildren: () => TestCaseModule,
          },
          {
            path: 'events',
            loadChildren: () => EventsModule
          },
          {
            path: 'regression',
            loadChildren: () => RegressionModule
          },
          {
            path: 'settings',
            loadChildren: () => SettingsModule
          },
          {
            path: 'execute',
            loadChildren: () => ExecuteModule
          }, */
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard', component: DashboardComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    ExtensionComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    ToasterModule,
    LoaderModule,
    DirectoriesModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ExtensionComponent
  ]

})
export class ExtensionModule { }
