import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACRoutes } from './common/routes';

const routes: Routes = [
  {
    path: ACRoutes.ManageUsers,
    loadChildren: () =>
      import('src/app/modules/user-manage/user-manage.module').then(
        (mod) => mod.UserManageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
