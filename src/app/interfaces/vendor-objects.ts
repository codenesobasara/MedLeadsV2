import { BoothAttendee, DBAttendee, DBRepProfile, DBScan, DBVendorQuestion } from "./models";

export interface VendorObjects {
}

export interface VendorAnalyticsObject {
  booth: {
    totalScans: number;

    peakDay: {
      day?: string;
      count?: number;
    };

    peakDayHour: {
      day?: string;
      hour?: string;
      count?: number;
    };

    questions: DBVendorQuestion[];
    attendingReps: DBRepProfile[];
    allScans: DBScan[];

    dayHourScans: {
      dayKey: string;
      hours: Record<string, number>;
    }[];

    
      BoothAttendees: BoothAttendee[];

    avgScansPerRep: number;
    activeRepCount: number;
  };

  reps: {
    id: number;
    name: string;

    totalScans: number;
    totAvgScansPerHour: number;
    avgScansPerDay: number;

    scans: DBScan[];
    attendees: DBAttendee[];

    scansPerDayHour: {
      dayKey: string;
      hours: Record<string, number>;
    }[];

    avgScansPerDayHour: {
      [hourKey: string]: number;
    }[];

    peakDayHour: {
      [dayKey: string]: {
        [hourKey: string]: number;
      };
    }[];

    isActive: boolean;
  }[];
}