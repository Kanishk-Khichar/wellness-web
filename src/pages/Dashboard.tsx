
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatAssistant from '@/components/ChatAssistant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Activity, Calendar, FileText, Info, GraduationCap, BookOpen, Clock, HeartPulse, Pill, BadgeAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MedicationList from '@/components/medications/MedicationList';
import MedicationHistory from '@/components/medications/MedicationHistory';

// Types for learning resources and health records
interface LearningResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'faq';
  category: string;
  description: string;
  timeToComplete: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  nextDue: string;
}

interface Appointment {
  id: string;
  type: string;
  provider: string;
  date: string;
  location: string;
}

// Sample learning resources data
const learningResources: LearningResource[] = [
  {
    id: '1',
    title: 'Understanding Blood Pressure',
    type: 'article',
    category: 'Heart Health',
    description: 'Learn about the importance of monitoring blood pressure and what your numbers mean.',
    timeToComplete: '5 min',
    level: 'beginner'
  },
  {
    id: '2',
    title: 'Nutrition Basics for Diabetics',
    type: 'video',
    category: 'Diabetes',
    description: 'Essential nutritional guidelines for managing diabetes effectively.',
    timeToComplete: '12 min',
    level: 'intermediate'
  },
  {
    id: '3',
    title: 'Stress Management Techniques',
    type: 'article',
    category: 'Mental Health',
    description: 'Practical techniques to reduce stress and improve mental wellbeing.',
    timeToComplete: '8 min',
    level: 'beginner'
  },
  {
    id: '4',
    title: 'Common Questions About Vaccinations',
    type: 'faq',
    category: 'Preventive Care',
    description: 'Answers to frequently asked questions about vaccines and immunization.',
    timeToComplete: '6 min',
    level: 'beginner'
  },
  {
    id: '5',
    title: 'Advanced Exercise for Joint Health',
    type: 'video',
    category: 'Physical Fitness',
    description: 'Specialized exercises designed to strengthen joints and prevent injury.',
    timeToComplete: '15 min',
    level: 'advanced'
  }
];

// Sample medications data
const medications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Once daily',
    nextDue: 'Today, 8:00 PM'
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    schedule: 'Twice daily',
    nextDue: 'Today, 12:00 PM'
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    schedule: 'Once daily at bedtime',
    nextDue: 'Today, 10:00 PM'
  }
];

