import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {
  errorContent$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        // or catchError operator
        (event: HttpEvent<any>) => event,
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.setErrorContent(error.error.error);
            return error;
          }
          return error;
        }
      )
    );
  }

  getErrorContent(): Observable<string> {
    return this.errorContent$.asObservable();
  }
  setErrorContent(value: string) {
    this.errorContent$.next(value.toString());
  }
}
