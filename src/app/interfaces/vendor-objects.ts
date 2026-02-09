import { BoothAttendee, DBAttendee, DBRepProfile, DBScan, DBVendorQuestion, RepShiftDB} from "./models";

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
    firstName: string;
    lastName:string;
    email:string;
    phone:string

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

    isRemote:boolean;

    isActive: boolean;
    shifts: RepShiftDB[];
  }[];

   
}

export interface RepShift {
  date: Date;
  start: string;
  end: string;
}