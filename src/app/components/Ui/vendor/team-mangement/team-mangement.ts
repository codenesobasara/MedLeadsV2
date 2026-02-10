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
import { DBEvent } from '../../../../interfaces/dbReuturnModels';

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

  selectedEvent = computed<DBEvent | null>(() => {
    const eventId = this.vendorData.selectedEventId();
    return this.vendorData.vendorEvents().find(e => e.id === eventId) ?? null;
  });

  dates = computed(() => {
    const event = this.selectedEvent();
    if (!event?.startDate || !event?.endDate) return [];
    return this.func.getDateRange(event.startDate, event.endDate);
  });

  constructor() {
    effect(() => {
      const days = this.dates();

      if (!this.chartData.selectedShiftDate() && days.length) {
        this.chartData.setShiftDay(days[0]);
      }
    });
  }
}