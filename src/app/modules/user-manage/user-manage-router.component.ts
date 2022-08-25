import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsUserStateLoading } from 'src/app/store/user/user.selectors';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-user-manage-router',
  templateUrl: './user-manage-router.component.html',
})
export class UserManageRouterComponent implements OnInit {
  public selectIsUserStateLoading$: Observable<boolean>;

  constructor(
    private _store: Store<UserState>,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectIsUserStateLoading$ = this._store.select(
      selectIsUserStateLoading
    );
    this._cdr.detectChanges();
  }
}
