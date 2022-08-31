import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParams } from 'src/app/common/routes';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { UserManageRouterComponent } from './user-manage-router.component';

const routes: Routes = [
  {
    path: '',
    component: UserManageRouterComponent,
    children: [
      {
        path: `:${RouteParams.Id}`,
        component: UserManageDetailsComponent,
      },
      {
        path: '',
        component: UserManageListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManageRoutingModule {}
