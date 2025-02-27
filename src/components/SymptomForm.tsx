
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
  LucideIcon,
  X
} from 'lucide-react';

interface SymptomIcon {
  icon: LucideIcon;
  label: string;
  id: string;
  causes: string[];
  precautions: string[];
}

const symptomIcons: SymptomIcon[] = [
  { 
    icon: HeartPulse, 
    label: "Cardiovascular", 
    id: "heart",
    causes: [
      "High blood pressure",
      "High cholesterol",
      "Smoking",
      "Physical inactivity",
      "Obesity"
    ],
    precautions: [
      "Regular exercise",
      "Healthy diet low in saturated fats",
      "Regular blood pressure monitoring",
      "Stress management",
      "Quit smoking"
    ]
  },
  { 
    icon: Brain, 
    label: "Neurological", 
    id: "brain",
    causes: [
      "Head trauma",
      "Genetic factors",
      "Infections",
      "Sleep disorders",
      "Stress"
    ],
    precautions: [
      "Wear protective gear during activities",
      "Get adequate sleep",
      "Practice stress reduction",
      "Regular mental exercises",
      "Stay hydrated"
    ]
  },
  { 
    icon: Pill, 
    label: "Digestive", 
    id: "digestive",
    causes: [
      "Poor diet",
      "Food intolerances",
      "Stress",
      "Bacterial infections",
      "Medication side effects"
    ],
    precautions: [
      "Eat a balanced diet",
      "Stay hydrated",
      "Regular meal times",
      "Avoid trigger foods",
      "Manage stress levels"
    ]
  },
  { 
    icon: Bone, 
    label: "Musculoskeletal", 
    id: "bone",
    causes: [
      "Poor posture",
      "Overuse injuries",
      "Lack of exercise",
      "Age-related changes",
      "Trauma"
    ],
    precautions: [
      "Maintain good posture",
      "Regular exercise",
      "Proper lifting techniques",
      "Adequate calcium intake",
      "Weight management"
    ]
  },
  { 
    icon: Thermometer, 
    label: "Fever/Pain", 
    id: "fever",
    causes: [
      "Infections",
      "Inflammation",
      "Dehydration",
      "Overexertion",
      "Environmental factors"
    ],
    precautions: [
      "Stay hydrated",
      "Rest adequately",
      "Monitor temperature",
      "Maintain hygiene",
      "Seek medical attention if severe"
    ]
  },
];

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState<string | null>(null);
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
              onMouseEnter={() => setShowInfo(id)}
              onMouseLeave={() => setShowInfo(null)}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-sm text-center">{label}</span>
            </button>
          ))}
        </div>

        {/* Information Display */}
        {showInfo && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-primary">
                {symptomIcons.find(s => s.id === showInfo)?.label}
              </h3>
              <button
                onClick={() => setShowInfo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Common Causes:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {symptomIcons.find(s => s.id === showInfo)?.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Precautions:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {symptomIcons.find(s => s.id === showInfo)?.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

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
