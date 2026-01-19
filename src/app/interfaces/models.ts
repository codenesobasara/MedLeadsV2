export interface Models {
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

  createdAt: string;
  updatedAt: string;
}
