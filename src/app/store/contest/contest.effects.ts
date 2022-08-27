import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { ContestFilterModel } from 'src/app/models/contest.mode';
import { ContestApiService } from 'src/app/services/api/contest-api.service';
import { ContestActions } from './contest.actions';

@Injectable()
export class ContestEffects {
  loadContest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.loadContest),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this._contestApiService.getById(data, cancellationObservable).pipe(
            map(data => ({
              type: ContestActions.contestLoaded,
              data,
            })),
            catchError(() => of({ type: ContestActions.errorOccurred }))
          )
      )
    )
  );

  loadContests$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.loadContests),
      mergeMap(
        ({
          data,
          cancellationObservable,
        }: ActionRequestPayload<SearchRequest<ContestFilterModel>>) =>
          this._contestApiService.search(data, cancellationObservable).pipe(
            map(data => ({
              type: ContestActions.contestsLoaded,
              data,
            })),
            catchError(() => of({ type: ContestActions.errorOccurred }))
          )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _contestApiService: ContestApiService
  ) {}
}
