import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  throwError as obervableThrowError,
} from 'rxjs';
import { IAuthStatus, IServiceAuthResponse } from 'src/app/models/response';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { transformError } from '../common/common';
import { CacheService } from './cache.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  private baseUrl = 'http://localhost:5131/api/v1/Token';

  helper = new JwtHelperService();
  defaultAuthStatus: IAuthStatus = { primarysid: '', unique_name: '' };
  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IServiceAuthResponse>;
  authstatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus')||this.defaultAuthStatus);
  constructor(private httpClient: HttpClient) {
    super();

    this.authstatus.subscribe(authstatus =>{
      this.setItem('authStatus',authstatus);
    })
    this.authProvider = this.userAuthProvider;
  }
  private userAuthProvider(
    email: string,
    password: string
  ): Observable<IServiceAuthResponse> {
    return this.httpClient.post<IServiceAuthResponse>(
      `${this.baseUrl}/GetToken`,
      { email: email, password: password }
    );
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();
    const loginReponse = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.access_Token);
        const result = this.helper.decodeToken(value.access_Token);
        return result as IAuthStatus;
      }),
      catchError(transformError)
    );
    loginReponse.subscribe({
      next: (res) => {
        this.authstatus.next(res);
      },
      error: (err) => {
        this.logout();

        return obervableThrowError(() => transformError(err));
      },
    });
    return loginReponse;
  }

  logout() {
    this.clearToken();
    this.authstatus.next(this.defaultAuthStatus);
  }
  private  setToken(token: string){
    this.setItem('token',token);
  }

  getToken():string| null{
    return  this.getItem('token') || '';
  }

  private clearToken(){
    this.removeItem('token');
  }

}
