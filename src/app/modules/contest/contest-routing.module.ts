import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParams } from 'src/app/common/routes';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestRouterComponent } from './contest-router.component';

const routes: Routes = [
  {
    path: '',
    component: ContestRouterComponent,
    children: [
      {
        path: '',
        component: ContestListComponent,
      },
      {
        path: `:${RouteParams.Id}`,
        component: ContestDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestRoutingModule {}
