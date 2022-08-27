import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { User, UserFilterModel } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/api/user-api.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this._userApiService.getById(data, cancellationObservable).pipe(
            map(data => ({
              type: UserActions.userLoaded,
              data,
            })),
            catchError(() => of({ type: UserActions.errorOccurred }))
          )
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

  constructor(
    private _actions$: Actions,
    private _userApiService: UserApiService
  ) {}
}
