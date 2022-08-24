import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { skip } from 'rxjs';
import { match } from 'ts-pattern';
import { UserActions } from '../store/user/user.actions';
import { ToastConfig, ToastService, ToastType } from './toast.service';

enum MessageTypes {
  Success = 'success',
  Error = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private _actionListener$: ActionsSubject,
    private _toastService: ToastService
  ) {}

  public startListen(): void {
    this._actionListener$.pipe(skip(1)).subscribe(({ type }) => {
      const messageConfig = this.getMessageConfig(type);

      if (messageConfig) {
        this._toastService.show(messageConfig);
      }
    });
  }

  private getMessageConfig(action): ToastConfig {
    return match(action)
      .with(UserActions.userUpdated, () => ({
        type: ToastType.Success,
        message: 'userManage.notifications.userUpdated',
      }))
      .with(UserActions.userDeleted, () => ({
        type: ToastType.Success,
        message: 'userManage.notifications.userDeleted',
      }))
      .with(UserActions.errorOccurred, () => ({
        type: ToastType.Error,
        message: 'notifications.errorOccurred',
      }))
      .otherwise(() => null);
  }
}
