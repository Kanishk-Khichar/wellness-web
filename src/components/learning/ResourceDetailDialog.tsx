
import React from 'react';
import { BookOpen, Clock, GraduationCap, Video, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export interface LearningResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'faq';
  category: string;
  description: string;
  timeToComplete: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content?: string;
}

interface ResourceDetailDialogProps {
  resource: LearningResource | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResourceDetailDialog: React.FC<ResourceDetailDialogProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  if (!resource) return null;

  // Determine background color class based on resource type
  const getBgColorClass = () => {
    switch (resource.type) {
      case 'article':
        return 'bg-blue-50 border-blue-200';
      case 'video':
        return 'bg-red-50 border-red-200';
      case 'faq':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // Determine badge color class based on resource type
  const getBadgeColorClass = () => {
    switch (resource.type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'faq':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Determine icon color class based on resource type
  const getIconColorClass = () => {
    switch (resource.type) {
      case 'article':
        return 'text-blue-500';
      case 'video':
        return 'text-red-500';
      case 'faq':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get level badge class based on level
  const getLevelBadgeClass = () => {
    switch (resource.level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className={`p-6 ${getBgColorClass()} rounded-t-lg animate-fadeIn`}>
          <DialogHeader>
            <div className="flex items-start justify-between">
              <DialogTitle className="text-2xl font-bold">{resource.title}</DialogTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColorClass()}`}>
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </span>
            </div>
            <DialogDescription className="text-base mt-3 leading-relaxed">
              {resource.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
              <Clock className={`h-4 w-4 mr-2 ${getIconColorClass()}`} />
              <span>{resource.timeToComplete}</span>
            </div>
            <div className="flex items-center px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
              <GraduationCap className={`h-4 w-4 mr-2 ${getIconColorClass()}`} />
              <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelBadgeClass()}`}>
                {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
              </span>
            </div>
            <div className="flex items-center px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
              <BookOpen className={`h-4 w-4 mr-2 ${getIconColorClass()}`} />
              <span>{resource.category}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {resource.type === 'video' ? (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
              <div className="p-8 text-center">
                <Video className={`h-16 w-16 mx-auto mb-4 ${getIconColorClass()}`} />
                <p className="text-gray-500 max-w-md mx-auto">
                  This video content would be embedded here. Click the play button to start watching.
                </p>
                <Button className="mt-4 bg-red-600 hover:bg-red-700">
                  <Video className="h-4 w-4 mr-2" /> Play Video
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              {resource.content ? (
                <div 
                  className="animate-fadeIn"
                  dangerouslySetInnerHTML={{ __html: resource.content }} 
                />
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                    <h3 className="font-medium text-amber-800 mb-2">
                      Note About This Content
                    </h3>
                    <p className="text-amber-700 text-sm">
                      This is a placeholder for the full content of "{resource.title}". In a production environment, 
                      this would contain the complete article or FAQ content.
                    </p>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800">What You'll Learn</h2>
                  <p>
                    The complete content would be formatted appropriately with headings, paragraphs, lists, 
                    and possibly images or other media to provide comprehensive information on the topic.
                  </p>
                  
                  <h2 className="text-xl font-semibold text-gray-800">Key Takeaways</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Important concept one related to {resource.title}</li>
                    <li>Critical understanding of the topic</li>
                    <li>Practical applications in everyday health management</li>
                    <li>Recommended next steps for further learning</li>
                  </ul>
                  
                  <blockquote className="pl-4 border-l-4 border-primary italic text-gray-700">
                    "Health knowledge is a journey, not a destination. This resource is designed to be a stepping stone in your ongoing education."
                  </blockquote>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center p-6 border-t">
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>ID: {resource.id}</span>
          </div>
          <Button onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDetailDialog;
