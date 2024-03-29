import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ToasterService } from "../shared/toaster/toaster.service";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToasterService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      /* retry(2), */
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          // 401 should be handled in auth.interceptor
          this.router.navigate(['/'], { skipLocationChange: true });
        } else {
          this.toastr.show('error', 'Sorry!', 'Something went wrong. Please try later. ')
        }
        return throwError(error);
      })
    );
  }
}
