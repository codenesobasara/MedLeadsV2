import { Injectable,signal,computed } from '@angular/core';
import { HostDash, User, } from '../interfaces/userstate';
import { AccessToken } from '../interfaces/auth';

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

 private _user = signal<User>({ id: 0, email: "", role: UserRole.Default });
 private _hostDashState = signal<HostDash>({ hasevents: null, eventSelected: false, EventId: 0 , cardSelected:""});

  public readonly user = this._user.asReadonly();
  public readonly hostDashState = this._hostDashState.asReadonly();
  public readonly isHost = computed(() => this.user().role === UserRole.Host);

    setUser(token: AccessToken) {
    this._user.set({
      id: token.userid,
      email: token.email,
      role: token.role as UserRole 
    });
}
    changeHostDashState(update: Partial<HostDash>) {
    this._hostDashState.update(state => ({
      ...state,
      ...update
    }));
  }
   

}
