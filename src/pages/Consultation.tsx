
import SymptomForm from '@/components/SymptomForm';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Consultation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How Can We Help You Today?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please provide detailed information about your symptoms. A qualified healthcare professional will review your case and provide appropriate guidance.
            </p>
          </section>

          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium text-gray-800">Try Our New AI Health Assistant</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get instant feedback on your symptoms, personalized health recommendations, and preliminary diagnosis suggestions from our AI-powered healthcare assistant.
            </p>
            <Link to="/dashboard">
              <Button className="bg-primary hover:bg-primary/90">
                Go to AI Health Assistant
              </Button>
            </Link>
          </div>

          <div>
            <SymptomForm />
          </div>

          <section className="mt-8 text-center text-sm text-gray-500">
            <p>
              In case of emergency, please dial your local emergency services immediately.
              This service is not a substitute for emergency medical care.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Consultation;
