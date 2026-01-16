import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HostDataService {
    constructor(private http:HttpClient){}
  private readonly baseUrl = 'http://localhost:3000/host/api'

  getAllEvents():Observable<Event[]>{
    return this.http.get<Event[]>(`${this.baseUrl}/events`)
  }
  
}
