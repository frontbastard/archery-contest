import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContestRouterComponent } from './contest-router.component';
import { ContestRoutingModule } from './contest-routing.module';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestListComponent } from './contest-list/contest-list.component';

@NgModule({
  declarations: [ContestRouterComponent, ContestDetailsComponent, ContestListComponent],
  imports: [CommonModule, SharedModule, ContestRoutingModule],
})
export class ContestModule {}
