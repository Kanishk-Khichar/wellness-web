
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatAssistant from '@/components/ChatAssistant';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Activity, Calendar, FileText, Info } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <section>
            <h1 className="text-3xl font-bold text-gray-900">Your Health Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Monitor your health, get personalized recommendations, and chat with our AI assistant.
            </p>
          </section>

          <Tabs defaultValue="assistant" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="assistant" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>AI Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Health Metrics</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </TabsTrigger>
              <TabsTrigger value="records" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Records</span>
              </TabsTrigger>
            </TabsList>

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

            <TabsContent value="records">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Medical Records Coming Soon</h3>
                <p className="mt-2 text-gray-500">
                  Access and manage your medical records securely.
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
