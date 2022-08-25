import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { User, UserFilterModel } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this.userApiService.getById(data, cancellationObservable).pipe(
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
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(
        ({
          data,
          cancellationObservable,
        }: ActionRequestPayload<SearchRequest<UserFilterModel>>) =>
          this.userApiService.search(data, cancellationObservable).pipe(
            map(users => ({
              type: UserActions.usersLoaded,
              data: users,
            })),
            catchError(() => of({ type: UserActions.errorOccurred }))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(
        ({ data, cancellationObservable }: ActionRequestPayload<string>) =>
          this.userApiService.delete(data, cancellationObservable).pipe(
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
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ data, cancellationObservable }: ActionRequestPayload<User>) =>
        this.userApiService.update(data._id, data, cancellationObservable).pipe(
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
    private actions$: Actions,
    private userApiService: UserApiService
  ) {}
}
