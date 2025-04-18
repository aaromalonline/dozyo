
import { Gig, User } from '@/lib/types';

// Mock users data
export const users: User[] = [
  {
    id: '1',
    type: 'institution',
    name: 'Tech Society',
    location: 'North Campus',
    contact: 'techsoc@email.com',
    rating: 4.8,
    upvotes: 124,
    history: {
      posted: ['1', '4'],
      applied: [],
      completed: []
    },
    createdAt: new Date('2023-12-10')
  },
  {
    id: '2',
    type: 'normal',
    name: 'Jane Smith',
    location: 'East Campus',
    contact: 'jane.smith@email.com',
    rating: 4.2,
    upvotes: 18,
    history: {
      posted: ['3'],
      applied: ['1', '5'],
      completed: ['1']
    },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    type: 'institution',
    name: 'Campus Cafeteria',
    location: 'Central Campus',
    contact: 'cafe@campus.edu',
    rating: 4.5,
    upvotes: 87,
    history: {
      posted: ['2', '5'],
      applied: [],
      completed: []
    },
    createdAt: new Date('2023-11-05')
  }
];

// Mock gigs data
export const gigs: Gig[] = [
  {
    id: '1',
    title: 'Event Photographer Needed',
    description: 'Looking for someone to take photos during our annual tech fest. Must have own camera.',
    poster_id: '1',
    poster_name: 'Tech Society',
    location: 'North Campus',
    date: new Date('2025-05-15T18:00:00'),
    duration: '4 hours',
    requirements: 'DSLR Camera, Basic editing skills',
    payment_status: 'secured',
    payment_amount: 50,
    applicants_count: 3,
    max_needed: 5,
    is_closed: false,
    applicant_ids: ['2'],
    type: 'event',
    createdAt: new Date('2025-04-10')
  },
  {
    id: '2',
    title: 'Weekend Kitchen Helper',
    description: 'Need 2 helpers for the weekend rush. Previous experience preferred but not required.',
    poster_id: '3',
    poster_name: 'Campus Cafeteria',
    location: 'Central Campus',
    date: new Date('2025-04-20T08:00:00'),
    duration: '8 hours',
    requirements: 'No experience necessary, must be punctual',
    payment_status: 'secured',
    payment_amount: 75,
    applicants_count: 1,
    max_needed: 2,
    is_closed: false,
    applicant_ids: [],
    type: 'hospitality',
    createdAt: new Date('2025-04-12')
  },
  {
    id: '3',
    title: 'Notes Transcriber',
    description: 'Need someone to transcribe lecture notes for 3 subjects. Can be done remotely.',
    poster_id: '2',
    poster_name: 'Jane Smith',
    location: 'Remote',
    date: new Date('2025-04-25T09:00:00'),
    duration: 'Flexible',
    requirements: 'Good typing speed, attention to detail',
    payment_status: 'pending',
    payment_amount: 40,
    applicants_count: 0,
    max_needed: 1,
    is_closed: false,
    applicant_ids: [],
    type: 'academic',
    createdAt: new Date('2025-04-15')
  },
  {
    id: '4',
    title: 'Tech Workshop Assistant',
    description: 'Looking for 3 assistants to help run a coding workshop for beginners.',
    poster_id: '1',
    poster_name: 'Tech Society',
    location: 'Computer Lab, North Campus',
    date: new Date('2025-05-05T14:00:00'),
    duration: '6 hours',
    requirements: 'Basic programming knowledge, patience with beginners',
    payment_status: 'pending',
    payment_amount: 60,
    applicants_count: 2,
    max_needed: 3,
    is_closed: false,
    applicant_ids: [],
    type: 'tech',
    createdAt: new Date('2025-04-13')
  },
  {
    id: '5',
    title: 'Afternoon Delivery Runner',
    description: 'Need someone to deliver food orders around campus. Bike provided.',
    poster_id: '3',
    poster_name: 'Campus Cafeteria',
    location: 'Central Campus',
    date: new Date('2025-04-22T12:00:00'),
    duration: '4 hours',
    requirements: 'Must know campus layout well',
    payment_status: 'secured',
    payment_amount: 45,
    applicants_count: 1,
    max_needed: 2,
    is_closed: false,
    applicant_ids: ['2'],
    type: 'delivery',
    createdAt: new Date('2025-04-14')
  }
];

// Mock gig types for filtering
export const gigTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'event', label: 'Event' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'academic', label: 'Academic' },
  { value: 'tech', label: 'Tech' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'other', label: 'Other' }
];

// Mock locations for filtering
export const locations = [
  { value: 'all', label: 'All Locations' },
  { value: 'North Campus', label: 'North Campus' },
  { value: 'South Campus', label: 'South Campus' },
  { value: 'East Campus', label: 'East Campus' },
  { value: 'West Campus', label: 'West Campus' },
  { value: 'Central Campus', label: 'Central Campus' },
  { value: 'Remote', label: 'Remote' }
];
