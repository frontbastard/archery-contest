import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserManageComponent } from './user-manage.component';
import { RouteParams } from 'src/app/common/routes';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserManageComponent,
  },
  {
    path: `:${RouteParams.ID}`,
    component: UserManageDetailsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManageRoutingModule {}
