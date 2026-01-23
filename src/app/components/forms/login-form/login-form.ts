import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {ReactiveFormsModule,FormBuilder,Validators,} from '@angular/forms';
import { LoginRequest } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth-service';
import { State } from '../../../services/state';
@Component({
  selector: 'app-login-form',
 imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  login;
constructor(private fb:FormBuilder, private auth:AuthService, private router:Router, private state:State){

  this.login = this.fb.nonNullable.group({
    email:this.fb.nonNullable.control("",[Validators.required, Validators.email]),
    password:this.fb.nonNullable.control("",[Validators.required])
  })
}

onLogin(){
  const obj:LoginRequest = this.login.getRawValue()
  this.auth.login(obj).subscribe(result=> {
  this.auth.storeTokens(result.tokens.accessToken, result.tokens.refreshToken);
  const token = this.auth.getDecodedAccessToken()
  if(!token){return}
  this.state.setUser(token)
  this.router.navigate(['dashboard'])
  })
  
  
}


}
