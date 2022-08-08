import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageRoutingModule } from './user-manage-routing.module';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from 'src/app/store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/user/user.effects';
import { UserManageRouterComponent } from './user-manage-router.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from 'src/app/material/custom/paginator';
import { NgModelChangeDebouncedDirective } from 'src/app/directives/ng-model-change-debounced.directive';

@NgModule({
  declarations: [
    UserManageDetailsComponent,
    UserManageListComponent,
    UserManageDetailsComponent,
    UserManageRouterComponent,
    NgModelChangeDebouncedDirective,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    UserManageRoutingModule,
    SharedModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(userFeatureKey, userReducer),
    TranslocoModule,
    FormsModule,
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
