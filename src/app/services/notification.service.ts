import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActionsSubject } from '@ngrx/store';
import { skip } from 'rxjs';
import { match } from 'ts-pattern';
import { SnackBarComponent } from '../material/customization/snack-bar/snack-bar.component';
import { UserActions } from '../store/user/user.actions';

enum MessageTypes {
  Success = 'success',
  Error = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {//TODO: ти не розбив цей сервіс на 2: 1 - notification, 2 - message
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(
    private _actionListener$: ActionsSubject,
    private _snackBar: MatSnackBar
  ) {}

  public startListen(): void {
    this._actionListener$.pipe(skip(1)).subscribe(({ type }) => {
      const messageConfig = this.getMessageConfig(type);

      if (messageConfig) {
        this.openSnackBar(messageConfig);
      }
    });
  }

  private openSnackBar({ type, message }) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      ...this.snackBarConfig,
      panelClass: type,
      data: message,
    });
  }

  private getMessageConfig(action) {
    return match(action)
      .with(UserActions.userUpdated, () => ({
        type: MessageTypes.Success,
        message: 'userManage.notifications.userUpdated',
      }))
      .with(UserActions.userDeleted, () => ({
        type: MessageTypes.Success,
        message: 'userManage.notifications.userDeleted',
      }))
      .with(UserActions.errorOccurred, () => ({
        type: MessageTypes.Error,
        message: 'notifications.errorOccurred',
      }))
      .otherwise(() => null);
  }
}
