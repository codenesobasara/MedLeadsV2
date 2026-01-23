import { Component, inject } from '@angular/core';
import { HostChartService } from '../../../../services/host-chart-service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-engagement',
  imports: [NgApexchartsModule],
  templateUrl: './engagement.html',
  styleUrl: './engagement.css',
})
export class Engagement {
hostCharts = inject(HostChartService)

engagementChart = this.hostCharts.engagementChart
}
