import { Injectable } from '@angular/core';
import { UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageComponent } from '../message/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService:AuthService,private router: Router,private message:MessageComponent){

  }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.getToken()==null) {
      this.message.showToastInfo('Please Log In!');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }



}
