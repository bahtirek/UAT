import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UsersDashComponent } from './users-dash/users-dash.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchUserModule } from 'src/app/shared/search-user/search-user.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersDashComponent
      },
      {
        path: 'details',
        component: UserDetailsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    UserDetailsComponent,
    CreateUserComponent,
    DeleteUserComponent,
    UsersDashComponent
  ],
  imports: [
    CommonModule,
    SearchUserModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class UsersModule { }
