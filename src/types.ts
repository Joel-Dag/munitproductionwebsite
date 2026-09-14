export interface StudioPackage {
  id: string;
  title: string;
  category: 'production' | 'standalone' | 'rental';
  priceETB: number;
  unit: string;
  duration?: string;
  note?: string;
  deliverables: string[];
  isPopular?: boolean;
  badgeText?: string;
  accentColor?: string;
}

export interface BookingState {
  packageId: string;
  selectedDate: any;
  timeSlot: string;
  // Music Production fields
  projectTitle: string;
  genre: string;
  audioLinks: string;
  // Instrument Rental specific fields
  rentalDays: number;
  pickupOrStudio: 'studio_use' | 'pickup_takeaway';
  collateralType: string;
  // General details
  projectNotes: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  contactMethod: 'Instagram' | 'Telegram' | 'Phone' | 'Email';
}

export interface TimeSlot {
  id: string;
  title: string;
  ethiopianTime: string;
  westernTime: string;
  description: string;
}

export interface StudioConfig {
  instagramUsername: string;
  instagramDmLink: string;
  instagramProfileLink: string;
  studioPhone: string;
  studioLocation: string;
}
