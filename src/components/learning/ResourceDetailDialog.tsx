
import React from 'react';
import { BookOpen, Clock, GraduationCap, Video } from 'lucide-react';
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{resource.title}</DialogTitle>
            <span className={`px-2 py-1 rounded text-xs font-medium
              ${resource.type === 'article' ? 'bg-blue-100 text-blue-800' : 
                resource.type === 'video' ? 'bg-red-100 text-red-800' : 
                'bg-purple-100 text-purple-800'}`}>
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </span>
          </div>
          <DialogDescription className="text-base mt-2">{resource.description}</DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between my-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {resource.timeToComplete}
          </span>
          <span className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-1" />
            {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
          </span>
          <span className="flex items-center">
            <span className="font-medium text-gray-700">Category:</span>
            <span className="ml-1">{resource.category}</span>
          </span>
        </div>

        <div className="my-6 p-4 bg-gray-50 rounded-md border">
          {resource.type === 'video' ? (
            <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
              <Video className="h-12 w-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Video player would appear here</span>
            </div>
          ) : (
            <div className="prose max-w-none">
              {resource.content ? (
                <div dangerouslySetInnerHTML={{ __html: resource.content }} />
              ) : (
                <div className="space-y-4">
                  <p>
                    This is a placeholder for the full content of "{resource.title}". In a production environment, 
                    this would contain the complete article or FAQ content.
                  </p>
                  <p>
                    The content would be formatted appropriately with headings, paragraphs, lists, 
                    and possibly images or other media to provide comprehensive information on the topic.
                  </p>
                  <p>
                    For now, you can see the basic metadata such as the estimated time to complete, 
                    difficulty level, and category.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>ID: {resource.id}</span>
          </div>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDetailDialog;
