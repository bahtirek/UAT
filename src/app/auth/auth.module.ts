import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { 
    path: '', 
    component: AuthComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent
          },
          {
            path: 'registration',
            component: RegistrationComponent
          },
        ]
      }
    ] 
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
