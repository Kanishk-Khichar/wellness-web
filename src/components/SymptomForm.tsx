
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Stethoscope, 
  HeartPulse, 
  Brain, 
  Pill, 
  Bone, 
  Thermometer,
  LucideIcon 
} from 'lucide-react';

interface SymptomIcon {
  icon: LucideIcon;
  label: string;
  id: string;
}

const symptomIcons: SymptomIcon[] = [
  { icon: HeartPulse, label: "Cardiovascular", id: "heart" },
  { icon: Brain, label: "Neurological", id: "brain" },
  { icon: Pill, label: "Digestive", id: "digestive" },
  { icon: Bone, label: "Musculoskeletal", id: "bone" },
  { icon: Thermometer, label: "Fever/Pain", id: "fever" },
];

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const { toast } = useToast();

  const handleIconClick = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() && selectedSymptoms.length === 0) {
      toast({
        title: "Please describe your symptoms",
        description: "We need this information to help you better.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Consultation request sent",
      description: "A doctor will review your symptoms shortly.",
    });
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto bg-white shadow-lg animate-fadeIn">
      <div className="flex items-center gap-2 mb-6">
        <Stethoscope className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-gray-800">Describe Your Symptoms</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Symptom Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {symptomIcons.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleIconClick(id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                selectedSymptoms.includes(id)
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-sm text-center">{label}</span>
            </button>
          ))}
        </div>

        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Please describe your symptoms in detail. Include when they started and any relevant medical history..."
          className="min-h-[200px] p-4 text-gray-700"
        />
        
        <Button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white transition-colors"
        >
          Request Consultation
        </Button>
      </form>
    </Card>
  );
};

export default SymptomForm;
