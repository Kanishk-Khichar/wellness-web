
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pills, Search, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Medication } from '@/models/medication';
import MedicationItem from './MedicationItem';
import MedicationForm from './MedicationForm';
import { loadMedications, deleteMedication, initializeReminderSystem } from '@/services/medicationService';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MedicationList = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | undefined>(undefined);
  const [deletingMedicationId, setDeletingMedicationId] = useState<string | null>(null);
  
  // Initialize medication reminders
  useEffect(() => {
    const cleanupReminders = initializeReminderSystem();
    
    // Load medications from localStorage
    const loadMeds = () => {
      const meds = loadMedications();
      setMedications(meds);
    };
    
    loadMeds();
    
    // Set up an interval to refresh medications regularly
    const intervalId = setInterval(loadMeds, 60000);
    
    // Cleanup on component unmount
    return () => {
      cleanupReminders();
      clearInterval(intervalId);
    };
  }, []);
  
  // Filtered medications based on search term
  const filteredMedications = medications.filter(
    med => med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle medication edit
  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setIsFormOpen(true);
  };
  
  // Handle medication delete
  const confirmDelete = (medicationId: string) => {
    setDeletingMedicationId(medicationId);
  };
  
  const handleDelete = () => {
    if (deletingMedicationId) {
      try {
        deleteMedication(deletingMedicationId);
        setMedications(medications.filter(med => med.id !== deletingMedicationId));
        toast({
          title: 'Medication Deleted',
          description: 'The medication has been removed from your list.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete medication.',
          variant: 'destructive',
        });
      } finally {
        setDeletingMedicationId(null);
      }
    }
  };
  
  // Handle adding a new medication
  const handleAddMedication = () => {
    setEditingMedication(undefined);
    setIsFormOpen(true);
  };
  
  // Handle form save
  const handleSave = () => {
    // Reload medications after save
    setMedications(loadMedications());
  };
  
  // Manually refresh medications
  const refreshMedications = () => {
    setMedications(loadMedications());
    toast({
      title: 'Refreshed',
      description: 'Your medication list has been refreshed.',
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Pills className="mr-2 h-5 w-5 text-primary" />
          Medications
        </h2>
        <Button onClick={handleAddMedication} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Medication
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={refreshMedications}
          title="Refresh medications"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      {filteredMedications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedications.map(medication => (
            <MedicationItem
              key={medication.id}
              medication={medication}
              onEdit={handleEdit}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Pills className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-xl font-semibold text-gray-700">No medications found</h3>
          <p className="text-gray-500 mt-1">
            {searchTerm
              ? `No results for "${searchTerm}"`
              : "You haven't added any medications yet"}
          </p>
          {searchTerm ? (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </Button>
          ) : (
            <Button
              className="mt-4"
              onClick={handleAddMedication}
            >
              Add your first medication
            </Button>
          )}
        </div>
      )}
      
      {/* Medication Form Dialog */}
      <MedicationForm
        medication={editingMedication}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingMedicationId} onOpenChange={(open) => !open && setDeletingMedicationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this medication? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MedicationList;
