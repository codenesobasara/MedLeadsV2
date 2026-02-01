import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, mergeMap, of, map } from 'rxjs';

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
autocompletePostal(query:string = "", cities:any [], country:'ca'|'us', area:any [] ): Observable<any> {
  console.log('POSTAL FIRED', { query, cities: cities.length, area: area.length });
  let searchQuery = query && query.trim() ? query : "";
  const params = new HttpParams()
    .set('text', searchQuery)
    .set('limit','100')
    .set('apiKey',this.apiKey)
    .set('type', "postcode")
    .set('filter',`countrycode:${country}`);

  if (area.length) {
    const requests = area
      .filter((a:any) => a.bbox)
      .map((a:any) => {
        
        const bbox = a.bbox as [number, number, number, number];
        return this.http.get<any>(this.base, { params }).pipe(
          map((response: any) => {
            let results = response.features || [];
            results = results.filter((f: any) => {
              const lat = f.geometry?.coordinates?.[1];
              const lon = f.geometry?.coordinates?.[0];
              if (lat == null || lon == null) return false;
              return lat >= bbox[1] && lat <= bbox[3] && lon >= bbox[0] && lon <= bbox[2];
            });
            return results;
          })
        );
      });

    if (!requests.length) return of([]);
    return forkJoin(requests).pipe(map((all:any[]) => all.flat()));
  }

  if (cities.length) {
    const requests = cities
      .filter((c:any) => c.bbox)
      .map((c:any) => {
        const bbox = c.bbox as [number, number, number, number];
        return this.http.get<any>(this.base, { params }).pipe(
          map((response: any) => {
            let results = response.features || [];
            results = results.filter((f: any) => {
              const lat = f.geometry?.coordinates?.[1];
              const lon = f.geometry?.coordinates?.[0];
              if (lat == null || lon == null) return false;
              return lat >= bbox[1] && lat <= bbox[3] && lon >= bbox[0] && lon <= bbox[2];
            });
            return results;
          })
        );
      });

    if (!requests.length) return of([]);
    return forkJoin(requests).pipe(map((all:any[]) => all.flat()));
  }

  return this.http.get<any>(this.base, { params }).pipe(
    map((response:any) => response.features || [])
  );
}
 
autocompleteRegions(cities: any[], searchText: string = ''): Observable<any[]> {
    const requests = cities
    .filter(city => city.bbox) 
    .map(city => {
      const bbox = city.bbox as [number, number, number, number];
      let searchQuery = searchText && searchText.trim() ? searchText : '*';
      const params = new HttpParams()
          .set('text', searchQuery)
          .set('limit', '100')
          .set('apiKey', this.apiKey);
      
      console.log('Searching for:', searchQuery, 'in city bbox:', bbox);
      
      return this.http.get<any>('https://api.geoapify.com/v1/geocode/search', { params }).pipe(
        map((response: any) => {
          console.log('Raw API response features:', response.features?.length, response.features);
          let results = response.features || [];
          
          results = results.filter((f: any) => {
            const lat = f.geometry?.coordinates?.[1];
            const lon = f.geometry?.coordinates?.[0];
            if (!lat || !lon) return false;
            const inBbox = lat >= bbox[1] && lat <= bbox[3] && lon >= bbox[0] && lon <= bbox[2];
            console.log('Checking', f.properties?.address_line1, 'lat:', lat, 'lon:', lon, 'inBbox:', inBbox);
            return inBbox;
          });
          
          console.log('After bbox filter:', results.length, results);
          
          return results;
        })
      );
    });

  if (!requests.length) {
    return of([]);
  }

  return forkJoin(requests);
}

}
