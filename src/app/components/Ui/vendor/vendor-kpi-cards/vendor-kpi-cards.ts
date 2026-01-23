import { Component,inject,effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { State } from '../../../../services/state';
import { VendorDash } from '../../../../interfaces/userstate';
import { VendorDataService } from '../../../../services/vendor/vendor-data-service';


@Component({
  selector: 'app-vendor-kpi-cards',
imports: [MatInputModule,
    MatButtonModule,
    MatIconModule,MatFormFieldModule,AsyncPipe, MatSelectModule],
  templateUrl:'./vendor-kpi-cards.html',
  styleUrl: './vendor-kpi-cards.css',
})
export class VendorKpiCards {
   constructor(){
   effect(() => {
   const user = this.state.user();
   const vendorDashState:VendorDash = this.state.vendorDashState();
 });}

state = inject(State)
vendorService = inject(VendorDataService)
 analytics = []

}