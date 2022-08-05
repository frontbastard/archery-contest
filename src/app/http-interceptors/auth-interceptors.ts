import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    // const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      // TODO: Rework
      headers: req.headers.set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmU2ZTVlMzE1NjkyMjM1ZGRmMTJhZWUiLCJpYXQiOjE2NTk0NTQ5NjcsImV4cCI6MTY2MDA1OTc2N30.BQ7SUGyDL6T7u03bMaF7dvKe1Jz9Xhn6-Wx0ZazjFx4'
      ),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