// Sample appointments data
const appointments: Appointment[] = [
  {
    id: '1',
    type: 'Annual Physical',
    provider: 'Dr. Sarah Johnson',
    date: 'June 15, 2023 - 10:30 AM',
    location: 'Main Street Clinic'
  },
  {
    id: '2',
    type: 'Dental Checkup',
    provider: 'Dr. Michael Chen',
    date: 'July 3, 2023 - 2:00 PM',
    location: 'Smile Dental Care'
  },
  {
    id: '3',
    type: 'Eye Examination',
    provider: 'Dr. Lisa Patel',
    date: 'July 21, 2023 - 11:15 AM',
    location: 'Vision Care Center'
  }
];

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  
  // Filter learning resources based on selected category and level
  const filteredResources = learningResources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || resource.level === selectedLevel;
    return categoryMatch && levelMatch;
  });
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(learningResources.map(r => r.category))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <section>
            <h1 className="text-3xl font-bold text-gray-900">Your Health Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Monitor your health, get personalized recommendations, and manage your care all in one place.
            </p>
          </section>

          <Tabs defaultValue="assistant" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="assistant" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>AI Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Learning Resources</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                <span>Medications</span>
              </TabsTrigger>
              <TabsTrigger value="health-records" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Health Records</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Health Metrics</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </TabsTrigger>
            </TabsList>

            {/* AI Assistant Tab */}
            <TabsContent value="assistant" className="mt-6">
              <div className="mb-6">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-700">About the AI Healthcare Assistant</h3>
                      <p className="text-sm text-blue-600 mt-1">
                        Our AI assistant can help analyze symptoms, provide health recommendations, and 
                        suggest preliminary diagnoses. While the assistant uses medical knowledge, it's 
                        not a replacement for professional medical advice.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <ChatAssistant />
            </TabsContent>

            {/* Learning Resources Tab */}
            <TabsContent value="education" className="mt-6 animate-fadeIn">
              <div className="mb-6">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-green-700">Personalized Learning Resources</h3>
                      <p className="text-sm text-green-600 mt-1">
                        Access educational content tailored to your health profile. Browse articles, 
                        videos, and FAQs to better understand and manage your health conditions.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Learning Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <span className={`px-2 py-1 rounded text-xs font-medium
                          ${resource.type === 'article' ? 'bg-blue-100 text-blue-800' : 
                            resource.type === 'video' ? 'bg-red-100 text-red-800' : 
                            'bg-purple-100 text-purple-800'}`}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.timeToComplete}
                        </span>
                        <span className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
                        </span>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        {resource.type === 'video' ? 'Watch Now' : 'Read Now'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No resources found</h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your filters to find more learning materials.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Medications Tab */}
            <TabsContent value="medications" className="mt-6 animate-fadeIn">
              <div className="mb-6">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <Pill className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-700">Medication Reminder System</h3>
                      <p className="text-sm text-blue-600 mt-1">
                        Never miss a dose with our smart reminder system. Track your medications, get timely notifications, 
                        and monitor your adherence for better health outcomes.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="current" className="flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    <span>Current Medications</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Medication History</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="mt-0">
                  <MedicationList />
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <MedicationHistory />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Health Records Tab */}
            <TabsContent value="health-records" className="mt-6 animate-fadeIn">
              <div className="mb-6">
                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-purple-700">AI-Powered Health Record System</h3>
                      <p className="text-sm text-purple-600 mt-1">
                        Securely store and manage your health information. Our AI provides personalized
                        insights and reminders based on your health history.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Health Records Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Medications Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <Pill className="h-5 w-5 mr-2 text-primary" />
                        Medications
                      </CardTitle>
                      <Button variant="outline" size="sm">Add New</Button>
                    </div>
                    <CardDescription>Track and manage your prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {medications.length > 0 ? (
                      <div className="space-y-4">
                        {medications.map(med => (
                          <div key={med.id} className="p-3 rounded-md bg-gray-50 border">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{med.name} ({med.dosage})</h4>
                                <p className="text-sm text-gray-500">{med.schedule}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-500">Next dose:</span>
                                <span className="text-sm font-medium text-primary">{med.nextDue}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-6 text-gray-500">No medications found</p>
                    )}
                  </CardContent>
                </Card>

                {/* Appointments Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        Upcoming Appointments
                      </CardTitle>
                      <Button variant="outline" size="sm">Schedule</Button>
                    </div>
                    <CardDescription>Keep track of your healthcare appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {appointments.length > 0 ? (
                      <div className="space-y-4">
                        {appointments.map(appt => (
                          <div key={appt.id} className="p-3 rounded-md bg-gray-50 border">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{appt.type}</h4>
                                <p className="text-sm text-gray-700">{appt.provider}</p>
                                <p className="text-sm text-gray-500">{appt.location}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-primary">{appt.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-6 text-gray-500">No upcoming appointments</p>
                    )}
                  </CardContent>
                </Card>

                {/* Health Alerts Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BadgeAlert className="h-5 w-5 mr-2 text-primary" />
                      Health Alerts
                    </CardTitle>
                    <CardDescription>Important notifications about your health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 rounded-md bg-amber-50 border border-amber-200">
                      <div className="flex gap-3">
                        <BadgeAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-amber-800">Blood Pressure Check Due</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            It's been 30 days since your last blood pressure reading. Consider taking a measurement soon.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 bg-white">
                            Record Reading
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personalized Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <HeartPulse className="h-5 w-5 mr-2 text-primary" />
                      AI Recommendations
                    </CardTitle>
                    <CardDescription>Personalized health suggestions based on your records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-md bg-green-50 border border-green-200">
                        <h4 className="font-medium text-green-800">Consider a flu vaccination</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Based on your health history and the upcoming flu season, a vaccination would be beneficial.
                        </p>
                      </div>
                      <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                        <h4 className="font-medium text-blue-800">Review your vitamin D levels</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Your last lab results showed slightly low vitamin D. Consider discussing supplementation with your doctor.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="health">
              <div className="text-center py-12">
                <Activity className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Health Metrics Coming Soon</h3>
                <p className="mt-2 text-gray-500">
                  Track your vital signs, exercise, sleep patterns, and other health metrics.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Appointments Coming Soon</h3>
                <p className="mt-2 text-gray-500">
                  Schedule and manage your healthcare appointments in one place.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
