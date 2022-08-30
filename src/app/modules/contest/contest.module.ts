import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomMatPaginatorIntl } from 'src/app/material/customization/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContestEffects } from 'src/app/store/contest/contest.effects';
import {
  contestFeatureKey,
  contestReducer,
} from 'src/app/store/contest/contest.reducer';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestRouterComponent } from './contest-router.component';
import { ContestRoutingModule } from './contest-routing.module';

@NgModule({
  declarations: [
    ContestRouterComponent,
    ContestListComponent,
    ContestDetailsComponent,
  ],
  imports: [
    CommonModule,
    ContestRoutingModule,
    SharedModule,
    StoreModule.forFeature(contestFeatureKey, contestReducer),
    EffectsModule.forFeature([ContestEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
    { provide: TRANSLOCO_SCOPE, useValue: 'contest' },
  ],
})
export class ContestModule {}
