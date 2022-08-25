import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { UserRole } from 'src/app/common/user-roles';
import { getEnumNames } from 'src/app/common/utils';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { User } from 'src/app/models/user.model';
import { LocaleService } from 'src/app/services/locale.service';
import { loadUser, updateUser } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selectors';

@UntilDestroy()
@Component({
  selector: 'app-user-manage-details',
  templateUrl: './user-manage-details.component.html',
  styleUrls: ['./user-manage-details.component.scss'],
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

  constructor(
    public localeService: LocaleService,
    private _route: ActivatedRoute,
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group(this.controls);

    this._store.select(selectUser).subscribe(user => {
      if (user === null) {
        const userID = this._route.snapshot.paramMap.get('id');
        this._loadUser(userID);
        return;
      }

      this.form.setValue({
        name: user.name,
        email: user.email,
        role: user.role,
        blocked: user.blocked,
      });

      this.user = { ...user };
    });
  }

  public submitted(): void {
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
    this.form.setValue({
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
      blocked: this.user.blocked,
    });

    this._goBack();
  }

  public userStatusClass(): string {
    return this.user.blocked ? 'blocked' : 'active';
  }

  private _loadUser(id: string): void {
    this._store.dispatch(
      loadUser({
        data: id,
      } as ActionRequestPayload<string>)
    );
  }

  private _goBack() {
    this.tabIndex = 0;
  }
}
