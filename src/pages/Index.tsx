
import SymptomForm from '@/components/SymptomForm';
import { HeartPulse, MessageSquareText, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Feature = ({ icon: Icon, title, description }: { 
  icon: any, 
  title: string, 
  description: string 
}) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm transition-all hover:shadow-md">
    <div className="p-3 bg-primary/10 rounded-full mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enter Your Symptoms,{" "}
            <span className="text-primary">Get Insights & Treatment</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start your health journey by entering symptoms and get personalized insights.
            Our advanced system helps you understand your condition better.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => document.getElementById('symptom-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            How We Help You Stay Healthy
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              icon={HeartPulse}
              title="Symptom Checker"
              description="Advanced symptom analysis using medical knowledge to help identify potential conditions."
            />
            <Feature
              icon={MessageSquareText}
              title="Doctor Consultation"
              description="Connect with qualified healthcare professionals for expert medical advice."
            />
            <Feature
              icon={StarIcon}
              title="Trusted Results"
              description="Get reliable information about possible conditions and treatment options."
            />
          </div>
        </div>
      </section>

      {/* Symptom Form Section */}
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

          <div id="symptom-form">
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

export default Index;
