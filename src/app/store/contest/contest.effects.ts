import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ContestRoutes } from 'src/app/common/routes';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { ActionResponsePayload } from 'src/app/models/base/action-response-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { Contest, ContestFilterModel } from 'src/app/models/contest.model';
import { ContestApiService } from 'src/app/services/api/contest-api.service';
import { ContestActions } from './contest.actions';
import { selectContest } from './contest.selectors';

@Injectable()
export class ContestEffects {
  addContest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.addContest),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<Contest>) =>
          this._contestApiService.create(data, cancellationObservable).pipe(
            map(data => ({
              type: ContestActions.contestAdded,
              data,
            })),
            catchError(() => of({ type: ContestActions.errorOccurred }))
          )
      )
    )
  );

  preloadContest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.preloadContest),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this._contestApiService.getById(data, cancellationObservable).pipe(
            map(data => ({
              type: ContestActions.contestPreloaded,
              data,
            })),
            catchError(() => of({ type: ContestActions.errorOccurred }))
          )
      )
    )
  );

  contestPreloaded$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(ContestActions.contestPreloaded),
        tap(({ data }: ActionResponsePayload<Contest>) => {
          this._router.navigate([ContestRoutes.Root, data._id]);
        })
      ),
    { dispatch: false }
  );

  loadContest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.loadContest),
      withLatestFrom(this._store.select(selectContest)),
      switchMap(
        ([{ data, cancellationObservable }, state]: [
          ActionRequestPayload<string>,
          Contest
        ]) => {
          if (state !== null && state._id === data) {
            return of({
              type: ContestActions.contestLoaded,
              data: state,
            });
          }

          return this._contestApiService
            .getById(data, cancellationObservable)
            .pipe(
              map(data => ({
                type: ContestActions.contestLoaded,
                data,
              })),
              catchError(() => of({ type: ContestActions.errorOccurred }))
            );
        }
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

  updateContest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.updateContest),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<Contest>) =>
          this._contestApiService
            .update(data._id, data, cancellationObservable)
            .pipe(
              map(data => ({
                type: ContestActions.contestUpdated,
                data,
              })),
              catchError(() => of({ type: ContestActions.errorOccurred }))
            )
      )
    )
  );

  deleteContest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ContestActions.deleteContest),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this._contestApiService.delete(data, cancellationObservable).pipe(
            map(data => ({
              type: ContestActions.contestDeleted,
              data,
            })),
            catchError(() => of({ type: ContestActions.errorOccurred }))
          )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _contestApiService: ContestApiService,
    private _router: Router,
    private _store: Store
  ) {}
}
