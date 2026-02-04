import { Injectable,computed,inject} from '@angular/core';
import { catchError, of,map } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { GeoApi } from '../geo-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';
import { RepShift } from '../../interfaces/vendor-objects';

@Injectable({
  providedIn: 'root',
})
export class VendorFormControl {
  fb = inject(FormBuilder)
  geo = inject(GeoApi)




repBasicInfo = this.fb.group({
      email:this.fb.nonNullable.control("",[Validators.required, Validators.email]),
    firstName:this.fb.nonNullable.control("",[Validators.required]),
    lastName:this.fb.nonNullable.control("",[Validators.required]), 
    phone:this.fb.control("",[Validators.required]),
    activeStaff:this.fb.control<boolean |null>(null,[Validators.required]),
    shiftDate: this.fb.control<Date | null>(null, [Validators.required]),
   shiftStartTime: this.fb.control<string | null>(null, [Validators.required]),
   shiftEndTime: this.fb.control<string | null>(null, [Validators.required]),
  shifts: this.fb.control<RepShift[]>([]),



})

  

    territory = this.fb.group({
    email:this.fb.nonNullable.control("",[Validators.required, Validators.email]),
    firstName:this.fb.nonNullable.control("",[Validators.required]),
    lastName:this.fb.nonNullable.control("",[Validators.required]), 
    phone:this.fb.control("",[Validators.required]),
    activeStaff:this.fb.control<boolean |null>(null,[Validators.required]),
   countryLevel:this.fb.control<'ca'|'us'| null>(null,[Validators.required]),
   territoryLevel: this.fb.control<'state'|'province' | 'city' | 'postal' |'neighbourhood' | null>(null),
   provinceStateSelections: this.fb.control<string[]>([], { nonNullable: true }),
   citySelections: this.fb.control<{ name: string; placeId: string; bbox?: [number, number, number, number] }[]>([], { nonNullable: true }),
   postalMode: this.fb.nonNullable.control<'manual' | 'upload'>('manual'),
   postalCodes: this.fb.control<string[]>([], { nonNullable: true }),
   postalFile: this.fb.control<File | null>(null),
   cityQuery: this.fb.nonNullable.control(""),
   regionQuery: this.fb.nonNullable.control(""),
   areaSelection: this.fb.control<{ name: string; placeId: string; displayName?: string; type?: string; bbox?: number[]; geometry?: { type: string; coordinates: any } }[]>([], { nonNullable: true }),
   postalQuery: this.fb.nonNullable.control(""),
   shiftDate: this.fb.control<Date | null>(null, [Validators.required]),
   shiftStartTime: this.fb.control<string | null>(null, [Validators.required]),
   shiftEndTime: this.fb.control<string | null>(null, [Validators.required]),
  shifts: this.fb.control<RepShift[]>([])
  })


private cityQuery = toSignal(this.territory.controls.cityQuery.valueChanges)
private regionQuery = toSignal(this.territory.controls.regionQuery.valueChanges)
private countrySignal = toSignal(this.territory.controls.countryLevel.valueChanges)
public citySelection = toSignal(this.territory.controls.citySelections.valueChanges)
public postalQuery = toSignal(this.territory.controls.postalQuery.valueChanges);
public areaSelection = toSignal(this.territory.controls.areaSelection.valueChanges);
public shifts = toSignal(this.territory.controls.shifts.valueChanges)

regionsResource = rxResource({
  params:()=>({
    query: this.regionQuery()
  }),

  stream:(context) =>{
    const query = (context.params.query?? "").trim()
    const cities = this.citySelection()?? []
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
            type: f.properties?.result_type ?? '', bbox: f.bbox?? [],
            geometry: f.geometry?? {}
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
  }),
  stream: (context) => {
    console.log("city resource fired");
    
    const query = (context.params.term ?? '').trim();
    const country = (this.countrySignal())
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

postalCodeReource = rxResource({
  params: () => ({
    query: this.postalQuery(),
  }),

  stream: (context) => {
    const query = (context.params.query ?? '').trim();
    const cities = this.citySelection() ?? [];
    const country = this.countrySignal() ?? 'ca';
    const area = this.areaSelection() ?? [];

    if (query.length < 2) return of([]);

    return this.geo.autocompletePostal(query, cities, country, area).pipe(
      map((res: any) => {
        console.log('RAW postal response:', res);
        const mapped = (res ?? []).map((p: any) => ({
          name: p.properties?.postcode ?? '',
          city: p.properties?.city ?? '',
        }));

        console.log('MAPPED postal results:', mapped);
        return mapped;
      }),
      catchError((err) => {
        console.error('POSTAL ERROR', err);
        return of([]);
      })
    );
  },
});


newShift(){
  const shiftForm = this.fb.group({
    shiftDate:this.fb.control

  })

}





public readonly city = computed(()=> this.cityResource.value())
public readonly regions = computed(()=> this.regionsResource.value()) 
public readonly postal = computed(()=>this.postalCodeReource.value())

















}

