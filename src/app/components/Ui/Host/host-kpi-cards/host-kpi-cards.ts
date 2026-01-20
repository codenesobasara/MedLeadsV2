import { Component,inject,effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { HostDash } from '../../../../interfaces/userstate';
import { MatSelectModule } from '@angular/material/select';
import { State } from '../../../../services/state';
import { HostDataService } from '../../../../services/host-data-service';

@Component({
  selector: 'host-kpi',
  imports: [MatInputModule,
    MatButtonModule,
    MatIconModule,MatFormFieldModule,AsyncPipe, MatSelectModule],
  templateUrl: './host-kpi-cards.html',
  styleUrl: './host-kpi-cards.css',
})
export class HostKpiCards {
 constructor(){
   effect(() => {
   const user = this.state.user();
   const hostDash: HostDash = this.state.hostDashState();
 });
 }
  public state = inject(State);
  public hostService = inject(HostDataService)
  
  analytics = this.hostService.analytics; 
  isLoading = this.hostService.isLoading;

  onClick(name:string){
    this.state.changeHostDashState({cardSelected:name,})
  }
}