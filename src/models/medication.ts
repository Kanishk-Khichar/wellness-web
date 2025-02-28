
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  frequency: string;
  timesPerDay: number;
  startDate: string;
  endDate?: string;
  refillDate?: string;
  refillReminder: boolean;
  notes?: string;
  schedule: MedicationSchedule[];
}

export interface MedicationSchedule {
  id: string;
  medicationId: string;
  time: string; // Format HH:MM
  taken: boolean;
  takenAt?: string;
}

export interface MedicationReminder {
  id: string;
  medicationId: string;
  scheduleId: string;
  time: string;
  sent: boolean;
  sentAt?: string;
}

export interface MedicationHistory {
  id: string;
  medicationId: string;
  date: string;
  taken: boolean;
  takenAt?: string;
  dosage: string;
  notes?: string;
}
