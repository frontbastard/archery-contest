import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../material/customization/snack-bar/snack-bar.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  public show(config: ToastConfig) {
    const snackbarConfig: MatSnackBarConfig = {
      data: config.message,
      panelClass: this.getPanelClass(config.type),
      duration: config.duration || 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this._snackBar.openFromComponent(SnackBarComponent, snackbarConfig);
  }

  private getPanelClass(type: ToastType) {
    switch (type) {
      case ToastType.Success:
        return 'success';
      case ToastType.Warning:
        return 'warning';
      case ToastType.Error:
        return 'error';
      default:
        return 'info';
    }
  }
}

export enum ToastType {
  Info = 1,
  Success = 2,
  Warning = 3,
  Error = 4,
}

export interface ToastConfig {
  type: ToastType;
  message: string;
  duration?: number;
}
