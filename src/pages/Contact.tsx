
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  MessageSquareHeart,
  CalendarCheck,
  HelpCircle
} from "lucide-react";

const ContactInfo = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ElementRef<typeof Mail>; 
  title: string; 
  children: React.ReactNode;
}) => (
  <div className="flex items-start space-x-4 p-4">
    <div className="bg-primary/10 p-3 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <div className="mt-1 text-gray-600">{children}</div>
    </div>
  </div>
);

const FAQ = ({ 
  question, 
  answer 
}: { 
  question: string; 
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex w-full justify-between items-center py-4 text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions or need assistance? We're here to help.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MessageSquareHeart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">General Inquiries</h3>
              <p className="text-gray-600 mb-4">
                Have questions about our services or how HealthConsult works?
              </p>
              <Button className="mt-auto w-full" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CalendarCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Schedule a Demo</h3>
              <p className="text-gray-600 mb-4">
                See how HealthConsult can help your organization deliver better care.
              </p>
              <Button className="mt-auto w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-gray-600 mb-4">
                Need technical assistance or have issues with your account?
              </p>
              <Button className="mt-auto w-full" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Get Support
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-2">
                  <ContactInfo icon={Mail} title="Email Us">
                    <a href="mailto:info@healthconsult.com" className="hover:text-primary transition-colors">
                      info@healthconsult.com
                    </a>
                  </ContactInfo>
                  
                  <ContactInfo icon={Phone} title="Call Us">
                    <a href="tel:+18005551234" className="hover:text-primary transition-colors">
                      +1 (800) 555-1234
                    </a>
                  </ContactInfo>
                  
                  <ContactInfo icon={MapPin} title="Visit Us">
                    <address className="not-italic">
                      123 Health Avenue<br />
                      San Francisco, CA 94103<br />
                      United States
                    </address>
                  </ContactInfo>
                  
                  <ContactInfo icon={Clock} title="Business Hours">
                    <p>Monday - Friday: 9:00 AM - 8:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </ContactInfo>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                      <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.7.3c-.1 0-.3.1-.4.1-.4.1-.7.2-1.1.2-.7.1-1.3.3-1.9.5-.9.4-1.7.9-2.4 1.6-.1.1-.2.1-.3.2-.5.5-1 1.1-1.4 1.7l-.1.1c-.2.3-.4.6-.5.9v.1c-.7-.3-1.3-.6-1.9-.9-.1-.1-.3-.1-.4-.2-1.6-.7-3.2-1.1-4.9-1.1-.2 0-.5 0-.7.1C1.4 3.9.2 6.6.2 9.5v.2c0 .6.1 1.1.2 1.6 0 .1 0 .2.1.2.1.2.1.4.2.6v.2c.1.4.3.7.4 1.1 0 .1.1.2.1.2l.1.1c.1.3.3.6.5.9.1.1.1.2.2.3.2.2.3.5.5.7l.2.2c.3.3.5.7.8 1 .1.1.2.2.3.2.2.2.5.4.7.5.1.1.2.1.3.2.3.2.7.4 1 .5.1 0 .1.1.2.1.4.2.8.3 1.1.5h.1c.4.1.9.2 1.3.2h3.7c.1 0 .1-.1.1-.2 0-.1 0-.1-.1-.2-.4-.4-.8-.8-1.1-1.3 0-.1-.1-.1-.1-.2-.2-.3-.4-.7-.5-1v-.1c-.1-.3-.2-.7-.3-1 0-.2-.1-.3-.1-.5-.1-.7-.1-1.4 0-2 0-.2.1-.3.1-.5.1-.3.2-.7.3-1v-.1c.2-.3.3-.7.5-1l.1-.2c.3-.5.7-.9 1.1-1.3.1-.1.2-.1.2-.2 0-.1-.1-.1-.2-.1h-1.6c-.9 0-1.7-.3-2.4-.9-.1-.1-.1-.1-.1-.2s.1-.1.1-.1c.7-.2 1.5-.4 2.2-.4h.2c1 0 1.9.3 2.8.7.9.5 1.8 1.1 2.5 1.9.7.8 1.3 1.7 1.7 2.6.4 1 .6 2 .6 3.1 0 .9-.1 1.8-.4 2.6v.1c-.3.9-.8 1.7-1.5 2.5-.6.7-1.4 1.3-2.2 1.7l-.1.1c-.9.4-1.8.6-2.8.6h-.2c-1.4 0-2.8-.5-3.9-1.4-.1-.1-.1-.1-.2-.1s-.1.1-.1.2c-.1.7-.5 1.5-1 2.1-.7.8-1.7 1.4-2.8 1.6-.4.1-.9.1-1.3.1-.5 0-.9-.1-1.3-.2h-.1c-.9-.3-1.7-.8-2.4-1.5-.1-.1-.1-.1-.2-.1s-.1 0-.1.1c-.2.7-.5 1.5-.9 2.1-.1.1-.1.2-.2.3-.5.7-1.1 1.3-1.9 1.9-.2.1-.3.2-.5.3-.9.4-1.7.6-2.7.6h-.2c-1.4 0-2.9-.5-3.9-1.5-.1-.1-.1-.1-.2-.1s-.1.1-.1.2c-.1.5-.3 1-.6 1.5-.1.1-.1.2-.2.3-.4.7-1 1.3-1.6 1.8-.1.1-.3.2-.4.3-.7.4-1.5.7-2.3.8h-.3c-.8 0-1.6-.2-2.3-.6-.1-.1-.2-.1-.3-.2-.7-.5-1.3-1.1-1.8-1.8-.1-.1-.2-.3-.3-.4-.4-.7-.7-1.5-.8-2.3v-.2c0-.8.2-1.5.5-2.2.1-.1.2-.3.3-.4.5-.7 1.1-1.3 1.9-1.8.1-.1.3-.2.4-.3.7-.4 1.6-.6 2.4-.6h.2c.8 0 1.7.2 2.4.6.1.1.3.2.4.3.7.5 1.4 1.1 1.9 1.8.1.1.2.3.3.4.4.7.6 1.5.6 2.3v.2c0 .8-.2 1.6-.6 2.3-.1.1-.2.3-.3.4-.5.7-1.1 1.3-1.9 1.8-.1.1-.3.2-.4.3-.7.4-1.6.6-2.4.6h-.2c-.8 0-1.7-.2-2.4-.6-.1-.1-.3-.2-.4-.3-.6-.4-1.1-.9-1.5-1.5-.1-.1-.2-.2-.2-.3-.3-.5-.4-1-.5-1.6 0-.1-.1-.1-.2-.1s-.1 0-.1.1c-.8.6-1.6 1-2.6 1.2h-.2c-1.2 0-2.3-.4-3.3-1.2-.1-.1-.1-.1-.2-.1s-.1 0-.1.1c-.3.6-.7 1.2-1.2 1.8-.1.1-.2.2-.3.3-.1.1-.1.2-.2.3-.1.1-.1.1 0 .2s.1.1.2.1c1.9-.6 3.9-.6 5.8 0h.1c1.7.5 3.4.8 5.1.8h.9c1.6 0 3.1-.3 4.6-.8h.1c1.9-.6 3.9-.6 5.8 0h.1c1.7.5 3.4.8 5.1.8h.9c1.6 0 3.1-.3 4.6-.8h.1c1.2-.4 2.4-.5 3.6-.4 1.2.1 2.3.5 3.4 1h.1c1.7.5 3.4.8 5.1.8h.9c.7 0 1.3-.1 2-.2.1 0 .1-.1.1-.2 0-.1 0-.1-.1-.1-.7-.6-1.4-1.2-1.9-2-.1-.1-.1-.2-.2-.3-.4-.6-.7-1.3-.8-2-.1-.3-.1-.6-.1-.9 0-1.2.3-2.3 1-3.3.1-.1.1-.2.2-.3.1-.2.3-.4.4-.6.1-.1.1-.1.1-.2s-.1-.1-.2-.1c-.7.3-1.5.4-2.3.4h-.2c-1.7 0-3.2-.7-4.3-1.8-.1-.1-.1-.1-.2-.1s-.1.1-.1.2c-.1.7-.2 1.4-.5 2.1-.1.3-.2.6-.4.9-.3.6-.8 1.1-1.3 1.5-.1.1-.3.2-.4.3-.6.3-1.4.5-2.1.5h-.1c-1.2 0-2.2-.5-3-1.3-.1-.1-.2-.1-.3-.1-.1 0-.1.1-.1.2.1.6 0 1.2-.1 1.8-.1.4-.3.8-.6 1.1-.4.5-1 .8-1.5 1-.5.2-1.1.2-1.7.2h-.5c-.5 0-1-.2-1.5-.4-.1-.1-.2-.1-.3-.2-.5-.3-.9-.7-1.2-1.1-.1-.1-.1-.2-.2-.3-.3-.4-.4-.9-.5-1.4 0-.1-.1-.1-.2-.1s-.1.1-.1.2c0 .4-.2.8-.4 1.2 0 .1-.1.2-.1.2-.3.4-.6.7-1 1-.1.1-.2.1-.3.2-.4.2-.8.3-1.2.3h-.3c-.6 0-1.2-.3-1.7-.7-.1-.1-.2-.2-.3-.3-.3-.3-.5-.7-.6-1.1 0-.1-.1-.2-.1-.2-.1-.4-.1-.7-.1-1.1 0-.4.1-.8.2-1.2 0-.1.1-.2.1-.3.2-.4.4-.7.6-1 .1-.1.2-.2.3-.3.5-.4 1.1-.7 1.7-.7h.3c.4 0 .8.1 1.2.3.1.1.2.1.3.2.4.2.7.6 1 1 0 .1.1.2.1.3.2.4.3.8.4 1.2 0 .1.1.1.2.1s.1-.1.1-.2c.1-.5.3-1 .5-1.4.1-.1.1-.2.2-.3.3-.5.7-.8 1.2-1.1.1-.1.2-.1.3-.2.5-.2 1-.4 1.6-.4h.4c.6 0 1.1.1 1.7.3.5.2 1 .5 1.4 1 .3.3.5.7.6 1.1.1.6.2 1.2.1 1.7 0 .1 0 .1.1.2.1 0 .1 0 .2-.1.8-.8 1.8-1.2 2.9-1.2h.2c.8 0 1.5.2 2.2.5.1.1.2.1.4.2.5.4.9.9 1.3 1.5.1.2.3.5.4.8z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <FAQ 
                  question="How does the online consultation work?"
                  answer="Our online consultations connect you with licensed healthcare professionals through secure video calls. You can describe your symptoms, ask questions, and receive medical advice, all from the comfort of your home."
                />
                <FAQ 
                  question="Is my medical information secure?"
                  answer="Yes, we take your privacy seriously. HealthConsult is HIPAA compliant and uses end-to-end encryption to protect your personal and medical information."
                />
                <FAQ 
                  question="Can I get prescriptions through HealthConsult?"
                  answer="In many cases, yes. Our doctors can prescribe medications when medically necessary. However, there are some limitations on prescribing controlled substances, which vary by state."
                />
                <FAQ 
                  question="What types of medical conditions can be treated through HealthConsult?"
                  answer="We can help with a wide range of non-emergency conditions, including cold and flu, allergies, skin conditions, minor infections, and more. For emergencies, please call 911 or go to your nearest emergency room."
                />
                <FAQ 
                  question="How much does a consultation cost?"
                  answer="Our consultation fees vary depending on the type of service and your insurance coverage. We provide transparent pricing before you book an appointment, and many insurance plans cover our services."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
