export interface Models {
}

export interface BoothAttendee {
  FirstName: string;
  LastName: string;
  npi: number | null;
  visits: number;

  scannedBy: Record<number, string>;

  products: Record<number, any>;
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

export interface DBAttendee {
  id: number;

  npi: string | null;

  firstName: string;
  lastName: string;

  specialty: string | null;

  email: string | null;
  phone: string | null;

  physician: boolean;
  checkedIn: boolean;

  eventId: number;

  createdAt: string;
  updatedAt: string;
}

export interface DBHostProfile {
  id: number;

  userId: number;

  companyName: string;
  contactName: string;

  contactEmail: string | null;
  contactPhone: string | null;

  
 createdAt: string;
 updatedAt: string;
}
export interface DBRepProfile {
  id: number;

  vendorId: number;
  eventId: number;
  userId: number;

  firstName: string;
  lastName: string;

  email: string | null;
  phone: string | null;

  territories?: Array<{
    id: number;
    salesRepId: number;

    level: 'PROVINCE' | 'CITY' | 'POSTAL';
    country: 'CA' | 'US';

    provinceCode: string | null;
    cityName: string | null;
    cityPlaceId: string | null;
    postalCode: string | null;

    createdAt: string;
    updatedAt: string;
  }>;

  createdAt: string;
  updatedAt: string;
}

export interface DBScanAnswer {
  id: number;

  scanId: number;
  vendorQuestionId: number;

  answerText: string | null;


  createdAt: string;
   updatedAt: string;
}

export interface DBScan {
  id: number;

  attendeeId: number;
  vendorId: number;
  eventId: number;

  salesRepId: number | null;

  type: string | null;      
  scannedAt: string;        
  
   createdAt: string;
  updatedAt: string;
}


export interface DBVendorProduct {
  id: number;

  vendorId: number;
  eventId: number;

  name: string;

  description: string | null;
  category: string | null;
  sku: string | null;

  isFdaApproved: boolean;

  fdaApprovalNumber: string | null;
  fdaClass: string | null;

   createdAt: string;
   updatedAt: string;
}

export interface DBVendorProfile {
  id: number;

  eventId: number;
  userId: number;

  companyName: string;

  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;

  boothNumber: string | null;

   createdAt: string;
   updatedAt: string;
}

export type VendorQuestionType = 'TEXT' | 'YES_NO' | 'MULTI_CHOICE';

export interface DBVendorQuestion {
  id: number;

  vendorId: number;
  eventId: number;

  questionText: string;

  type: VendorQuestionType;

  isRequired: boolean;
  order: number;
  isActive: boolean;

  helpText: string | null;

 
  createdAt: string;
   updatedAt: string;
}