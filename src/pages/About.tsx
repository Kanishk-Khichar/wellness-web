
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HeartPulse, 
  ShieldCheck, 
  Award, 
  Users2, 
  Stethoscope, 
  UserPlus, 
  Headphones, 
  CheckCircle2
} from "lucide-react";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const AboutSection = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: IconComponent; 
  title: string; 
  children: React.ReactNode;
}) => (
  <div className="flex flex-col md:flex-row items-start gap-4 mb-12 animate-fadeIn">
    <div className="bg-primary rounded-full p-4 mb-4 md:mb-0">
      <Icon className="h-10 w-10 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About HealthConsult</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to revolutionizing healthcare by providing accessible, personalized
            consultation services to everyone, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              HealthConsult was founded with a simple yet powerful mission: to connect patients with healthcare
              professionals in a way that's convenient, affordable, and effective.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that everyone deserves access to quality healthcare, regardless of location or
              circumstances. Our platform breaks down traditional barriers to healthcare by leveraging
              technology to facilitate meaningful consultations.
            </p>
            <p className="text-gray-600">
              Through our innovative approach, we're making healthcare more accessible, streamlined, and
              patient-centered than ever before.
            </p>
          </div>
          <div>
            <Card className="h-full flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Our Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-medium">Patient-Centered Care</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-medium">Innovation & Technology</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-medium">Accessibility & Inclusivity</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-medium">Privacy & Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-medium">Excellence & Continuous Improvement</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-10 text-center text-gray-900">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <AboutSection icon={HeartPulse} title="Patient-First Approach">
            <p>
              We design every aspect of our service with patients' needs in mind. Our platform prioritizes
              your comfort, convenience, and care outcomes above all else.
            </p>
          </AboutSection>

          <AboutSection icon={ShieldCheck} title="Privacy & Security">
            <p>
              Your health information is sensitive and private. We employ industry-leading security
              measures to ensure your data remains confidential and protected at all times.
            </p>
          </AboutSection>

          <AboutSection icon={Award} title="Qualified Professionals">
            <p>
              Our network consists of verified, experienced healthcare providers across numerous
              specialties. We carefully vet each professional to ensure quality care.
            </p>
          </AboutSection>

          <AboutSection icon={Users2} title="Community Focus">
            <p>
              We're building more than a service—we're creating a community where patients and healthcare
              providers can connect, share knowledge, and improve health outcomes together.
            </p>
          </AboutSection>
        </div>

        <div className="mt-24 bg-primary text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <p className="text-center mb-12">
            HealthConsult brings together experts in healthcare, technology, and patient advocacy
            who share a passion for transforming how healthcare is delivered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full p-5 mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                <Stethoscope className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Medical Experts</h3>
              <p className="text-sm">Ensuring clinical excellence and best practices</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-5 mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                <UserPlus className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Patient Advocates</h3>
              <p className="text-sm">Championing your needs and improving user experience</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-5 mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                <Headphones className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Support Team</h3>
              <p className="text-sm">Available to assist you every step of the way</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full p-5 mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                <Users2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Tech Innovators</h3>
              <p className="text-sm">Building the future of healthcare technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
