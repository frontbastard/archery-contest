import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestRoutes, UserRoutes } from './common/routes';

const routes: Routes = [
  {
    path: UserRoutes.Root,
    loadChildren: () =>
      import('src/app/modules/user-manage/user-manage.module').then(
        mod => mod.UserManageModule
      ),
  },
  {
    path: ContestRoutes.Root,
    loadChildren: () =>
      import('src/app/modules/contest/contest.module').then(
        mod => mod.ContestModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
