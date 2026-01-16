import { Injectable } from '@angular/core';
import { HostDash, User, } from '../interfaces/userstate';
import { AccessToken } from '../interfaces/auth';
import { BehaviorSubject } from 'rxjs';

 enum UserRole {
  Host = 'host',
  Vendor = 'vendor',
  Attendee = 'attendee',
  SalesRep = 'salesrep',
  Default = 'none',
}


@Injectable({
  providedIn: 'root',
})



export class State {
constructor(){}

private userSubject = new BehaviorSubject<User>({id:0,email:"",role:UserRole.Default})
user$ = this.userSubject.asObservable()

private hostDashboardOptions = new BehaviorSubject<HostDash>({hasevents:null})
hostDashState$ = this.hostDashboardOptions.asObservable()

user:User={id:0, email:"", role: UserRole.Default}
hostDashState:HostDash ={hasevents:null}

setUser(token: AccessToken) {
  let role = UserRole.Default;

  if (token.role === UserRole.Host) role = UserRole.Host;
  if (token.role === UserRole.Vendor) role = UserRole.Vendor;
  if (token.role === UserRole.Attendee) role = UserRole.Attendee;
  if (token.role === UserRole.SalesRep) role = UserRole.SalesRep;
  this.user = {
    id: token.userid,
    email: token.email,
    role: role
  };
  this.userSubject.next(this.user);
}

changeHostDashState(update: Partial<HostDash>) {
  this.hostDashState = {
    ...this.hostDashState,
    ...update
  };

  this.hostDashboardOptions.next(this.hostDashState);
}

}
