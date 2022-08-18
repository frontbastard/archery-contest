import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(
    url: string,
    data?: Object,
    cancellationSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url, data);
    let request = this.httpClient.get<T>(requestUrl);
    request = this.tryApplyCancellationSubject(request, cancellationSubject);
    return request;
  }

  public post<T>(
    url: string,
    payload?: Object,
    cancellationSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url);
    let request = this.httpClient.post<T>(requestUrl, payload);
    request = this.tryApplyCancellationSubject(request, cancellationSubject);
    return request;
  }

  public put<T>(
    url: string,
    payload?: Object,
    cancellationSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url);
    let request = this.httpClient.put<T>(requestUrl, payload);
    request = this.tryApplyCancellationSubject(request, cancellationSubject);
    return request;
  }

  public delete<T>(
    url: string,
    data?: Object,
    cancellationSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url, data);
    let request = this.httpClient.delete<T>(requestUrl);
    request = this.tryApplyCancellationSubject(request, cancellationSubject);
    return request;
  }

  private tryApplyCancellationSubject<T>(
    request: Observable<T>,
    cancellationSubject?: Observable<void>
  ): Observable<T> {
    if (cancellationSubject) {
      return request.pipe(takeUntil(cancellationSubject));
    }

    return request;
  }

  private combineCompleteUrl(url: string, data: any = null): string {
    let requestData = '';

    if (data) {
      if (typeof data === 'object') {
        requestData = `?request=${encodeURIComponent(JSON.stringify(data))}`;
      } else {
        requestData = `/${data as string}`;
      }
    }

    return `${environment.apiUrl}/${url}${requestData}`;
  }
}
