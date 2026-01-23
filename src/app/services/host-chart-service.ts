import { Injectable, computed, inject } from '@angular/core';
import { HostDataService } from './host-data-service';
import { EngagementChartOptions } from '../interfaces/charts';

@Injectable({
  providedIn: 'root',
})
export class HostChartService {
  private hostService = inject(HostDataService);


engagementChart = computed<EngagementChartOptions>(() => {
  const analytics = this.hostService.analytics();

  if (!analytics || !analytics.vendorChartData) {
    return {
      chart: { type: 'bar' as const, height: 300, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 6 } },
      xaxis: { categories: [] },
      series: [{ name: 'Scan %', data: [] }],
    };
  }

  const total = (analytics.eventScans?.length ?? 0) || 1;

  const top5 = [...analytics.vendorChartData].slice(0, 5);

  const categories = top5.map(v => v.name ?? '');
const data = top5.map(v => +(((v.count ?? 0) / total) * 100).toFixed(1));

  return {
    chart: { type: 'bar' as const, height: 300, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 6 } },
    xaxis: { categories },
    series: [{ name: 'Scan %', data }],
  };
});



};