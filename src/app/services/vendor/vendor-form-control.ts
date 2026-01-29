import { Injectable,computed,inject} from '@angular/core';
import { debounceTime, distinctUntilChanged, catchError, of,map } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { signal } from '@angular/core';
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
   citySelections: this.fb.control<{ name: string; placeId: string }[]>([], { nonNullable: true }),
   postalMode: this.fb.nonNullable.control<'manual' | 'upload'>('manual'),
   postalCodes: this.fb.control<string[]>([], { nonNullable: true }),
   postalFile: this.fb.control<File | null>(null),
   cityQuery: this.fb.nonNullable.control(""),

  })
private cityQuery = toSignal(this.addRepForm.controls.cityQuery.valueChanges)
private countrySignal = toSignal(this.addRepForm.controls.countryLevel.valueChanges)



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
console.log("CITY AUTOCOMPLETE PARAMS", context.params);
    if (!country) return of([]);          
    if (query.length < 2) return of([]);  

    return this.geo.autocompleteCity(query, country).pipe(
      map((res: any) =>
        (res.features ?? []).map((f: any) => ({
          name: f.properties?.formatted ?? f.properties?.city ?? '',
          placeId: String(f.properties?.place_id ?? f.properties?.placeId ?? '')
        }))
      ),
      catchError(() => of([]))
    );
  },
});

public readonly city = computed(()=> this.cityResource.value())
}