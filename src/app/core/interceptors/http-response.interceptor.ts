import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, takeLast } from 'rxjs';
import { ResponseWrapper } from 'src/app/models/base/response-wrapper';
import { AcErrorCode } from 'src/app/models/common/ac-error-code';
import { ToastService, ToastType } from 'src/app/services/toast.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private _toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      takeLast(1),
      map((httpEvent: HttpEvent<ResponseWrapper>) => {
        if (
          httpEvent.type === HttpEventType.Response &&
          this.isApiResponse(httpEvent.body)
        ) {
          const response = httpEvent.body;

          if (response.success) {
            httpEvent = httpEvent.clone({ body: response.data });
          } else {
            this.handleError(response);
          }
        }

        return httpEvent;
      })
    );
  }

  private isApiResponse(value: any): boolean {
    return ['data', 'success', 'errorCode', 'error'].every(v =>
      Object.keys(value).includes(v)
    );
  }

  private handleError(response: ResponseWrapper): void {
    const errorCode =
      AcErrorCode[response.errorCode || AcErrorCode.UnexpectedError];
    const translationPath = `enums.AcErrorCode.${errorCode}`;
    const config = {
      type: ToastType.Error,
      message: translationPath,
    };
    this._toastService.show(config);
  }
}
