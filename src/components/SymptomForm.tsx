
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope } from 'lucide-react';

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
