
// Define TypeScript interfaces for our application

export type UserType = 'normal' | 'institution';
export type PaymentStatus = 'secured' | 'pending';

export interface User {
  id: string;
  type: UserType;
  name: string;
  location: string;
  contact: string;
  rating: number;
  upvotes: number;
  history: {
    posted: string[];
    applied: string[];
    completed: string[];
  };
  createdAt: Date;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  poster_id: string;
  poster_name: string;
  location: string;
  date: Date;
  duration: string;
  requirements: string;
  payment_status: PaymentStatus;
  payment_amount: number;
  applicants_count: number;
  max_needed: number;
  is_closed: boolean;
  applicant_ids: string[];
  type: string;
  createdAt: Date;
}
