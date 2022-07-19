import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, mergeMap } from 'rxjs';
import { ActionRequestPayload, ISearchRequest, ISearchResponse } from 'src/app/models/core';
import { IUser, IUserFilterModel } from 'src/app/models/user.model';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOAD_USERS),
      mergeMap((payload: ActionRequestPayload<ISearchRequest<IUserFilterModel>>) =>
        of({
          items: [
            {
              id: 0,
              email: 'john@email.com',
              name: 'John',
              blocked: false,
              date: new Date(),
            },
          ],
          totalCount: 1,
        } as ISearchResponse<IUser>).pipe(
          map((users) => ({
            type: UserActions.USERS_LOADED,
            data: users,
          })),
          catchError(() => of({ type: UserActions.ERROR_OCCURED }))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
