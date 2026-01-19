import { Component,inject } from '@angular/core';
import { State } from '../../../../services/state';
import { Host } from '../../../dashboards/host/host';
import { DBEvent } from '../../../../interfaces/models';
import { AsyncPipe,DatePipe,UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HostDash } from '../../../../interfaces/userstate';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HostEventAnalytics } from '../../../../interfaces/host-objects';

@Component({
  selector: 'hostaction-cards',
  imports: [AsyncPipe,DatePipe,UpperCasePipe,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './hostaction-cards.html',
  styleUrl: './hostaction-cards.css',
})
export class HostactionCards {
  constructor( private state:State){}
  
   hostDashState$!: Observable<HostDash>;
   events$!: Observable<DBEvent[]>
ngOnInit(){
  console.log("HOST ACTION CARDS FIRED");
  this.hostDashState$ = this.state.hostDashState$;
  
}
   selectEvent(event:DBEvent){
   this.state.changeHostDashState({eventSelected:true, EventId:event.id})
}
  

}
