import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ExtensionModule } from './extension/extension.module';
import { EditorModule } from './extension/editor/editor.module';


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
    path: 'editor',
    loadChildren: () => EditorModule
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
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
