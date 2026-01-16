import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { State } from './services/state';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('medleadsV2');
  constructor(private state:State, private auth:AuthService){}
  ngOnInit(){
   const token = this.auth.getDecodedAccessToken()
   if(token){this.state.setUser(token)}
  }
}
