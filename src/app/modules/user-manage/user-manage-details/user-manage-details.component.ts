import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { UserRoutes } from 'src/app/common/routes';
import { UserRole } from 'src/app/common/user-roles';
import { getEnumNames } from 'src/app/common/utils';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { User } from 'src/app/models/user.model';
import { LocaleService } from 'src/app/services/locale.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import {
  deleteUser,
  loadUser,
  updateUser,
} from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selectors';

@UntilDestroy()
@Component({
  selector: 'app-user-manage-details',
  templateUrl: './user-manage-details.component.html',
})
export class UserManageDetailsComponent implements OnInit {
  public user: User;
  public UserRole = UserRole;
  public readonly roles = getEnumNames(UserRole);
  public form: FormGroup;
  public controls = {
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(''),
    blocked: new FormControl(''),
  };
  public tabIndex = 0;

  public get isUserInitialized(): boolean {
    return Boolean(this.user);
  }

  public get isBlockedTranslationPath(): string {
    return this.form.value.blocked
      ? 'userManage.fields.status.blocked'
      : 'userManage.fields.status.active';
  }
  public locale = null;

  constructor(
    private _localeService: LocaleService,
    private _route: ActivatedRoute,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.locale = this._localeService.locale;
    this.form = this._formBuilder.group(this.controls);

    const userId = this._route.snapshot.paramMap.get('id');
    this._loadUser(userId);
    this._store
      .select(selectUser)
      .pipe(
        untilDestroyed(this),
        filter(x => !!x)
      )
      .subscribe(user => {
        this.form.patchValue(user);

        this.user = user;
      });
  }

  public submit(): void {
    if (this.form.invalid) return;
    this.user = {
      ...this.user,
      ...this.form.value,
    };

    this._store.dispatch(
      updateUser({
        data: this.user,
      } as ActionRequestPayload<User>)
    );
    this._goBack();
  }

  public submitCancelled(): void {
    this.form.patchValue(this.user);

    this._goBack();
  }

  public userStatusClass(): string {
    return this.user.blocked ? 'label-danger' : 'label-success';
  }

  private _loadUser(id: string): void {
    this._store.dispatch(
      loadUser({
        data: id,
      } as ActionRequestPayload<string>)
    );
  }

  public deleteUserDialog(user: User): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        entity: user,
        dialog: {
          title: 'userManage.dialogs.deleteUser.title',
          content: 'userManage.dialogs.deleteUser.content',
          actionButton: 'common.delete',
          actionButtonColor: 'warn',
        },
      },
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(id => {
        if (id) {
          this._store.dispatch(
            deleteUser({
              data: id,
            } as ActionRequestPayload<string>)
          );
          this._goToList();
        }
      });
  }

  private _goBack() {
    this.tabIndex = 0;
  }

  private _goToList() {
    this._router.navigate([UserRoutes.Root]);
  }
}
