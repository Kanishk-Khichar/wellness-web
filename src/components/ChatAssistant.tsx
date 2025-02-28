
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, Loader2, Globe, Lock, ShieldCheck, X } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI healthcare assistant. I can help you analyze symptoms, provide health recommendations, and suggest preliminary diagnoses. How can I assist you today?',
    sender: 'assistant',
    timestamp: new Date(),
  },
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<string>('en');
  const [showLanguages, setShowLanguages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated AI responses based on keywords for demo purposes
  const simulateAIResponse = (userMessage: string): string => {
    const lowercaseMsg = userMessage.toLowerCase();
    
    if (lowercaseMsg.includes('headache')) {
      return 'Based on your description of headache, this could be due to several factors including stress, dehydration, or tension. I recommend: 1) Stay hydrated 2) Take a short rest in a quiet, dark room 3) Consider over-the-counter pain relievers if appropriate. If headaches persist or worsen, please consult a healthcare professional.';
    } else if (lowercaseMsg.includes('fever') || lowercaseMsg.includes('temperature')) {
      return 'Fever can indicate your body is fighting an infection. I recommend: 1) Rest and stay hydrated 2) Take appropriate fever reducers if temperature is above 100.4°F (38°C) 3) Monitor your temperature regularly. Seek medical attention if fever persists over 3 days or exceeds 103°F (39.4°C).';
    } else if (lowercaseMsg.includes('cough') || lowercaseMsg.includes('cold')) {
      return 'For cough and cold symptoms, I recommend: 1) Plenty of rest and fluids 2) Honey and warm liquids to soothe throat 3) Humidifier to ease congestion. If symptoms include difficulty breathing or persistent high fever, please seek medical attention immediately.';
    } else if (lowercaseMsg.includes('pain')) {
      return 'Pain can have many causes. To help provide more specific guidance: 1) Can you describe the location and intensity of the pain? 2) When did it start? 3) Does anything make it better or worse? This information would help me give you more tailored recommendations.';
    } else if (lowercaseMsg.includes('diet') || lowercaseMsg.includes('nutrition')) {
      return 'A balanced diet is essential for overall health. I recommend: 1) Plenty of fruits, vegetables, and whole grains 2) Lean proteins and healthy fats 3) Limited processed foods and added sugars 4) Staying well-hydrated. Would you like more specific nutritional recommendations for a particular health goal?';
    } else if (lowercaseMsg.includes('sleep') || lowercaseMsg.includes('insomnia')) {
      return 'Quality sleep is crucial for health. I recommend: 1) Maintain a regular sleep schedule 2) Create a relaxing bedtime routine 3) Limit screen time before bed 4) Ensure your sleeping environment is dark, quiet, and cool. If sleep problems persist, consider discussing with a healthcare provider.';
    } else if (lowercaseMsg.includes('stress') || lowercaseMsg.includes('anxiety')) {
      return 'For stress and anxiety management, consider: 1) Regular physical activity 2) Mindfulness or meditation practices 3) Deep breathing exercises 4) Adequate rest and leisure time. If stress or anxiety significantly impacts your daily life, speaking with a mental health professional can be beneficial.';
    } else {
      return 'Thank you for sharing your health concerns. To provide you with the most accurate guidance, could you please provide more specific details about your symptoms? Include information such as when they started, their severity, and any factors that seem to improve or worsen them.';
    }
  };

  // Translate text (simulated for demo)
  const translateText = (text: string, targetLanguage: string): string => {
    // In a real application, this would connect to a translation API
    if (targetLanguage !== 'en') {
      return `${text} [Translated to ${languages.find(l => l.code === targetLanguage)?.name}]`;
    }
    return text;
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(input);
      const translatedResponse = translateText(aiResponse, language);
      
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: translatedResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newAIMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode);
    setShowLanguages(false);
  };

  useEffect(() => {
    // Scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-3xl mx-auto overflow-hidden bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">Healthcare Assistant</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLanguages(!showLanguages)}
              className="flex items-center gap-1"
            >
              <Globe className="h-4 w-4" />
              <span>{languages.find(l => l.code === language)?.name || 'English'}</span>
            </Button>
            
            {showLanguages && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg rounded-md z-10 border p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`w-full text-left px-2 py-1.5 rounded-sm hover:bg-gray-100 ${
                      language === lang.code ? 'bg-gray-100 font-medium' : ''
                    }`}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <Lock className="h-3 w-3 mr-1" />
            <span>Private & Secure</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-primary-foreground/70' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                <span>Analyzing your information...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms or health concerns..."
            className="resize-none"
            rows={2}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ''}
            size="icon"
            className="h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />
          <span>Your data is private and encrypted. We prioritize medical accuracy but this is not a substitute for professional medical advice.</span>
        </div>
      </div>
    </Card>
  );
};

export default ChatAssistant;
