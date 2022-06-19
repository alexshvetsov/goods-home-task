import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PriceListService } from '../services/price-list-service/price-list.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {


  constructor(private priceListService:PriceListService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => event,
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.priceListService.setErrorMsg(error.error.error);
            return error;
          }
          return error;
        }
      )
    );
  }

}
