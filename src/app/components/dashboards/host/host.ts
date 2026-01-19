import { Component, inject, effect } from '@angular/core';
import { HostDataService } from '../../../services/host-data-service';
import { State } from '../../../services/state';
import { HostKpiCards } from '../../Ui/Host/host-kpi-cards/host-kpi-cards'; 
import { HostactionCards } from '../../Ui/Host/hostaction-cards/hostaction-cards';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [HostKpiCards, HostactionCards],
  templateUrl: './host.html',
  styleUrl: './host.css',
})
export class Host {
  public hostService = inject(HostDataService);
  public state = inject(State);

  constructor() {
    effect(() => {
      const events = this.hostService.events();
      if (events.length > 0 && !this.state.hostDashState().hasevents) {
        this.state.changeHostDashState({ hasevents: true });
      }
    });
  }
}