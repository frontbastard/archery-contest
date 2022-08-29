import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomMatPaginatorIntl } from 'src/app/material/customization/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEffects } from 'src/app/store/user/user.effects';
import { userFeatureKey, userReducer } from 'src/app/store/user/user.reducer';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { UserManageRouterComponent } from './user-manage-router.component';
import { UserManageRoutingModule } from './user-manage-routing.module';

@NgModule({
  declarations: [
    UserManageDetailsComponent,
    UserManageListComponent,
    UserManageRouterComponent,
  ],
  imports: [
    CommonModule,
    UserManageRoutingModule,
    SharedModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
    { provide: TRANSLOCO_SCOPE, useValue: 'userManage' },
  ],
})
export class UserManageModule {}
