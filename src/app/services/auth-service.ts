import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccessToken, LoginRequest, LoginResponse } from '../interfaces/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})


export class AuthService {
  constructor(private http:HttpClient, private cookies:CookieService,){}
  private readonly baseUrl = 'http://localhost:3000'

  storeTokens(accessToken:string, refreshToken:string){
  const accessExpires = new Date(Date.now() + 60 * 60 * 1000);         
  const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  this.cookies.set("accessToken", accessToken,{expires:accessExpires, path:"/",sameSite: "Lax"});
  this.cookies.set("refreshToken", refreshToken, {expires:refreshExpires,path:"/",sameSite:"Lax"})
  }

  getDecodedAccessToken(){
    const token = this.cookies.get("accessToken")
    if (!token) return null;
    const decoded:AccessToken =jwtDecode(token)
    return decoded
  }

  getAuthToken(){
    const token = this.cookies.get("accessToken")
    return token
  }

  login(obj:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`,obj)
  }
  


}
