
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
  description: string;
  medications: string[];
  riskFactors: string[];
  preventiveMeasures: string[];
}

const symptomIcons: SymptomIcon[] = [
  { 
    icon: HeartPulse, 
    label: "Cardiovascular", 
    id: "heart",
    description: "Cardiovascular symptoms may indicate conditions affecting your heart and blood vessels. Early detection is crucial for effective treatment.",
    causes: [
      "High blood pressure",
      "High cholesterol",
      "Smoking",
      "Physical inactivity",
      "Obesity",
      "Diabetes",
      "Family history",
      "Age and gender"
    ],
    precautions: [
      "Regular exercise (at least 30 minutes daily)",
      "Heart-healthy diet rich in fruits and vegetables",
      "Regular blood pressure monitoring",
      "Stress management through meditation or yoga",
      "Quit smoking and limit alcohol",
      "Maintain healthy weight",
      "Regular health checkups",
      "Adequate sleep (7-9 hours)"
    ],
    medications: [
      "Beta blockers",
      "ACE inhibitors",
      "Statins",
      "Anticoagulants"
    ],
    riskFactors: [
      "Advanced age",
      "Family history of heart disease",
      "Sedentary lifestyle",
      "Poor diet"
    ],
    preventiveMeasures: [
      "Regular cardiovascular screening",
      "Blood pressure management",
      "Cholesterol monitoring",
      "Weight management"
    ]
  },
  { 
    icon: Brain, 
    label: "Neurological", 
    id: "brain",
    description: "Neurological symptoms involve the brain, spine, and nerves. Understanding these symptoms helps in early intervention.",
    causes: [
      "Head trauma",
      "Genetic factors",
      "Infections",
      "Sleep disorders",
      "Chronic stress",
      "Autoimmune conditions",
      "Tumors",
      "Vascular problems"
    ],
    precautions: [
      "Wear protective gear during activities",
      "Get adequate sleep (7-9 hours nightly)",
      "Practice stress reduction techniques",
      "Regular mental exercises and puzzles",
      "Stay hydrated and maintain nutrition",
      "Avoid excessive alcohol",
      "Regular exercise",
      "Mental health maintenance"
    ],
    medications: [
      "Anticonvulsants",
      "Pain relievers",
      "Anti-inflammatory drugs",
      "Antidepressants"
    ],
    riskFactors: [
      "Age",
      "Family history",
      "Previous head injuries",
      "Substance abuse"
    ],
    preventiveMeasures: [
      "Regular neurological checkups",
      "Brain-stimulating activities",
      "Proper nutrition",
      "Stress management"
    ]
  },
  { 
    icon: Pill, 
    label: "Digestive", 
    id: "digestive",
    description: "Digestive issues can significantly impact daily life. Understanding your symptoms helps in managing digestive health effectively.",
    causes: [
      "Poor diet",
      "Food intolerances",
      "Stress",
      "Bacterial infections",
      "Medication side effects",
      "Inflammatory conditions",
      "Enzyme deficiencies",
      "Lifestyle factors"
    ],
    precautions: [
      "Eat a balanced diet with fiber",
      "Stay hydrated throughout the day",
      "Regular meal times",
      "Avoid trigger foods",
      "Manage stress levels",
      "Chew food thoroughly",
      "Limit alcohol and caffeine",
      "Regular exercise"
    ],
    medications: [
      "Antacids",
      "Probiotics",
      "Anti-inflammatory medications",
      "Digestive enzymes"
    ],
    riskFactors: [
      "Poor dietary habits",
      "Stress",
      "Genetic factors",
      "Medical conditions"
    ],
    preventiveMeasures: [
      "Regular digestive health screenings",
      "Food diary maintenance",
      "Stress management",
      "Dietary modifications"
    ]
  },
  { 
    icon: Bone, 
    label: "Musculoskeletal", 
    id: "bone",
    description: "Musculoskeletal conditions affect bones, muscles, and joints. Early intervention can prevent long-term complications.",
    causes: [
      "Poor posture",
      "Overuse injuries",
      "Lack of exercise",
      "Age-related changes",
      "Trauma or accidents",
      "Genetic factors",
      "Inflammatory conditions",
      "Occupational hazards"
    ],
    precautions: [
      "Maintain good posture",
      "Regular strength training",
      "Proper lifting techniques",
      "Adequate calcium and vitamin D",
      "Weight management",
      "Ergonomic workspace setup",
      "Regular stretching",
      "Joint-friendly exercises"
    ],
    medications: [
      "Pain relievers",
      "Anti-inflammatory drugs",
      "Muscle relaxants",
      "Bone strengtheners"
    ],
    riskFactors: [
      "Age",
      "Sedentary lifestyle",
      "Obesity",
      "Previous injuries"
    ],
    preventiveMeasures: [
      "Regular bone density screenings",
      "Exercise program",
      "Proper nutrition",
      "Ergonomic adjustments"
    ]
  },
  { 
    icon: Thermometer, 
    label: "Fever/Pain", 
    id: "fever",
    description: "Fever and pain are common symptoms that can indicate various underlying conditions. Proper monitoring is essential.",
    causes: [
      "Infections",
      "Inflammation",
      "Dehydration",
      "Overexertion",
      "Environmental factors",
      "Autoimmune responses",
      "Injuries",
      "Medical conditions"
    ],
    precautions: [
      "Stay hydrated",
      "Rest adequately",
      "Monitor temperature regularly",
      "Maintain hygiene",
      "Seek medical attention if severe",
      "Proper medication timing",
      "Environmental control",
      "Regular health monitoring"
    ],
    medications: [
      "Antipyretics",
      "Pain relievers",
      "Anti-inflammatory drugs",
      "Antibiotics (if prescribed)"
    ],
    riskFactors: [
      "Weak immune system",
      "Chronic conditions",
      "Environmental exposure",
      "Poor nutrition"
    ],
    preventiveMeasures: [
      "Regular health checkups",
      "Immunizations",
      "Good hygiene practices",
      "Healthy lifestyle"
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

  const selectedSymptom = showInfo ? symptomIcons.find(s => s.id === showInfo) : null;

  return (
    <Card className="p-6 w-full max-w-4xl mx-auto bg-white shadow-lg animate-fadeIn">
      <div className="flex items-center gap-2 mb-6">
        <Stethoscope className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-gray-800">Describe Your Symptoms</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {symptomIcons.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleIconClick(id)}
              onMouseEnter={() => setShowInfo(id)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedSymptoms.includes(id)
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium text-center">{label}</span>
            </button>
          ))}
        </div>

        {selectedSymptom && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-primary">
                {selectedSymptom.label}
              </h3>
              <button
                onClick={() => setShowInfo(null)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{selectedSymptom.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Common Causes:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedSymptom.causes.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Risk Factors:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedSymptom.riskFactors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Precautions:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedSymptom.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Preventive Measures:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedSymptom.preventiveMeasures.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Common Medications:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {selectedSymptom.medications.map((medication, index) => (
                  <li key={index}>{medication}</li>
                ))}
              </ul>
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
