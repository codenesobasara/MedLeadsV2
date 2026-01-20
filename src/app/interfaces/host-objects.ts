export interface HostObjects {
}
export interface HostEventAnalytics {
  summary: {
    attendingVendorsAmount: number;
    activeVendorsAmount: number;
    topVendor: string;
    vendorEngagementRate: number;
    avgScansPerActiveVendor: number;

    peakHour: {
      Day: string;
      hourKey: string;
      scans: number;
    };
  };

  eventScans: any[];        
  Attendingvendors: any[];  
  activeVendors: any[]; 
  vendorChartData:any[]    

  totals: {
    totalScans: number;
    byDayHour: {
      [day: string]: {
        [hour: string]: number;
      };
    };
  };
}