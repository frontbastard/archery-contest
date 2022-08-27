import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsContestStateLoading } from 'src/app/store/contest/contest.selectors';
import { ContestState } from 'src/app/store/contest/contest.state';

@Component({
  selector: 'app-contest-router',
  templateUrl: './contest-router.component.html',
})
export class ContestRouterComponent implements OnInit {
  public selectIsContestStateLoading$: Observable<boolean>;

  constructor(
    private _store: Store<ContestState>,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectIsContestStateLoading$ = this._store.select(
      selectIsContestStateLoading
    );
    this._cdr.detectChanges();
  }
}
