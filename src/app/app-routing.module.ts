import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { ExtensionModule } from './extension/extension.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'extension',
    pathMatch: 'full'
  },
  {
    path: 'extension',
    loadChildren: () => ExtensionModule,
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: "**",
    redirectTo: "extension",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
