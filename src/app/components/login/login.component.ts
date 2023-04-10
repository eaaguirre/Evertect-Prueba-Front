import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message/message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
  hide = true;
  loginError='';
  loginForm!: FormGroup
  constructor(private  fb:FormBuilder,
     private authService:AuthService,     private router: Router,
     private message:MessageComponent,)

              {}
  ngOnInit(): void {
    this.builderLoginForm();

  }

builderLoginForm(): void{
  this.loginForm= this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
  });
}

  login(submmitedForm:FormGroup){

    this.authService.login(submmitedForm.value.email,submmitedForm.value.password).subscribe ({
      complete:() => {
        this.router.navigate(['/person']);
      },
      error: (error) =>{
        this.message.showToastFailed(error);
        this.loginError = error;
      }

  });

}
}
