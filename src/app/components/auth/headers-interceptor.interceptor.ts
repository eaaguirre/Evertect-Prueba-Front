import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError,throwError as obervableThrowError} from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HeadersInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const  token = this.authService.getToken();


     const requestnew = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });


    return next.handle(requestnew).pipe(
      catchError((err,caught)=>{
        if(err.status===401){
          this.router.navigate(['/login']),
          {
            queryParams:{
              redirectUrl: this.router.routerState.snapshot.url
            },
          }}
          return obervableThrowError(() => err);
          })
    );
  }
}
