import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PAGE_SIZE_OPTIONS } from 'src/app/common/app-constants';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { ActionResponsePayload } from 'src/app/models/base/action-response-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { SearchResponse } from 'src/app/models/base/search-response';
import { LocaleService } from 'src/app/services/locale.service';

@UntilDestroy()
@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
})
export class ContestListComponent implements OnInit {
  public readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  public result: SearchResponse<Contest> = {} as SearchResponse<Contest>;
  public request: SearchRequest<ContestFilterModel> = {
    searchTerm: null,
    sortTerm: null,
    sortAsc: '',
    pageIndex: 0,
    pageSize: PAGE_SIZE_OPTIONS[0],
    filter: {
      blocked: null,
    },
  } as SearchRequest<ContestFilterModel>;
  public contestStatuses = [
    { value: null, translationPath: 'common.all' },
    { value: true, translationPath: 'contest.fields.status.hidden' },
    { value: false, translationPath: 'contest.fields.status.active' },
  ];
  public displayedColumns: string[] = [
    'name',
    'owner',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  public get isItemsInitialized(): boolean {
    // return this.result.items !== null;
    return true; // TODO [CONTEST]
  }

  public get notFoundMessage(): string {
    // return this.searchInput.nativeElement.value.length
    //   ? 'elements.search.nothingFound'
    //   : 'common.notFound';
    return 'NOT FOUND'; // TODO [CONTEST]
  }

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    public localeService: LocaleService,
    private _store: Store<ContestState>,
    private _actions: Actions,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._actions
      .pipe(ofType(ContestActions.contestLoaded), untilDestroyed(this))
      .subscribe(({ data }: ActionResponsePayload<Contest>) => {
        this._router.navigate([data._id]);
      });

    this._store.select(selectContests).subscribe(contests => {
      this.result = contests;
    });

    this._actions
      .pipe(
        ofType(ContestActions.contestDeleted, ContestActions.contestUpdated),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this._refreshList();
      });

    this._refreshList();
  }

  public searchChanged(): void {
    if (this.request.searchTerm.length === 1) return;

    this._refreshList();
  }

  public contestStatusChanged($event): void {
    this.request.filter.blocked = $event === 'null' ? null : $event;
    this.request.pageIndex = 0;
    this._refreshList();
  }

  public paginationChanged($event: PageEvent): void {
    this.request.pageIndex = $event.pageIndex;
    this.request.pageSize = $event.pageSize;
    this._refreshList();
  }

  public sortChanged({ active, direction }) {
    this.request.sortTerm = active;
    this.request.sortAsc = direction;
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

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this._store.dispatch(
          deleteContest({
            data: id,
          } as ActionRequestPayload<string>)
        );
      }
    });
  }

  public loadContestDetails(contest: Contest) {
    this._store.dispatch(
      loadContest({
        data: contest._id,
      } as ActionRequestPayload<string>)
    );
  }

  public toggleHidden(contest: Contest): void {
    this._store.dispatch(
      updateContest({
        data: {
          ...contest,
          blocked: !contest.blocked,
        },
      } as ActionRequestPayload<Contest>)
    );
  }

  public trackByContestStatus(index: number, status) {
    return status.value;
  }

  private _refreshList(): void {
    if (
      this.result.totalCount / this.request.pageSize <=
      this.request.pageIndex
    ) {
      this.request.pageIndex = 0;
    }

    this._store.dispatch(
      loadContests({
        data: JSON.parse(JSON.stringify(this.request)),
      } as ActionRequestPayload<SearchRequest<ContestFilterModel>>)
    );
  }
}
