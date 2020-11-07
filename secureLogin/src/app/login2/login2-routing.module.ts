import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login2Page } from './login2.page';

const routes: Routes = [
  { path: '', component: Login2Page },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'users/:id', loadChildren: './user/user.module#UserPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Login2PageRoutingModule {}
