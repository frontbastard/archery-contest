import { Observable } from 'rxjs';

export class ActionRequestPayload<T> {
  constructor(
    public data: T,
    public cancellationObservable: Observable<void>
  ) {}
}
