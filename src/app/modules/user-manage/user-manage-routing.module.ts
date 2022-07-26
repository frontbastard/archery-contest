import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteParams } from 'src/app/common/routes';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';
import { UserManageRouterComponent } from './user-manage-router.component';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserManageRouterComponent,
    children: [
      {
        path: '',
        component: UserManageListComponent,
      },
      {
        path: `:${RouteParams.ID}`,
        component: UserManageDetailsComponent,
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
