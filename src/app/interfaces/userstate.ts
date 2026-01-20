export interface userState {
}
export enum UserRole {
  Host = 'host',
  Vendor = 'vendor',
  Attendee = 'attendee',
  SalesRep = 'salesrep',
  Default = 'none',
}

export interface User {
  id: number;
  email: string;
  role: UserRole 
}

export interface HostDash{
  hasevents: boolean | null;
  eventSelected:boolean|null
   EventId: number | null,
   cardSelected:string |null
 
}