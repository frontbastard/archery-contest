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
    cancellecionSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url, data);
    let request = this.httpClient.get<T>(requestUrl);
    request = this.tryApplyCancellacionSubject(request, cancellecionSubject);
    return request;
  }
  public post<T>(
    url: string,
    data?: Object,
    cancellecionSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url);
    let request = this.httpClient.post<T>(requestUrl, data);
    request = this.tryApplyCancellacionSubject(request, cancellecionSubject);
    return request;
  }
  public put<T>(
    url: string,
    data?: Object,
    cancellecionSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url);
    let request = this.httpClient.put<T>(requestUrl, data);
    request = this.tryApplyCancellacionSubject(request, cancellecionSubject);
    return request;
  }
  public delete<T>(
    url: string,
    data?: Object,
    cancellecionSubject?: Observable<void>
  ): Observable<T> {
    const requestUrl = this.combineCompleteUrl(url, data);
    let request = this.httpClient.delete<T>(requestUrl);
    request = this.tryApplyCancellacionSubject(request, cancellecionSubject);
    return request;
  }

  private tryApplyCancellacionSubject<T>(
    request: Observable<T>,
    cancellecionSubject?: Observable<void>
  ): Observable<T> {
    if (cancellecionSubject) {
      return request.pipe(takeUntil(cancellecionSubject));
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
