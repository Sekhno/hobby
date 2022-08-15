import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {SnackbarService} from "../_services/snackbar.service";

const ERROR_ACTION = 'Error';
const CLOSE_ACTION = 'Close';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
  constructor(
    private _snackbar: SnackbarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        console.log('error', error)
        // if (error.error instanceof ErrorEvent) {
        //   console.log('this is client side error');
        //   errorMsg = `Error: ${error.error.message}`;
        // }
        // else {
        //   console.log('this is server side error');
        //   errorMsg = `Message: ${error.error.detail.message}`;
        // }
        // this._snackbar.openSnackBar(errorMsg, CLOSE_ACTION);
        return throwError(() => errorMsg);
      })
    )
  }
}
