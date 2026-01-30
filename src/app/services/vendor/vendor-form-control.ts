import { Injectable,computed,inject} from '@angular/core';
import { catchError, of,map } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { GeoApi } from '../geo-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class VendorFormControl {
  fb = inject(FormBuilder)
  geo = inject(GeoApi)

  addRepForm = this.fb.group({
    email:this.fb.nonNullable.control("",[Validators.required, Validators.email]),
    firstName:this.fb.nonNullable.control("",[Validators.required]),
    lastName:this.fb.nonNullable.control("",[Validators.required]), 
    phone:this.fb.control("",[Validators.required]),
   hasTerritory: this.fb.control<boolean | null>(null, [Validators.required]),
   countryLevel:this.fb.control<'Canada'|'UnitedStates'| null>(null,[Validators.required]),
   territoryLevel: this.fb.control<'province' | 'city' | 'postal' | null>(null),
   provinceStateSelections: this.fb.control<string[]>([], { nonNullable: true }),
   citySelections: this.fb.control<{ name: string; placeId: string; bbox?: [number, number, number, number] }[]>([], { nonNullable: true }),
   postalMode: this.fb.nonNullable.control<'manual' | 'upload'>('manual'),
   postalCodes: this.fb.control<string[]>([], { nonNullable: true }),
   postalFile: this.fb.control<File | null>(null),
   cityQuery: this.fb.nonNullable.control(""),
   regionQuery: this.fb.nonNullable.control(""),
   areaSelection: this.fb.control<{ name: string; placeId: string }[]>([], { nonNullable: true }),
  })
private cityQuery = toSignal(this.addRepForm.controls.cityQuery.valueChanges)
private regionQuery = toSignal(this.addRepForm.controls.regionQuery.valueChanges)
private countrySignal = toSignal(this.addRepForm.controls.countryLevel.valueChanges)
public citySelection = toSignal(this.addRepForm.controls.citySelections.valueChanges)


regionsResource = rxResource({
  params:()=>({
    cities:this.citySelection(),
    query: this.regionQuery()
  }),

  stream:(context) =>{
    const query = (context.params.query?? "").trim()
    const cities = (context.params.cities ?? [])
    if(!cities.length) return of([]);
    return this.geo.autocompleteRegions(cities, query).pipe(
      map((response:any[])=>{
        const seen = new Set<string>();
        const results = response
          .flatMap(r => r)  
          .map((f: any) => ({
            name: f.properties?.address_line1 || f.properties?.formatted || '',
            displayName: f.properties?.formatted || f.properties?.address_line1 || '',
            placeId: String(f.properties?.place_id ?? ''),
            type: f.properties?.result_type ?? ''
          }))
          .filter(region => {
            if (seen.has(region.placeId)) return false;
            seen.add(region.placeId);
            return true;
          });
        console.log('Final mapped regions for display:', results);
        return results;
      }),
      catchError(() => of([]))
    );
  },
});
   
  




cityResource = rxResource({
  params: () => ({
    term: this.cityQuery(),
    code: this.countrySignal(),
  }),
  stream: (context) => {
    const query = (context.params.term ?? '').trim();
    const country =
      context.params.code === 'Canada' ? 'ca'
      : context.params.code === 'UnitedStates' ? 'us'
      : null;
    if (!country) return of([]);          
    if (query.length < 2) return of([]);  

    return this.geo.autocompleteCity(query, country).pipe(
      map((res: any) =>
        (res.features ?? [])
         .map((f: any) => ({
          name: f.properties?.formatted ?? f.properties?.city ?? '',
          placeId: String(f.properties?.place_id ?? f.properties?.placeId ?? ''),
          bbox: f.bbox as [number, number, number, number]
        }))
      ),
      catchError(() => of([]))
    );
  },
});

public readonly city = computed(()=> this.cityResource.value())
public readonly regions = computed(()=> this.regionsResource.value()) 
}

