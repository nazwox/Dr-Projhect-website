export interface Doctor {
  id: number;
  name: string;
  title: string;
  degrees: string;
  registration_no: string;
  registration_council: string;
  specialization: string;
  experience_years: number;
  city: string;
  clinic_address: string;
  fees_clinic: number;
  fees_telehealth: number;
  rating: number;
  reviews_count: number;
  languages: string[];
  tpa_accepted: string[];
  image_url: string;
  about: string;
  available_days: string;
  available_slots: string[];
}

export interface Appointment {
  id?: number;
  booking_reference: string;
  doctor_id: number;
  doctor_name: string;
  specialization: string;
  visit_type: 'clinic' | 'telehealth';
  appointment_date: string;
  time_slot: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  patient_age: number;
  patient_gender: string;
  abha_id?: string;
  symptoms: string;
  nmc_consent: boolean;
  status: 'Confirmed' | 'In Consult' | 'Completed' | 'Cancelled';
  amount_paid: number;
  created_at?: string;
}

export interface Review {
  id?: number;
  doctor_id: number;
  doctor_name: string;
  patient_name: string;
  verified: boolean;
  rating: number;
  punctuality_rating: number;
  hygiene_rating: number;
  bedside_manner_rating: number;
  comment: string;
  date: string;
  created_at?: string;
}

export interface Prescription {
  id?: number;
  rx_number: string;
  appointment_id?: number;
  patient_name: string;
  patient_abha?: string;
  doctor_name: string;
  doctor_reg: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
  advice: string;
  date: string;
  created_at?: string;
}

export interface AbhaProfile {
  id?: number;
  abha_number: string;
  abha_address: string;
  full_name: string;
  gender: string;
  dob: string;
  mobile: string;
  blood_group: string;
  linked_records_count: number;
}
