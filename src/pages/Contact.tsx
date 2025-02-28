
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquareHeart,
  CalendarCheck,
  HelpCircle,
  Calendar,
  MessageSquare
} from "lucide-react";

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const ContactInfo = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: IconComponent; 
  title: string; 
  children: React.ReactNode;
}) => (
  <div className="flex gap-4 mb-6 animate-fadeIn">
    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team using any
            of the methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="bg-primary text-white p-4 -mx-6 -mt-6 mb-6 text-center">
                <h2 className="text-xl font-bold">Get in Touch</h2>
              </div>
              <ContactInfo icon={Mail} title="Email Us">
                <a href="mailto:support@healthconsult.com" className="text-primary hover:underline">
                  support@healthconsult.com
                </a>
              </ContactInfo>
              <ContactInfo icon={Phone} title="Call Us">
                <a href="tel:+1-800-HEALTH" className="text-primary hover:underline">
                  +1-800-HEALTH (432584)
                </a>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 8am-8pm EST</p>
              </ContactInfo>
              <ContactInfo icon={MapPin} title="Visit Us">
                <p>1234 Healthcare Avenue</p>
                <p>Suite 500</p>
                <p>San Francisco, CA 94103</p>
              </ContactInfo>
              <ContactInfo icon={Clock} title="Business Hours">
                <p>Monday - Friday: 8:00 AM - 8:00 PM EST</p>
                <p>Saturday: 9:00 AM - 5:00 PM EST</p>
                <p>Sunday: Closed</p>
              </ContactInfo>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="bg-primary text-white p-4 -mx-6 -mt-6 mb-6 text-center">
                <h2 className="text-xl font-bold">Send Us a Message</h2>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-10 text-center text-gray-900">How Can We Help You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-white rounded-full mx-auto h-16 w-16 flex items-center justify-center mb-4 shadow-sm">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Schedule a Consultation</h3>
                <p className="text-gray-600 mb-4">
                  Need to speak with one of our healthcare professionals? Schedule a consultation at your convenience.
                </p>
                <Button variant="outline" className="w-full">Schedule Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-white rounded-full mx-auto h-16 w-16 flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Live Chat Support</h3>
                <p className="text-gray-600 mb-4">
                  Have a quick question? Connect with our support team instantly through our live chat feature.
                </p>
                <Button variant="outline" className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-white rounded-full mx-auto h-16 w-16 flex items-center justify-center mb-4 shadow-sm">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">FAQ & Resources</h3>
                <p className="text-gray-600 mb-4">
                  Browse our knowledge base for answers to common questions and helpful resources.
                </p>
                <Button variant="outline" className="w-full">View Resources</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Join Our Community</h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Stay updated with the latest health tips, news, and exclusive offers by connecting with us
            on social media and subscribing to our newsletter.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="#" className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-full">
              <MessageSquareHeart className="h-6 w-6 text-primary" />
            </a>
            <a href="#" className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-full">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </a>
            <a href="#" className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </a>
            <a href="#" className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </a>
          </div>
          <div className="max-w-md mx-auto flex">
            <Input placeholder="Enter your email" className="rounded-r-none" />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
