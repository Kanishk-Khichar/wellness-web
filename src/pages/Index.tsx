
import SymptomForm from '@/components/SymptomForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Healthcare Consultation
          </h1>
          <p className="mt-2 text-gray-600">
            Describe your symptoms and get professional medical advice
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How Can We Help You Today?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please provide detailed information about your symptoms. A qualified healthcare professional will review your case and provide appropriate guidance.
            </p>
          </section>

          <SymptomForm />

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
