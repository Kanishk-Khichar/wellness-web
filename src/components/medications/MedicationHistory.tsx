
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Medication, MedicationHistory as MedicationHistoryType } from '@/models/medication';
import { loadMedications, loadHistory } from '@/services/medicationService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const MedicationHistory = () => {
  const [history, setHistory] = useState<MedicationHistoryType[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<MedicationHistoryType[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Load history and medications on component mount
  useEffect(() => {
    setMedications(loadMedications());
    setHistory(loadHistory());
  }, []);
  
  // Update filtered history whenever filters change
  useEffect(() => {
    let filtered = [...history];
    
    // Filter by medication
    if (selectedMedication !== 'all') {
      filtered = filtered.filter(h => h.medicationId === selectedMedication);
    }
    
    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(h => h.date >= startDate);
    }
    
    if (endDate) {
      filtered = filtered.filter(h => h.date <= endDate);
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(h => {
        if (statusFilter === 'taken') return h.taken;
        if (statusFilter === 'missed') return !h.taken;
        return true;
      });
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredHistory(filtered);
  }, [history, selectedMedication, startDate, endDate, statusFilter]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Format time for display
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Get medication name by ID
  const getMedicationName = (id: string) => {
    const medication = medications.find(m => m.id === id);
    return medication ? medication.name : 'Unknown Medication';
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedMedication('all');
    setStartDate('');
    setEndDate('');
    setStatusFilter('all');
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center">
        <Clock className="mr-2 h-5 w-5 text-primary" />
        Medication History
      </h2>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Medication</label>
              <Select value={selectedMedication} onValueChange={setSelectedMedication}>
                <SelectTrigger>
                  <SelectValue placeholder="All Medications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Medications</SelectItem>
                  {medications.map(med => (
                    <SelectItem key={med.id} value={med.id}>{med.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="taken">Taken</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetFilters}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>
      
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map(item => (
            <Card key={item.id} className={cn(
              "overflow-hidden",
              item.taken ? "border-green-100" : "border-red-100"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{getMedicationName(item.medicationId)}</h3>
                    <p className="text-sm text-gray-500">
                      {item.dosage}
                      {item.notes && ` - ${item.notes}`}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{formatDate(item.date)}</span>
                    </div>
                    
                    {item.takenAt && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{formatTime(item.takenAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-2">
                  <span 
                    className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                      item.taken 
                        ? "bg-green-50 text-green-700" 
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {item.taken ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Taken
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3 mr-1" />
                        Missed
                      </>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-xl font-semibold text-gray-700">No history found</h3>
          <p className="text-gray-500 mt-1">
            {history.length > 0 
              ? "Try adjusting your filters to see more results"
              : "Start tracking your medications to build history"}
          </p>
          
          {history.length > 0 && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicationHistory;
