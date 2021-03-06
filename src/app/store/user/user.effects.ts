import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, mergeMap } from 'rxjs';
import {
  ActionRequestPayload,
  ISearchRequest,
} from 'src/app/models/core';
import { IUserFilterModel } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(
        ({data, cancellationObservable}: ActionRequestPayload<ISearchRequest<IUserFilterModel>>) =>
          this.userApiService.search(data, cancellationObservable).pipe(
            map((users) => ({
              type: UserActions.usersLoaded,
              data: users,
            })),
            catchError(() => of({ type: UserActions.errorOccured }))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({data, cancellationObservable}: ActionRequestPayload<number>) =>
        this.userApiService.delete(data, cancellationObservable).pipe(
          map((users) => ({
            type: UserActions.userDeleted,
            data: users,
          })),
          catchError(() => of({ type: UserActions.errorOccured }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService
  ) {}
}
