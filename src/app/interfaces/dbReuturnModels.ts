export interface VendorQuestion {
  id: number;
  vendorId: number;
  eventId: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopFiveRepRow {
  salesRepId: number;
  ScanCount: number | string;
  "SalesRep.firstName": string;
  "SalesRep.lastName": string;
}

export interface TopFiveAttendeeRow {
  attendeeId: number;
  ScanCount: number | string;
  "Attendee.firstName": string;
  "Attendee.lastName": string;
}

export interface PeakScanDayRow {
  day: string;             
  scanCount: number | string;
}

export interface Rep {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isRemote: boolean;

  totalScans: number;
  totAvgScansPerHour: number;
  avgScansPerDay: number;

  scansPerDayHour: {
    dayKey: string;
    hours: Record<string, number>;
  }[];

  shifts: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];

  isActive: boolean;
}

export interface CurrentStaffing {
  id: number;
  salesRepId: number;
  vendorId: number;
  eventId: number;
  date: string;        
  startTime: string;
  endTime: string;

  SalesRep?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isRemote: boolean;
  };

  
}

export interface BoothDayHourScans {
  dayKey: string;
  hours: Record<string, number>;
}
export interface Booth {
  dayHourScans: BoothDayHourScans[];
}

export interface DBEvent {
  id: number;
  hostId: number;
  name: string;
  eventType: 'expo' | 'conference' | 'workshop';
  description: string | null;
  startDate: string;
  endDate: string;
  venue: string | null;
  city: string | null;
  region: string | null;
  estimatedAttendees: number | null;
  attendeeGroups: string | null; 
  format: 'in-person' | 'hybrid' | 'virtual';
  timezone: string; 
  dailyStartTime: string;
  dailyEndTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendee {
  id: number;
  npi?: string | null;
  firstName: string;
  lastName: string;
  specialty?: string | null;
  email?: string | null;
  phone?: string | null;
  physician: boolean;
  checkedIn: boolean;
  eventId: number;
}
