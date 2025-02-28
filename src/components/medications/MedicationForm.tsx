
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Medication } from '@/models/medication';
import { addMedication, updateMedication } from '@/services/medicationService';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface MedicationFormProps {
  medication?: Medication;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const MedicationForm = ({ medication, open, onOpenChange, onSave }: MedicationFormProps) => {
  const { toast } = useToast();
  const isEditing = !!medication;

  const [name, setName] = useState(medication?.name || '');
  const [dosage, setDosage] = useState(medication?.dosage || '');
  const [instructions, setInstructions] = useState(medication?.instructions || '');
  const [frequency, setFrequency] = useState(medication?.frequency || 'daily');
  const [timesPerDay, setTimesPerDay] = useState(medication?.timesPerDay || 1);
  const [startDate, setStartDate] = useState(medication?.startDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(medication?.endDate || '');
  const [refillDate, setRefillDate] = useState(medication?.refillDate || '');
  const [refillReminder, setRefillReminder] = useState(medication?.refillReminder || false);
  const [notes, setNotes] = useState(medication?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !dosage) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const medicationData = {
        id: medication?.id || '',
        name,
        dosage,
        instructions,
        frequency,
        timesPerDay,
        startDate,
        endDate,
        refillDate,
        refillReminder,
        notes,
        schedule: medication?.schedule || []
      };

      if (isEditing) {
        updateMedication(medicationData as Medication);
        toast({
          title: 'Medication Updated',
          description: `${name} has been updated successfully.`,
        });
      } else {
        addMedication(medicationData);
        toast({
          title: 'Medication Added',
          description: `${name} has been added to your medications.`,
        });
      }

      onSave();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'add'} medication.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Medication' : 'Add New Medication'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your medication details below.' : 'Enter the details of your medication below.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name*</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter medication name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage*</Label>
              <Input 
                id="dosage" 
                value={dosage} 
                onChange={(e) => setDosage(e.target.value)} 
                placeholder="e.g., 10mg, 1 tablet"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Input 
              id="instructions" 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)} 
              placeholder="e.g., Take with food"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="as_needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timesPerDay">Times Per Day</Label>
              <Select 
                value={timesPerDay.toString()} 
                onValueChange={(value) => setTimesPerDay(parseInt(value))}
              >
                <SelectTrigger id="timesPerDay">
                  <SelectValue placeholder="Select times per day" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'time' : 'times'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input 
                id="endDate" 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="refillDate">Refill Date (Optional)</Label>
              <Input 
                id="refillDate" 
                type="date" 
                value={refillDate} 
                onChange={(e) => setRefillDate(e.target.value)} 
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Switch 
                id="refillReminder" 
                checked={refillReminder} 
                onCheckedChange={setRefillReminder} 
              />
              <Label htmlFor="refillReminder">Enable Refill Reminder</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Any additional notes"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Medication' : 'Add Medication'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationForm;
