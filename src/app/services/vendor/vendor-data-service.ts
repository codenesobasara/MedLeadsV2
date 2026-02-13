import { Injectable, inject, signal, computed, } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop'; 
import { of } from 'rxjs';
import { State } from '../state';
import { DBEvent, Rep } from '../../interfaces/dbReuturnModels';
import { BoothBaseAnalytics, RepAnalyticsObject, RepAttendees } from '../../interfaces/vendor-analytics';
import { VendorCharts } from './vendor-charts';
import { VendorFormControl } from './vendor-form-control';

@Injectable({
  providedIn: 'root',
})
export class VendorDataService {
    private http = inject(HttpClient);
    private state = inject(State)
    private readonly baseUrl = 'http://localhost:3000/api/vendor';
    private refreshTrigger = signal(0);
    private form = inject(VendorFormControl)

    selectedEventId = signal<number | null>(null);
    createdRep = signal<Rep|null>(null)
    selectedRep= signal<Rep | null>(null)
    currentCursor = signal<{ cursorDate: string; cursorId: number } | null>(null);
    selectedDay =signal<string|null>(null)
    

    selectedEvent = computed<DBEvent|null>(()=>{
      const id = this.selectedEventId();
      if(id === null){return null}
      return this.eventsResource.value()?.find(e=> id === e.id)?? null
    })

    eventsResource = rxResource({
    params:() =>{return this.state.user().role === 'vendor'? true : undefined
      
    },
    stream: () => this.http.get<DBEvent[]>(`${this.baseUrl}/events`)});

  baseBoothAnalytics = rxResource({
  params: () => ({ id: this.state.vendorDashState().EventId }),
  stream: ({ params }) => {
    if (!params.id) return of(null);
    return this.http.get<BoothBaseAnalytics>(
      `${this.baseUrl}/events/${params.id}/analytics`
    );
  }
});


repAnalytics = rxResource({
  params: () => ({
    id: this.state.vendorDashState().EventId,
    day: this.state.event()?.startDate ?? null
  }),
  stream: ({ params }) => {
    if (!params.id || !params.day) return of(null);
    return this.http.get<RepAnalyticsObject>(
      `${this.baseUrl}/events/${params.id}/analytics/reps?day=${encodeURIComponent(params.day)}`
    );
  }
});

createRepResource = rxResource({
  params:() =>({
    repObject:this.form.repObject(),
  }),
  stream:({params}) =>{
    if(params.repObject === null) return of (null);
    return this.http.post<Rep>(`${this.baseUrl}/events/${this.state.vendorDashState().EventId}/rep`, params.repObject)
  }
})

//singlerepAnalytics = rxResource({
  //params:() => ({
    //repId:this.selectedRep()?.id,
  //}),
  //stream:({params})=>{
   // if(params.repId === null)return of (null);
    //return this.http.get(`${this.baseUrl}/events/${this.state.vendorDashState().EventId}/${this.selectedRep()?.id}/analytics`)
  //}
//})

attendeesResource =rxResource({
  params: () =>({
   repId:this.selectedRep()?.id,
   day: this.selectedDay(),        
    cursorDate: this.currentCursor()?.cursorDate,
    cursorId: this.currentCursor()?.cursorId,
  }),
  stream:({params})=>{
   const eventId = this.state.vendorDashState()?.EventId;
  if (!eventId) {
    console.warn('EventId not found in state yet.');
    return of(null);
  }
      let httpParams = new HttpParams();
    if (params.day) httpParams = httpParams.set('day', params.day);
    if (params.cursorDate) httpParams = httpParams.set('cursorDate', params.cursorDate);
    if (params.cursorId) httpParams = httpParams.set('cursorId', params.cursorId.toString());
    return this.http.get<RepAttendees>(`${this.baseUrl}/events/${this.state.vendorDashState().EventId}/reps/${params.repId}/attendees`,{params:httpParams})

    
  }
})


      
     
  
}

