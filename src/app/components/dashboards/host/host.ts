import { Component, inject, effect } from '@angular/core';
import { HostDataService } from '../../../services/host-data-service';
import { State } from '../../../services/state';
// You no longer need AsyncPipe, BehaviorSubject, or Observable imports
import { HostKpiCards } from '../../Ui/Host/host-kpi-cards/host-kpi-cards'; 
import { HostactionCards } from '../../Ui/Host/hostaction-cards/hostaction-cards';

@Component({
  selector: 'app-host',
  standalone: true, // Standard in 2026
  imports: [HostKpiCards, HostactionCards], // No AsyncPipe needed
  templateUrl: './host.html',
  styleUrl: './host.css',
})
export class Host {
  // 2026 Injection Pattern
  public hostService = inject(HostDataService);
  public state = inject(State);

  constructor() {
    // This effect replaces your complex ngOnInit logic
    effect(() => {
      const events = this.hostService.events();
      
      // Sync global 'hasevents' state based on the signal value
      if (events.length > 0 && !this.state.hostDashState().hasevents) {
        this.state.changeHostDashState({ hasevents: true });
      }
    });
  }
}