import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ISearchResponse } from '../models/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: ISearchResponse<IUser> = {
      totalCount: 7,
      items: [
        {
          id: 0,
          email: 'john@email.com',
          name: 'John',
          blocked: false,
          date: new Date(),
        },
        {
          id: 1,
          email: 'steave@email.com',
          name: 'Steave',
          blocked: false,
          date: new Date(),
        },
        {
          id: 2,
          email: 'mike@email.com',
          name: 'Mike',
          blocked: false,
          date: new Date(),
        },
        {
          id: 3,
          email: 'george@email.com',
          name: 'George Washington Junior',
          blocked: false,
          date: new Date(),
        },
        {
          id: 4,
          email: 'ivan@email.com',
          name: 'Ivan',
          blocked: true,
          date: new Date(),
        },
        {
          id: 5,
          email: 'hrystyna@email.com',
          name: 'Hrystyna',
          blocked: false,
          date: new Date(),
        },
        {
          id: 6,
          email: 'alyona@email.com',
          name: 'Alyona',
          blocked: true,
          date: new Date(),
        },
      ],
    };
    return { users };
  }
}
