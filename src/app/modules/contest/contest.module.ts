import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestRouterComponent } from './contest-router.component';
import { ContestRoutingModule } from './contest-routing.module';

@NgModule({
  declarations: [
    ContestRouterComponent,
    ContestDetailsComponent,
    ContestListComponent,
  ],
  imports: [CommonModule, SharedModule, ContestRoutingModule],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'contest' }],
})
export class ContestModule {}
