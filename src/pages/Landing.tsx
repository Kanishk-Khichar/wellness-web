
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Activity, Shield, Brain, HeartPulse, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-primary/20">
    <div className="p-3 bg-primary/10 rounded-full mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const Testimonial = ({ name, role, content, img }: {
  name: string;
  role: string;
  content: string;
  img: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center mb-4 gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
        <img 
          src={img || "https://via.placeholder.com/150"} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">"{content}"</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health Journey <span className="text-primary">Starts Here</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Personalized health consultations and insights delivered by experienced healthcare professionals at your fingertips.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/consultation">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 transform rotate-3 rounded-2xl"></div>
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=2574&auto=format&fit=crop"
                  alt="Doctor consulting with patient" 
                  className="relative rounded-2xl shadow-lg w-full h-auto object-cover z-10"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white p-6 rounded-xl shadow-sm">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">8,000+</p>
              <p className="text-gray-600">Patients Helped</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">100+</p>
              <p className="text-gray-600">Health Professionals</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Comprehensive Health Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a range of health services designed to address your unique needs with personalized care and expert guidance.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={HeartPulse}
              title="Advanced Symptom Analysis"
              description="Our intelligent system analyzes your symptoms to provide accurate insights about potential conditions."
            />
            <FeatureCard
              icon={MessageSquareText}
              title="Expert Consultations"
              description="Connect directly with qualified healthcare professionals for personalized medical advice."
            />
            <FeatureCard
              icon={Brain}
              title="Mental Health Support"
              description="Access resources and consultations focused on improving your mental wellbeing."
            />
            <FeatureCard
              icon={Shield}
              title="Private & Secure"
              description="Your health information is protected with enterprise-grade security and strict privacy controls."
            />
            <FeatureCard
              icon={Activity}
              title="Health Monitoring"
              description="Track your health metrics over time and receive personalized recommendations."
            />
            <FeatureCard
              icon={Calendar}
              title="Easy Scheduling"
              description="Book appointments with healthcare providers at times that work for your schedule."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thousands of people have trusted us with their health concerns. Here's what some of them have to say.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Testimonial 
              name="Sarah Johnson"
              role="Patient"
              content="The consultation service was incredibly helpful. The doctor was attentive and provided clear explanations about my condition."
              img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop"
            />
            <Testimonial 
              name="Michael Chen"
              role="Patient"
              content="I was feeling anxious about my symptoms, but after the consultation I felt reassured. The follow-up care was exceptional."
              img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop"
            />
            <Testimonial 
              name="Emily Rodriguez"
              role="Patient"
              content="The convenience of getting expert medical advice from home was amazing. I received a comprehensive treatment plan within hours."
              img="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied patients who have transformed their health journey with our guidance.
          </p>
          <Link to="/consultation">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Start Your Consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">HealthConsult</span>
              </div>
              <p className="text-gray-400">
                Providing expert healthcare consultations and personalized medical advice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Online Consultations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Assessments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mental Health Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Specialist Referrals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Doctors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HealthConsult. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
