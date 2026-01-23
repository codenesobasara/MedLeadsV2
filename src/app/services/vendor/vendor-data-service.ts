import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop'; 
import { of } from 'rxjs';
import { State } from '../state';
import { DBEvent } from '../../interfaces/models';

@Injectable({
  providedIn: 'root',
})
export class VendorDataService {
    private http = inject(HttpClient);
  private state = inject(State)
  private readonly baseUrl = 'http://localhost:3000/api/vendor';

    selectedEventId = signal<number | null>(null);

      eventsResource = rxResource({
      stream: () => this.http.get<DBEvent[]>(`${this.baseUrl}/events`)});



      public readonly vendorEvents = computed(()=>this.eventsResource.value()?? [])
     
  
}

