import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseWrapper } from 'src/app/models/base/response-wrapper';
import { AcErrorCode } from 'src/app/models/common/ac-error-code';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  //   constructor(private toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((httpEvent: HttpEvent<ResponseWrapper>) => {
        if (
          httpEvent.type === HttpEventType.Response &&
          this.isApiResponse(httpEvent.body)
        ) {
          const response = httpEvent.body;

          if (response.success) {
            httpEvent = httpEvent.clone({ body: response.data });
          } else {
            //
          }
        }

        return httpEvent;
      })
    );
  }

  private isApiResponse(value: any): boolean {
    return Object.keys({} as ResponseWrapper).every(v =>
      Object.keys(value).includes(v)
    );
  }

  private handleError(response: ResponseWrapper): void {
    const translationPath = `errors.${AcErrorCode[response.errorCode]}`;
    // this.toastService.show(translationPath);
  }
}
