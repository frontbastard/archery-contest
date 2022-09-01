import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsUserStateLoading } from 'src/app/store/user/user.selectors';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-manage-router',
  templateUrl: './user-manage-router.component.html',
})
export class UserManageRouterComponent implements OnInit {
  public selectIsUserStateLoading$: Observable<boolean>;

  constructor(private _store: Store<UserState>) {}

  ngOnInit(): void {
    this.selectIsUserStateLoading$ = this._store.select(
      selectIsUserStateLoading
    );
  }
}
