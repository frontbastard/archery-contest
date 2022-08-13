import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModelChangeDebouncedDirective } from 'src/app/directives/ng-model-change-debounced.directive';
import { CustomMatPaginatorIntl } from 'src/app/material/customization/paginator';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEffects } from 'src/app/store/user/user.effects';
import { userFeatureKey, userReducer } from 'src/app/store/user/user.reducer';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { UserManageDetailsComponent } from './user-manage-details/user-manage-details.component';
import { UserManageListComponent } from './user-manage-list/user-manage-list.component';
import { UserManageRouterComponent } from './user-manage-router.component';
import { UserManageRoutingModule } from './user-manage-routing.module';

@NgModule({
  declarations: [
    UserManageDetailsComponent,
    UserManageListComponent,
    UserManageDetailsComponent,
    UserManageRouterComponent,
    NgModelChangeDebouncedDirective,
    DialogDeleteUserComponent,
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
