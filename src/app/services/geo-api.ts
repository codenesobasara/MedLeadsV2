import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoApi {
 private readonly base = 'https://api.geoapify.com/v1/geocode/autocomplete';
 private readonly apiKey = 'REMOVED_KEY';
 http =inject(HttpClient);

 autocompleteCity(query: string, countryCode: 'ca' | 'us'):Observable<any>{
  const params = new HttpParams()
  .set('text', query)
  .set('filter',`countrycode:${countryCode}`)
  .set('apiKey',this.apiKey)
  return this.http.get<any>(this.base,{params})
 }

}
