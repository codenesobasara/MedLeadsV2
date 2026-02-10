import { Component, inject, effect, computed } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { State } from '../../../../services/state';
import { VendorDash } from '../../../../interfaces/userstate';
import { VendorDataService } from '../../../../services/vendor/vendor-data-service';
import { AddRepDialog } from '../add-rep-dialog/add-rep-dialog';
import { BoothBaseAnalytics, RepAnalyticsObject } from '../../../../interfaces/vendor-analytics';

@Component({
  selector: 'app-vendor-kpi-cards',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    AsyncPipe,
    MatSelectModule,
    DecimalPipe,
    MatDialogModule
  ],
  templateUrl: './vendor-kpi-cards.html',
  styleUrl: './vendor-kpi-cards.css',
})
export class VendorKpiCards {
  state = inject(State);
  vendorService = inject(VendorDataService);
  dialog = inject(MatDialog);
 
  boothBase = computed<BoothBaseAnalytics | null>(() => this.vendorService.boothAnalytics());
  repAnalytics = computed<RepAnalyticsObject | null>(() => this.vendorService.reps());

  constructor() {
    effect(() => {
      const user = this.state.user();
      const vendorDashState: VendorDash = this.state.vendorDashState();

      // helpful logs while wiring
      console.log('BOOTH BASE:', this.boothBase());
      console.log('REP ANALYTICS:', this.repAnalytics());
    });
  }

  addRep(): void {
    this.dialog.open(AddRepDialog, {
      width: '1050px',
      height: '900px'
    });
  }

  onClick(name: string) {
    console.log('click fired');
    this.state.changVendorDashState({ cardSelected: name });
  }
}
