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
import { Router } from '@angular/router';
import { Rep, TopFiveRepRow } from '../../../../interfaces/dbReuturnModels';

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
  vendorData = inject(VendorDataService);
  dialog = inject(MatDialog);
  Router = inject(Router);


  constructor() {
    effect(() => {
      const user = this.state.user();
      const vendorDashState: VendorDash = this.state.vendorDashState();
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
    this.Router.navigate([`/dashboard/vendor/events/${this.state.vendorDashState().EventId}/team/dashboard`])
  }

repSelect(rep: TopFiveRepRow) {
  this.vendorData.selectedRepId.set(rep.salesRepId);
  this.Router.navigate([`/dashboard/vendor/reps/${rep.salesRepId}/insights`]);
}
}
