import { Injectable, Injector,  } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
 

    constructor(private router: Router, private commonService: CommonService ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.commonService.checkNullOrUndefined(localStorage.getItem('Token'))) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
                }
            });
        }
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authLogout();
            }

            const error = err?.error?.message || err?.statusText;
            return throwError(error);
        }))
    }

    authLogout(){
        this.router.navigateByUrl('/login');
    }
}
