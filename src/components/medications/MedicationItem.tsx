
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill, Clock, Calendar, Edit, Trash2, Check, X } from 'lucide-react';
import { Medication, MedicationSchedule } from '@/models/medication';
import { markMedicationTaken } from '@/services/medicationService';
import { cn } from '@/lib/utils';

interface MedicationItemProps {
  medication: Medication;
  onEdit: (medication: Medication) => void;
  onDelete: (medicationId: string) => void;
}

const MedicationItem = ({ medication, onEdit, onDelete }: MedicationItemProps) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Check if medication is active today
  const isActive = () => {
    if (!medication.startDate) return false;
    
    const startDate = new Date(medication.startDate);
    const now = new Date();
    
    if (startDate > now) return false;
    
    if (medication.endDate) {
      const endDate = new Date(medication.endDate);
      if (endDate < now) return false;
    }
    
    return true;
  };
  
  // Format time from 24h to 12h
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  // Handle marking medication as taken/not taken
  const handleMarkMedication = (scheduleId: string, taken: boolean) => {
    markMedicationTaken(scheduleId, taken);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      isActive() ? "border-primary/20" : "border-gray-200 opacity-70"
    )}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">{medication.name}</h3>
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(medication)}
                className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(medication.id)}
                className="h-8 w-8 p-0 text-gray-500 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Dosage:</span> {medication.dosage}
            </p>
            {medication.instructions && (
              <p className="text-gray-700">
                <span className="font-medium">Instructions:</span> {medication.instructions}
              </p>
            )}
            <p className="text-gray-700">
              <span className="font-medium">Schedule:</span> {medication.frequency} 
              {medication.frequency === 'daily' && `, ${medication.timesPerDay} ${medication.timesPerDay > 1 ? 'times' : 'time'} per day`}
            </p>
            <div className="flex items-center space-x-2 text-gray-700">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(medication.startDate)}
                {medication.endDate && ` - ${formatDate(medication.endDate)}`}
              </span>
            </div>
            {medication.refillDate && (
              <div className="flex items-center space-x-2 text-gray-700">
                <Pill className="h-4 w-4" />
                <span>
                  Refill by: {formatDate(medication.refillDate)}
                </span>
              </div>
            )}
          </div>
          
          {isActive() && (
            <>
              <div className="h-px bg-gray-100 my-2"></div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Today's Schedule
                </h4>
                
                <div className="space-y-2">
                  {medication.schedule.length > 0 ? (
                    medication.schedule.map((schedule) => (
                      <div 
                        key={schedule.id} 
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md",
                          schedule.taken ? "bg-green-50" : "bg-gray-50"
                        )}
                      >
                        <span className="font-medium">{formatTime(schedule.time)}</span>
                        
                        <div className="flex space-x-1">
                          {!schedule.taken ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkMedication(schedule.id, true)}
                              className="h-8 w-8 p-0 text-green-600 border-green-200 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          ) : (
                            <>
                              <span className="text-xs text-green-600 flex items-center mr-2">
                                <Check className="h-3 w-3 mr-1" />
                                Taken
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkMedication(schedule.id, false)}
                                className="h-8 w-8 p-0 text-gray-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No schedule defined for today.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationItem;
