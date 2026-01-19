import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop'; 
import { of } from 'rxjs'; // Needed for empty streams
import { DBEvent } from '../interfaces/models';
import { HostEventAnalytics } from '../interfaces/host-objects';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class HostDataService {
  private http = inject(HttpClient);
  private state = inject(State)
  private readonly baseUrl = 'http://localhost:3000/api/host';

  // State: The ID of the currently active event
  selectedEventId = signal<number | null>(null);

  // Resource 1: Fetch all events
  eventsResource = rxResource({
  stream: () => this.http.get<DBEvent[]>(`${this.baseUrl}/events`)
  });
  analyticsResource = rxResource({
    // In Angular 20, 'request' is renamed to 'params'
    params: () => ({ id: this.state.hostDashState().EventId }),
    // The 'stream' function receives an object containing 'params'
    stream: ({ params }) => {
      if (!params.id) return of(null); // Use RxJS 'of' to return a null stream
      return this.http.get<HostEventAnalytics>(`${this.baseUrl}/events/${params.id}`);
    }
  });

  public readonly events = computed(() => this.eventsResource.value() ?? []);
  public readonly analytics = computed(() => this.analyticsResource.value()?? null);
  public readonly isLoading = computed(() => 
  this.eventsResource.isLoading() || this.analyticsResource.isLoading()
  );


}
