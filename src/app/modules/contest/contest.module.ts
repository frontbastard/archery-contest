import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
    ContestDetailsComponent,
    ContestListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContestRoutingModule,
    StoreModule.forFeature(contestFeatureKey, contestReducer),
    EffectsModule.forFeature([ContestEffects]),
    FormsModule,
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'contest' }],
})
export class ContestModule {}
