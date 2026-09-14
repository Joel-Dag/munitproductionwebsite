import { StudioPackage, TimeSlot, StudioConfig } from '../types';

/**
 * ============================================================================
 * 📍 EDIT RECEIVING / STUDIO SOCIAL & CONTACT DETAILS HERE
 * ============================================================================
 * Whenever you want to change which Instagram account receives the booking
 * or messages, simply update the values in `STUDIO_CONFIG` below:
 *
 * - instagramUsername:    The username handle (e.g. 'munitproduction' or 'yourusername')
 * - instagramDmLink:      The link to the direct message thread or inbox
 * - instagramProfileLink: The URL to the public Instagram profile
 * - studioPhone:          Studio customer care / reservation phone number
 * - studioLocation:       Studio physical city / studio room address
 * ============================================================================
 */
export const STUDIO_CONFIG: StudioConfig = {
  instagramUsername: 'munitproduction',
  instagramDmLink: 'https://www.instagram.com/direct/t/18100549595099077/',
  instagramProfileLink: 'https://www.instagram.com/munitproduction/',
  studioPhone: '+251 983 863 178 / +251 984 661 905',
  studioLocation: 'Addis Ababa, Ethiopia',
};

// Helper function to get the configured studio details
export const getStudioConfig = (): StudioConfig => {
  return STUDIO_CONFIG;
};

// Studio packages with exact pricing and deliverables provided by user:
export const STUDIO_PACKAGES: StudioPackage[] = [
  // 1. Music Production Tiers
  {
    id: 'prod-20000',
    title: 'Music Production',
    category: 'production',
    priceETB: 20000,
    unit: 'Track',
    isPopular: true,
    badgeText: 'BEST OFFER • FULL PRODUCTION',
    accentColor: '#844D1E',
    deliverables: [
      'Music arrangement',
      'Live instrumental',
      'Vocal harmonization',
      'Mixing and mastering'
    ]
  },
  {
    id: 'prod-15000',
    title: 'Music Production',
    category: 'production',
    priceETB: 15000,
    unit: 'Track',
    badgeText: 'MOST POPULAR',
    accentColor: '#A06935',
    deliverables: [
      'Music arrangement',
      'Live instrumental',
      'Vocal harmonization'
    ]
  },
  {
    id: 'prod-10000',
    title: 'Music Production',
    category: 'production',
    priceETB: 10000,
    unit: 'Track',
    accentColor: '#B8824E',
    deliverables: [
      'Music arrangement'
    ]
  },

  // 2. YouTube / Radio / Advertisement Intro
  {
    id: 'intro-15000',
    title: 'YouTube / Radio / Advertisement Intro',
    category: 'production',
    priceETB: 15000,
    unit: 'Project',
    duration: 'Under 2 minutes',
    badgeText: 'MEDIA INTRO',
    accentColor: '#6B3E14',
    deliverables: [
      'YouTube intro',
      'Radio intro',
      'Advertisement intro'
    ]
  },

  // 3. Vocal Harmonization
  {
    id: 'vocal-7000',
    title: 'Vocal Harmonization',
    category: 'standalone',
    priceETB: 7000,
    unit: 'Track',
    accentColor: '#7C3AED',
    deliverables: [
      'Backing vocal arrangements',
      'Polyphonic vocal harmony stacks',
      'Choir & lead support voicing'
    ]
  },

  // 4. Mixing and Mastering
  {
    id: 'mix-master-10000',
    title: 'Mixing and Mastering',
    category: 'standalone',
    priceETB: 10000,
    unit: 'Track',
    accentColor: '#D97706',
    deliverables: [
      'Frequency balance & surgical EQ',
      'Analog compression & dynamics',
      'Loudness optimization for streaming platforms'
    ]
  },

  // 5. Instrument Rental
  {
    id: 'rental-marcus-miller-v7',
    title: 'Marcus Miller V7 Bass Guitar',
    category: 'rental',
    priceETB: 4000,
    unit: 'Rental',
    badgeText: 'POPULAR RENTAL',
    accentColor: '#059669',
    deliverables: [
      'Marcus Miller V7 Bass Guitar (Alder / Maple)',
      'Active / Passive preamp switchable',
      'Included pro cable & gig bag'
    ]
  },
  {
    id: 'rental-prs-with-pedal',
    title: 'PRS CE SE 24 Lead Guitar (With Pedal)',
    category: 'rental',
    priceETB: 6000,
    unit: 'Rental',
    isPopular: true,
    badgeText: 'BEST VALUE COMBO',
    accentColor: '#EA580C',
    deliverables: [
      'PRS CE SE 24 Electric Lead Guitar',
      'Boss ME-70 Multi-Effects Guitar Pedal included',
      'Power supply, patch cords & gig bag included'
    ]
  },
  {
    id: 'rental-prs-standalone',
    title: 'PRS CE SE 24 Lead Guitar (Without Pedal)',
    category: 'rental',
    priceETB: 4000,
    unit: 'Rental',
    badgeText: 'STANDALONE',
    accentColor: '#2563EB',
    deliverables: [
      'PRS CE SE 24 Electric Lead Guitar',
      'Clean studio direct / amp setup',
      'Padded case & cable included'
    ]
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'morning',
    title: 'Morning Session',
    ethiopianTime: 'ጠዋት 2:00',
    westernTime: '8:00 AM – 12:00 PM',
    description: 'Acoustic and vocal recording'
  },
  {
    id: 'afternoon',
    title: 'Afternoon Session',
    ethiopianTime: 'ከሰዓት 8:00',
    westernTime: '2:00 PM – 6:00 PM',
    description: 'Live instruments and arrangement'
  },
  {
    id: 'evening',
    title: 'Evening Session',
    ethiopianTime: 'ማታ 12:00',
    westernTime: '6:00 PM – 10:00 PM',
    description: 'Mixing, mastering, and production'
  }
];

export const MUSIC_GENRES = [
  'Gospel / Worship / Church',
  'Contemporary',
  'Acoustic / Folk',
  'Traditional / Cultural',
  'R&B / Soul',
  'Afrobeat',
  'Pop',
  'Instrumental',
  'Other'
];

export const RENTAL_COLLATERAL_OPTIONS = [
  'National Kebele ID / Passport',
  'Studio Session Hold (Used inside Munit Studio)',
  'Commercial Guarantee Letter',
  'Cash Deposit Agreement'
];
