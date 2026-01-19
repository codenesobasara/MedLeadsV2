import { Component,effect,inject } from '@angular/core';
import { State } from '../../../../services/state';
import { DBEvent } from '../../../../interfaces/models';
import { AsyncPipe,DatePipe,UpperCasePipe } from '@angular/common';
import { HostDash } from '../../../../interfaces/userstate';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HostDataService } from '../../../../services/host-data-service';

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
  constructor(){
  effect(() => {
  const user = this.state.user();
  const hostDashState: HostDash = this.state.hostDashState();
});
  }
  public state = inject(State);
  public hostService = inject(HostDataService)
  hostDashState = this.state.hostDashState;
  events = this.hostService.events;
  selectEvent(event:DBEvent){
  this.state.changeHostDashState({ eventSelected: true, EventId: event.id })
}


}
  