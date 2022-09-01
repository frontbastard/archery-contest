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
import { UserRoutes } from 'src/app/common/routes';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { ActionResponsePayload } from 'src/app/models/base/action-response-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { User, UserFilterModel } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/api/user-api.service';
import { ContestActions } from '../contest/contest.actions';
import { UserActions } from './user.actions';
import { selectUser } from './user.selectors';

@Injectable()
export class UserEffects {
  preloadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.preloadUser),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this._userApiService.getById(data, cancellationObservable).pipe(
            map(data => ({
              type: UserActions.userPreloaded,
              data,
            })),
            catchError(() => of({ type: ContestActions.errorOccurred }))
          )
      )
    )
  );

  userPreloaded$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(UserActions.userPreloaded),
        tap(({ data }: ActionResponsePayload<User>) => {
          this._router.navigate([UserRoutes.Root, data._id]);
        })
      ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.preloadUser),
      withLatestFrom(this._store.select(selectUser)),
      switchMap(
        ([{ data, cancellationObservable }, state]: [
          ActionRequestPayload<string>,
          User
        ]) => {
          if (state !== null && state._id === data) {
            return of({
              type: UserActions.userPreloaded,
              data: state,
            });
          }

          return this._userApiService
            .getById(data, cancellationObservable)
            .pipe(
              map(data => ({
                type: UserActions.userPreloaded,
                data,
              })),
              catchError(() => of({ type: UserActions.errorOccurred }))
            );
        }
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(
        ({
          data,
          cancellationObservable,
        }: ActionRequestPayload<SearchRequest<UserFilterModel>>) =>
          this._userApiService.search(data, cancellationObservable).pipe(
            map(data => ({
              type: UserActions.usersLoaded,
              data,
            })),
            catchError(() => of({ type: UserActions.errorOccurred }))
          )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ data, cancellationObservable }: ActionRequestPayload<User>) =>
        this._userApiService
          .update(data._id, data, cancellationObservable)
          .pipe(
            map(data => ({
              type: UserActions.userUpdated,
              data,
            })),
            catchError(() => of({ type: UserActions.errorOccurred }))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this._userApiService.delete(data, cancellationObservable).pipe(
            map(data => ({
              type: UserActions.userDeleted,
              data,
            })),
            catchError(() => of({ type: UserActions.errorOccurred }))
          )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _userApiService: UserApiService,
    private _router: Router,
    private _store: Store
  ) {}
}
