import { Injectable } from '@angular/core';
import { Contest, ContestFilterModel } from 'src/app/models/contest.mode';
import { BaseApiCrudService } from './base-api-crud.service';

@Injectable({ providedIn: 'root' })
export class ContestApiService extends BaseApiCrudService<
  string,
  Contest,
  Contest,
  void,
  Contest,
  void,
  ContestFilterModel,
  Contest
> {
  rootRoute = 'contests';
}
