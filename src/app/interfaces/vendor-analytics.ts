import {   VendorQuestion,
  TopFiveRepRow,
  TopFiveAttendeeRow,
  PeakScanDayRow,
  Rep,
  CurrentStaffing,
 Attendee,
  BoothDayHourScans} from "./dbReuturnModels";

export interface vendorAnalytics {
}

export interface BoothBaseAnalytics {
  repCount: number;
  totalScanCount: number;
  activeRepCount: number;
  attendeesScanned: number;

  questions: VendorQuestion[];

  topFiveReps: TopFiveRepRow[];
  topFiveAttendees: TopFiveAttendeeRow[];

  peakScanDay: PeakScanDayRow | null;
}

export interface RepAnalyticsObject {
  dayKey: string;
  currentStaffing: CurrentStaffing[];
  reps: Rep[];
  booth: {
    dayHourScans: BoothDayHourScans[];
  };

}

export interface RepShift {
  id: number;
  salesRepId: number;
  vendorId: number;
  eventId: number;
  date: string;       
  startTime: string;  
  endTime: string;   
}
export interface RepPerformance {
  total: {
    uniqueScans: number;
    lastHourCount: number;
    peakHour: string;
    busiestTime: string;
    lastActive: string;
  };
  byDay: {
    [date: string]: {
      uniqueScans: number;
      totalScans: number;
      lastActive: string;
      peakHour: string;
      busiestTime: string;
    };
  };
}

 export interface RepAttendees {
  attendees:Attendee [];

  pagination: {
    limit: number;
    hasMore: boolean;
    cursor?: {
      cursorDate: string; 
      cursorId: number;   
    };
  };
}
