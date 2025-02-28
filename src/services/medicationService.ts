
import { Medication, MedicationSchedule, MedicationHistory } from '../models/medication';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Bell, AlertCircle, Clock } from 'lucide-react';

// Mock storage for medications since we don't have a backend
const MEDS_STORAGE_KEY = 'wellness_medications';
const SCHEDULE_STORAGE_KEY = 'wellness_medication_schedule';
const HISTORY_STORAGE_KEY = 'wellness_medication_history';

// Load medications from localStorage
export const loadMedications = (): Medication[] => {
  const storedMeds = localStorage.getItem(MEDS_STORAGE_KEY);
  return storedMeds ? JSON.parse(storedMeds) : [];
};

// Save medications to localStorage
export const saveMedications = (medications: Medication[]): void => {
  localStorage.setItem(MEDS_STORAGE_KEY, JSON.stringify(medications));
};

// Add a new medication
export const addMedication = (medication: Omit<Medication, 'id'>): Medication => {
  const medications = loadMedications();
  const newMedication = {
    ...medication,
    id: Date.now().toString(),
  };
  
  // Create medication schedules based on times per day
  const schedules: MedicationSchedule[] = [];
  for (let i = 0; i < medication.timesPerDay; i++) {
    // Default times based on times per day (simple distribution)
    const hour = Math.floor(8 + (i * (12 / medication.timesPerDay)));
    const time = `${hour.toString().padStart(2, '0')}:00`;
    
    schedules.push({
      id: `${newMedication.id}-${i}`,
      medicationId: newMedication.id,
      time,
      taken: false
    });
  }
  
  newMedication.schedule = schedules;
  medications.push(newMedication);
  saveMedications(medications);
  
  // Save schedules separately
  saveSchedules(loadSchedules().concat(schedules));
  
  return newMedication;
};

// Update an existing medication
export const updateMedication = (medication: Medication): Medication => {
  const medications = loadMedications();
  const index = medications.findIndex(m => m.id === medication.id);
  
  if (index !== -1) {
    medications[index] = medication;
    saveMedications(medications);

    // Update schedules if needed
    const schedules = loadSchedules();
    const updatedSchedules = schedules.filter(s => s.medicationId !== medication.id).concat(medication.schedule);
    saveSchedules(updatedSchedules);
  }
  
  return medication;
};

// Delete a medication
export const deleteMedication = (medicationId: string): void => {
  const medications = loadMedications();
  const updatedMedications = medications.filter(m => m.id !== medicationId);
  saveMedications(updatedMedications);
  
  // Also remove schedules and history
  const schedules = loadSchedules();
  const updatedSchedules = schedules.filter(s => s.medicationId !== medicationId);
  saveSchedules(updatedSchedules);
  
  const history = loadHistory();
  const updatedHistory = history.filter(h => h.medicationId !== medicationId);
  saveHistory(updatedHistory);
};

// Load medication schedules
export const loadSchedules = (): MedicationSchedule[] => {
  const storedSchedules = localStorage.getItem(SCHEDULE_STORAGE_KEY);
  return storedSchedules ? JSON.parse(storedSchedules) : [];
};

// Save medication schedules
export const saveSchedules = (schedules: MedicationSchedule[]): void => {
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedules));
};

// Update a medication schedule
export const updateSchedule = (schedule: MedicationSchedule): void => {
  const schedules = loadSchedules();
  const index = schedules.findIndex(s => s.id === schedule.id);
  
  if (index !== -1) {
    schedules[index] = schedule;
    saveSchedules(schedules);
    
    // Also update the medication
    const medications = loadMedications();
    const medIndex = medications.findIndex(m => m.id === schedule.medicationId);
    
    if (medIndex !== -1) {
      const scheduleIndex = medications[medIndex].schedule.findIndex(s => s.id === schedule.id);
      if (scheduleIndex !== -1) {
        medications[medIndex].schedule[scheduleIndex] = schedule;
        saveMedications(medications);
      }
    }
  }
};

