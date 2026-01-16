import { Component } from '@angular/core';
import { HostDataService } from '../../../services/host-data-service';
import { State } from '../../../services/state';
import { HostDash } from '../../../interfaces/userstate';

@Component({
  selector: 'app-host',
  imports: [],
  templateUrl: './host.html',
  styleUrl: './host.css',
})
export class Host {
  constructor(private hostApi:HostDataService, private state:State){}
events:Event[] = []



ngOnInit(){
this.hostApi.getAllEvents().subscribe(data=>{
  this.events = data
  if(this.events.length > 0){this.state.changeHostDashState({hasevents:true})}
})



}

}
