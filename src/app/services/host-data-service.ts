import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop'; 
import { of } from 'rxjs';
import { DBEvent } from '../interfaces/models';
import { HostEventAnalytics } from '../interfaces/host-objects';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class HostDataService {
  private http = inject(HttpClient);
  private state = inject(State)
  private readonly baseUrl = 'http://localhost:3000/api/host';


  selectedEventId = signal<number | null>(null);

 
  eventsResource = rxResource({
  stream: () => this.http.get<DBEvent[]>(`${this.baseUrl}/events`)});

    analyticsResource = rxResource({
    params: () => ({ id: this.state.hostDashState().EventId }),
    stream: ({ params }) => {
    if (!params.id) return of(null); 
    return this.http.get<HostEventAnalytics>(`${this.baseUrl}/events/${params.id}`);
    }
  });

 

  public readonly events = computed(() => this.eventsResource.value() ?? []);
  public readonly analytics = computed(() => this.analyticsResource.value()?? null);
  public readonly isLoading = computed(() => this.eventsResource.isLoading() || this.analyticsResource.isLoading()
  );


}
