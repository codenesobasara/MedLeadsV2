import { Component, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralFunctions } from '../../../../services/functions/general-functions';
import { VendorDataService } from '../../../../services/vendor/vendor-data-service';
import { VendorCharts } from '../../../../services/vendor/vendor-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EngagementHub } from '../../../vendor/charts/engagement-hub/engagement-hub';
import { Rep } from '../../../../interfaces/dbReuturnModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-mangement',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    NgApexchartsModule,
    EngagementHub
  ],
  templateUrl: './team-mangement.html',
  styleUrl: './team-mangement.css',
  standalone: true
})
export class TeamMangement {
  func = inject(GeneralFunctions);
  vendorData = inject(VendorDataService);
  chartData = inject(VendorCharts);
  Router =inject(Router)

teamCount = computed(() => this.vendorData.repAnalytics.value()?.reps.length ?? 0);
  constructor() {
     effect(() => {
      const days = this.chartData.dates();
      if (!this.chartData.selectedShiftDate() && days.length) {
        this.chartData.setShiftDay(days[0]);
      }
    });
  }
 
  repSelect(rep:Rep){
    this.vendorData.selectedRepId.set(rep.id)
    this.vendorData.selectedRep.set(rep)
    this.Router.navigate([`/dashboard/vendor/reps/${rep.id}/insights`]);

  }
}