import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop'; 
import { of } from 'rxjs';
import { State } from '../state';
import { DBEvent } from '../../interfaces/models';
import { VendorAnalyticsObject } from '../../interfaces/vendor-objects';

@Injectable({
  providedIn: 'root',
})
export class VendorDataService {
    private http = inject(HttpClient);
    private state = inject(State)
    private readonly baseUrl = 'http://localhost:3000/api/vendor';
    private refreshTrigger = signal(0);

    selectedEventId = signal<number | null>(null);

      eventsResource = rxResource({
      stream: () => this.http.get<DBEvent[]>(`${this.baseUrl}/events`)});

       analyticsResource = rxResource({
       params: () => ({ id: this.state.vendorDashState().EventId }),
       stream: ({ params }) => {
        if (!params.id) return of(null); 
        return this.http.get<VendorAnalyticsObject>(`${this.baseUrl}/events/${params.id}/analytics`);
        }
      });





      public readonly vendorAnalytics=computed(()=>this.analyticsResource.value())
      public readonly vendorEvents = computed<DBEvent[]>(() => this.eventsResource.value() ?? []);
      
     
  
}

