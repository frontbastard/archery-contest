import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageRoutingModule } from './user-manage-routing.module';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';
import { UserManageComponent } from './user-manage.component';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from 'src/app/store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/user/user.effects';

@NgModule({
  declarations: [
    UserManageDetailsComponent,
    UserManageComponent,
    UserManageListComponent,
    UserManageDetailsComponent,
  ],
  imports: [
    CommonModule,
    UserManageRoutingModule,
    SharedModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(userFeatureKey, userReducer),
  ],
})
export class UserManageModule {}