// Mark a medication as taken
export const markMedicationTaken = (scheduleId: string, taken: boolean = true): void => {
  const schedules = loadSchedules();
  const index = schedules.findIndex(s => s.id === scheduleId);
  
  if (index !== -1) {
    const schedule = schedules[index];
    schedule.taken = taken;
    schedule.takenAt = taken ? new Date().toISOString() : undefined;
    schedules[index] = schedule;
    saveSchedules(schedules);
    
    // Also update the medication
    const medications = loadMedications();
    const medIndex = medications.findIndex(m => m.id === schedule.medicationId);
    
    if (medIndex !== -1) {
      const scheduleIndex = medications[medIndex].schedule.findIndex(s => s.id === schedule.id);
      if (scheduleIndex !== -1) {
        medications[medIndex].schedule[scheduleIndex] = schedule;
        saveMedications(medications);
      }
    }
    
    // Add to history
    addToHistory({
      id: Date.now().toString(),
      medicationId: schedule.medicationId,
      date: new Date().toISOString().split('T')[0],
      taken,
      takenAt: schedule.takenAt,
      dosage: medications[medIndex]?.dosage || '',
      notes: taken ? 'Taken on time' : 'Marked as not taken'
    });
    
    // Show toast notification
    if (taken) {
      toast({
        title: 'Medication Taken',
        description: `You've marked ${medications[medIndex]?.name} as taken.`,
        variant: 'default',
      });
    }
  }
};

// Load medication history
export const loadHistory = (): MedicationHistory[] => {
  const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

// Save medication history
export const saveHistory = (history: MedicationHistory[]): void => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
};

// Add to medication history
export const addToHistory = (historyItem: MedicationHistory): void => {
  const history = loadHistory();
  history.push(historyItem);
  saveHistory(history);
};

// Get medication reminders for the current day
export const getTodayReminders = (): MedicationSchedule[] => {
  const schedules = loadSchedules();
  const medications = loadMedications();
  const today = new Date();
  
  return schedules.filter(schedule => {
    const medication = medications.find(m => m.id === schedule.medicationId);
    if (!medication) return false;
    
    // Check if the medication should be taken today
    const startDate = new Date(medication.startDate);
    const endDate = medication.endDate ? new Date(medication.endDate) : null;
    
    return startDate <= today && (!endDate || endDate >= today);
  });
};

// Check if there are any upcoming reminders in the next hour
export const checkUpcomingReminders = (): void => {
  const now = new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const todayReminders = getTodayReminders();
  const medications = loadMedications();
  
  todayReminders.forEach(reminder => {
    const [hour, minute] = reminder.time.split(':').map(Number);
    const reminderDate = new Date();
    reminderDate.setHours(hour, minute, 0, 0);
    
    // If the reminder is in the next hour and not taken yet
    if (reminderDate > now && reminderDate <= inOneHour && !reminder.taken) {
      const medication = medications.find(m => m.id === reminder.medicationId);
      if (medication) {
        const minutesUntil = Math.round((reminderDate.getTime() - now.getTime()) / 60000);
        
        toast({
          title: 'Upcoming Medication',
          description: `${medication.name} (${medication.dosage}) due in ${minutesUntil} minutes`,
          variant: 'default',
        });
      }
    }
  });
};

// Check for any overdue medications
export const checkOverdueMedications = (): void => {
  const now = new Date();
  const todayReminders = getTodayReminders();
  const medications = loadMedications();
  
  todayReminders.forEach(reminder => {
    const [hour, minute] = reminder.time.split(':').map(Number);
    const reminderDate = new Date();
    reminderDate.setHours(hour, minute, 0, 0);
    
    // If the reminder time has passed and it's not taken
    if (reminderDate < now && !reminder.taken) {
      const medication = medications.find(m => m.id === reminder.medicationId);
      if (medication) {
        const minutesOverdue = Math.round((now.getTime() - reminderDate.getTime()) / 60000);
        
        // Only notify if it's less than 12 hours overdue to avoid excessive notifications
        if (minutesOverdue < 720) {
          toast({
            title: 'Medication Overdue',
            description: `${medication.name} (${medication.dosage}) was due ${minutesOverdue} minutes ago`,
            variant: 'destructive',
          });
        }
      }
    }
  });
};

// Check for upcoming refills
export const checkRefillReminders = (): void => {
  const now = new Date();
  const inSevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const medications = loadMedications();
  
  medications.forEach(medication => {
    if (medication.refillReminder && medication.refillDate) {
      const refillDate = new Date(medication.refillDate);
      
      // If refill date is within the next 7 days
      if (refillDate > now && refillDate <= inSevenDays) {
        const daysUntil = Math.round((refillDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
        
        toast({
          title: 'Medication Refill Reminder',
          description: `${medication.name} needs to be refilled in ${daysUntil} days`,
          variant: 'default',
        });
      }
    }
  });
};

// Initialize the reminder system - call this when the app starts
export const initializeReminderSystem = (): (() => void) => {
  // Immediately check for reminders
  checkUpcomingReminders();
  checkOverdueMedications();
  checkRefillReminders();
  
  // Set up interval to check regularly
  const intervalId = setInterval(() => {
    checkUpcomingReminders();
    checkOverdueMedications();
    checkRefillReminders();
  }, 60000); // Check every minute
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};
