import { inject, Injectable, signal, computed,effect } from '@angular/core';
import { VendorDataService } from './vendor-data-service';
import { DBEvent,} from '../../interfaces/dbReuturnModels';
import { GeneralFunctions } from '../functions/general-functions';
import { ApexAxisChartSeries, ApexOptions } from 'ng-apexcharts';
import { count } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class VendorCharts {
  constructor(){
  effect(() => {
  const newRep = this.vendorData.createdRep();
  if (newRep && this.vendorData.repAnalytics.value()) {
    this.vendorData.repAnalytics.update(currentData => {
      if (!currentData) return currentData;
      return {
        ...currentData,
        reps: [...(currentData.reps ?? []), newRep]
      };
    });
  }
});


  }
  selectedDay = signal<string | "total">("total");
  chartView = signal<string>('total');
  vendorData = inject(VendorDataService);
  func = inject(GeneralFunctions);


  setChartView(value: string) {
    this.chartView.set(value);
  }

  selectedEvent = computed<DBEvent | null>(() => {
    const eventId = this.vendorData.selectedEventId();
    return this.vendorData.eventsResource.value()?.find(e => e.id === eventId) ?? null;
  });

  dates = computed(() => {
    const event = this.selectedEvent();
    if (!event?.startDate || !event?.endDate) return [];
    return this.func.getDateRange(event.startDate, event.endDate);
  });

   repAnalyticsCharSelection = signal<string | null>(null);
   repAnalyticsChartDay = signal<string | null>('day1');

   repLeaders = computed(() => {
    const data = this.vendorData.repAnalytics.value();
    if (!data?.reps || !data.reps.length) return { effecientRep: null, consistentRep: null };;
    const efficiency = [...data.reps].sort((a, b) => b.totAvgScansPerHour - a.totAvgScansPerHour);
    const consistency = [...data.reps].sort((a, b) => b.avgScansPerDay - a.avgScansPerDay);

    return {
      effecientRep: efficiency[0],
      consistentRep: consistency[0],
    };
  });

  dailyChart(selectedDay: string) {
    const data = this.vendorData.repAnalytics.value();
    if(!data)return
    const series: ApexAxisChartSeries = [];
    const formattedKey = selectedDay;
    const boothDay = data.booth.dayHourScans.find(d => d.dayKey === formattedKey);

    data.reps.forEach(r => {
      const repDay = r.scansPerDayHour.find(d => d.dayKey === formattedKey);
      if (!repDay) return;

      series.push({
        name: r.firstName,
        data: Object.entries(repDay.hours)
          .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
          .map(([hour, value]) => {
            const totalForThisHour = boothDay?.hours[hour] || 1;
            const percentage = (value / totalForThisHour) * 100;

            return {
              x: this.func.formatAmPm(hour).trim(),
              y: Math.round(percentage),
              count: value,
            };
          }),
      });
    });

    return series;
  }

  totalsChart() {
    const data = this.vendorData.repAnalytics.value();
    if(!data)return
    const series: ApexAxisChartSeries = [];
    const boothHourlyTotals: Record<string, number> = {};
    data.booth.dayHourScans.forEach(day => {
      Object.entries(day.hours).forEach(([hour, value]) => {
        const numericHour = parseInt(hour).toString();
        boothHourlyTotals[numericHour] = (boothHourlyTotals[numericHour] ?? 0) + value;
      });
    });

    data.reps.forEach(r => {
      const repHourlyTotals: Record<string, number> = {};
      r.scansPerDayHour.forEach(day => {
        Object.entries(day.hours).forEach(([hour, value]) => {
          const numericHour = parseInt(hour).toString();
          repHourlyTotals[numericHour] = (repHourlyTotals[numericHour] ?? 0) + value;
        });
      });

      series.push({
        name: r.firstName,
        data: Object.entries(repHourlyTotals)
          .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
          .map(([hour, value]) => {
            const totalForThisHour = boothHourlyTotals[hour] || 1;
            const percentage = (value / totalForThisHour) * 100;

            return {
              x: this.func.formatAmPm(hour).trim(),
              y: Math.round(percentage),
              count: value,
            };
          }),
      });
    });

    return series;
  }

  analyticsHubchartOptions: ApexOptions = {
    chart: {
      type: 'heatmap',
      height: 400,
      width: '100%',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    plotOptions: {
      heatmap: {
        radius: 8,
        enableShades: false,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, color: '#f8f9fa', name: 'No Scans' },
            { from: 1, to: 20, color: '#00d2ff', name: 'Low (Cool)' },
            { from: 21, to: 45, color: '#3a7bd5', name: 'Medium' },
            { from: 46, to: 75, color: '#f2994a', name: 'High' },
            { from: 76, to: 100, color: '#eb5757', name: 'Peak (Warm)' },
          ],
        },
      },
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['#ffffff'],
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '11px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
      formatter: function (val: any, opts?: any) {
        return opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].count || 0;
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val: number, opts?: any) {
          const count = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].count || 0;
          return `${count} Scans (${val}%)`;
        },
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        rotate: -45,
        offsetY: 5,
        style: { fontSize: '11px', fontWeight: 500 },
      },
    },
    grid: { show: false },
  };

  repLineChartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: true },
      animations: { enabled: true },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      type: 'category',
    },
    yaxis: {
      title: {
        text: 'Scans',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };


  salesRepChartAllTime() {
  try {
    const rep = this.vendorData.singlerepAnalytics.value();
    console.log('[salesRepChartAllTime] rep:', rep);
    if (!rep || !rep.scansPerDayHour) {
      console.warn('[salesRepChartAllTime] no rep or scansPerDayHour');
      return [];
    }
    const series:ApexAxisChartSeries = []
    const repHourlyTotals: Record<string, number> = {};
    rep.scansPerDayHour.forEach(day => {
      if (!day.hours || typeof day.hours !== 'object') return;
      Object.entries(day.hours).forEach(([hour, value]: [string, any]) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          const numericHour = parseInt(hour).toString(); 
          repHourlyTotals[numericHour] = (repHourlyTotals[numericHour] ?? 0) + numericValue;
        }
      });
    });

     series.push(
      
       {
        name: rep.firstName,
        data: Object.entries(repHourlyTotals)
          .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
          .map(([hour, value]) => ({
            x: this.func.formatAmPm(hour).trim(),
            y: value
          }))
      }
    )
     return series
  } catch (error) {
    console.error('[salesRepChartAllTime] error:', error);
    return [];
  }

}

   repLinChart = computed(()=>{
  const day = this.selectedDay();
  const rep = this.vendorData.singlerepAnalytics.value();
  if(!rep)return []
   return this.salesRepChartAllTime()
})

  series = computed(() => {
    const day = this.selectedDay();
   const data = this.vendorData.repAnalytics.value();
    if(!data)return []
    if (!day || day === 'Full Show') {
      return this.totalsChart();
    }
    return this.dailyChart(day);
  });

  setDay(day: string | "total") {
    this.selectedDay.set(day);
  }

  selectedShiftDate = signal<string | null>(null);

  getShifts = computed(() => {
    console.log('getShiftsFired');
    const data = this.vendorData.repAnalytics.value();
    if(!data)return
    const day = this.selectedShiftDate();
    if (!day) return;
    const formattedDay = new Date(day).toISOString().split('T')[0];
    const shifts: { firstName: string; lastName: string; start: string; end: string }[] = []
    data.reps.forEach(r => {
      if (!r.shifts?.length) return;

      const repsShifts = r.shifts.filter(s => s.date === formattedDay);
      repsShifts.forEach(shift => {
        shifts.push({
          firstName: r.firstName,
          lastName: r.lastName,
          start: shift.startTime,
          end: shift.endTime,
        });
      });
    });

    return shifts ?? [];
  });

  setShiftDay(day: string) {
    this.selectedShiftDate.set(day);
  }

  uniqueScanPercentage = computed(() => {
    const boothBase = this.vendorData.baseBoothAnalytics.value();
    if (!boothBase) return 0;
    const uniqueAttendeeCount = Number(boothBase.attendeesScanned ?? 0);
    const totalScans = Number(boothBase.totalScanCount ?? 0);
    if (!totalScans) return 0;
    return Math.round((uniqueAttendeeCount / totalScans) * 100);
  });
}
