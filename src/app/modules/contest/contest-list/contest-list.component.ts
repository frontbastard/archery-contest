import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseSearchComponent } from 'src/app/common/base/base-search.component';
import { ContestRoutes } from 'src/app/common/routes';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { Contest, ContestFilterModel } from 'src/app/models/contest.model';
import { LocaleService } from 'src/app/services/locale.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import {
  ContestActions,
  deleteContest,
  loadContests,
  preloadContest,
  updateContest,
} from 'src/app/store/contest/contest.actions';
import { selectContests } from 'src/app/store/contest/contest.selectors';
import { ContestState } from 'src/app/store/contest/contest.state';

@UntilDestroy()
@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
})
export class ContestListComponent
  extends BaseSearchComponent<Contest, ContestFilterModel>
  implements OnInit
{
  public readonly ContestRouter = ContestRoutes;
  public readonly contestStatuses = [
    { value: null, translationPath: 'common.all' },
    { value: true, translationPath: 'contest.fields.status.hidden' },
    { value: false, translationPath: 'contest.fields.status.visible' },
  ];
  public readonly displayedColumns: string[] = [
    'name',
    'owner',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  public locale = null;

  constructor(
    private _store: Store<ContestState>,
    private _localeService: LocaleService,
    private _actions: Actions,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.request.filter.hidden = null;
    this.locale = this._localeService.locale;
    this._store.select(selectContests).subscribe(contests => {
      this.result = contests;
    });

    this._actions
      .pipe(ofType(ContestActions.contestDeleted), untilDestroyed(this))
      .subscribe(() => {
        this._refreshList();
      });

    this._refreshList();
  }

  public contestStatusChanged($event): void {
    this.request.filter.hidden = $event === 'null' ? null : $event;
    this.request.pageIndex = 0;
    this._refreshList();
  }

  public deleteContestDialog(contest: Contest): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        entity: contest,
        dialog: {
          title: 'contest.dialogs.deleteContest.title',
          content: 'contest.dialogs.deleteContest.content',
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
            deleteContest({
              data: id,
            } as ActionRequestPayload<string>)
          );
        }
      });
  }

  public preloadContestDetails(contest: Contest) {
    this._store.dispatch(
      preloadContest({
        data: contest.id,
      } as ActionRequestPayload<string>)
    );
  }

  public toggleHidden(contest: Contest): void {
    this._store.dispatch(
      updateContest({
        data: {
          ...contest,
          hidden: !contest.hidden,
        },
      } as ActionRequestPayload<Contest>)
    );
  }

  public trackByContestStatus(index: number, status) {
    return status.value;
  }

  protected override _refreshList(): void {
    super._refreshList();

    this._store.dispatch(
      loadContests({
        data: JSON.parse(JSON.stringify(this.request)),
      } as ActionRequestPayload<SearchRequest<ContestFilterModel>>)
    );
  }
}
