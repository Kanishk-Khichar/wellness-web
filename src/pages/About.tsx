
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { 
  Award, 
  HeartPulse, 
  UserRound, 
  Building, 
  Stethoscope, 
  Clock, 
  GraduationCap, 
  CheckCircle2
} from "lucide-react";

const AboutSection = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ElementRef<typeof HeartPulse>; 
  title: string; 
  children: React.ReactNode;
}) => (
  <div className="flex flex-col md:flex-row gap-4 items-start py-6 border-b border-gray-100 last:border-0">
    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
      <div className="text-gray-600 space-y-2">
        {children}
      </div>
    </div>
  </div>
);

const TeamMember = ({ 
  name, 
  role, 
  image, 
  education, 
  specialization 
}: { 
  name: string; 
  role: string; 
  image: string; 
  education: string; 
  specialization: string;
}) => (
  <Card className="overflow-hidden transition-all hover:shadow-md group">
    <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="text-white">
          <p className="font-light text-sm">{education}</p>
          <p className="text-xs opacity-80">{specialization}</p>
        </div>
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-500 text-sm">{role}</p>
    </CardContent>
  </Card>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About HealthConsult</h1>
          <p className="text-xl text-gray-600">
            Committed to revolutionizing healthcare through technology and compassion.
          </p>
        </div>
        
        <Tabs defaultValue="mission" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100/70 p-1">
              <TabsTrigger value="mission" className="px-4 py-2">Our Mission</TabsTrigger>
              <TabsTrigger value="team" className="px-4 py-2">Our Team</TabsTrigger>
              <TabsTrigger value="values" className="px-4 py-2">Our Values</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="mission" className="space-y-8 animate-fadeIn px-4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                <AboutSection icon={HeartPulse} title="Our Mission">
                  <p>
                    At HealthConsult, our mission is to make quality healthcare accessible to everyone, 
                    everywhere. We leverage technology to bridge the gap between patients and healthcare 
                    professionals, providing timely, accurate, and personalized medical consultations.
                  </p>
                </AboutSection>
                
                <AboutSection icon={Award} title="Our Story">
                  <p>
                    Founded in 2020, HealthConsult began as a response to the global pandemic that 
                    highlighted the need for remote healthcare solutions. What started as a small 
                    team of doctors and engineers has grown into a comprehensive platform serving 
                    thousands of patients daily.
                  </p>
                </AboutSection>
                
                <AboutSection icon={Building} title="Our Approach">
                  <p>
                    We combine cutting-edge technology with human expertise to deliver healthcare 
                    consultations that are both efficient and empathetic. Our AI-powered symptom 
                    analysis works alongside experienced medical professionals to ensure you receive 
                    accurate information and personalized care.
                  </p>
                </AboutSection>
                
                <AboutSection icon={UserRound} title="Patient-Centered Care">
                  <p>
                    Everything we do is centered around you, the patient. We prioritize your comfort, 
                    privacy, and wellbeing in every interaction. Our platform is designed to be 
                    intuitive, accessible, and supportive throughout your health journey.
                  </p>
                </AboutSection>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="animate-fadeIn px-4">
            <h2 className="text-2xl font-semibold text-center mb-8">Meet Our Experts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TeamMember 
                name="Dr. Sarah Johnson" 
                role="Chief Medical Officer" 
                image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                education="MD, Harvard Medical School"
                specialization="Internal Medicine"
              />
              <TeamMember 
                name="Dr. Michael Chen" 
                role="Head of Cardiology" 
                image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                education="MD, Johns Hopkins University"
                specialization="Cardiology"
              />
              <TeamMember 
                name="Dr. Emily Rodriguez" 
                role="Head of Pediatrics" 
                image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                education="MD, University of California"
                specialization="Pediatrics"
              />
              <TeamMember 
                name="Dr. James Wilson" 
                role="Chief Technology Officer" 
                image="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                education="PhD, MIT"
                specialization="AI & Healthcare"
              />
              <TeamMember 
                name="Dr. Sophia Park" 
                role="Head of Psychiatry" 
                image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                education="MD, Stanford University"
                specialization="Psychiatry"
              />
              <TeamMember 
                name="Dr. Robert Taylor" 
                role="Head of Research" 
                image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                education="MD, PhD, Yale University"
                specialization="Preventive Medicine"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="values" className="animate-fadeIn px-4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
                  <p className="text-gray-600">
                    These principles guide every decision we make and every service we provide.
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Excellence</h3>
                    </div>
                    <p className="text-gray-600">
                      We strive for excellence in everything we do, from our technology to our 
                      patient interactions.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Compassion</h3>
                    </div>
                    <p className="text-gray-600">
                      We approach every patient with empathy and understanding, recognizing that 
                      healthcare is deeply personal.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Innovation</h3>
                    </div>
                    <p className="text-gray-600">
                      We continuously seek new ways to improve healthcare delivery through 
                      technology and creative thinking.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Integrity</h3>
                    </div>
                    <p className="text-gray-600">
                      We maintain the highest ethical standards in all our practices, prioritizing 
                      honesty and transparency.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Accessibility</h3>
                    </div>
                    <p className="text-gray-600">
                      We believe healthcare should be accessible to everyone, regardless of 
                      location or circumstance.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Diversity</h3>
                    </div>
                    <p className="text-gray-600">
                      We celebrate diversity in our team and patients, recognizing that different 
                      perspectives enhance our care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 bg-primary/5 rounded-xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 bg-white p-4 rounded-full shadow-sm">
              <Stethoscope className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Join Our Mission</h2>
              <p className="text-gray-600 mb-4">
                We're always looking for talented medical professionals and technologists who are 
                passionate about transforming healthcare.
              </p>
              <a 
                href="#" 
                className="inline-block bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg transition-colors"
              >
                View Career Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-12">HealthConsult in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="flex items-center justify-center">
                <UserRound className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">Medical Experts</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="flex items-center justify-center">
                <HeartPulse className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">Consultations</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="flex items-center justify-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">Availability</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">Specializations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
