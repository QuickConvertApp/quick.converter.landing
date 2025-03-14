import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SupportRequest } from '@/entities/help/model/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SendIcon, LifeBuoy, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  onSubmit: (data: SupportRequest) => void;
  isSubmitting?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<SupportRequest>({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, priority: value as 'low' | 'medium' | 'high' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset the form status
    setFormStatus('idle');
    
    try {
      onSubmit(formData);
      // Setting a success state which could be used to show success message
      setTimeout(() => {
        setFormStatus('success');
        // Reset form data after success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          priority: 'medium'
        });
      }, 1500);
    } catch (error) {
      setFormStatus('error');
    }
  };
  
  const isFormValid = formData.name && formData.email && formData.subject && formData.message;
  
  // Determine priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-blue-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center mb-2">
            <LifeBuoy className="h-5 w-5 text-blue-600 mr-2" />
            <CardTitle>Contact Support</CardTitle>
          </div>
          <CardDescription>
            Fill out the form below and our support team will get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        
        {formStatus === 'success' && (
          <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Message Sent</h3>
                <p className="text-sm">
                  Thanks for reaching out! We've received your message and will get back to you soon.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {formStatus === 'error' && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Something went wrong</h3>
                <p className="text-sm">
                  We couldn't send your message. Please try again or contact us directly at support@quickconvert.com.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="focus:border-blue-300 focus:ring-blue-200"
                  disabled={isSubmitting || formStatus === 'success'}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="focus:border-blue-300 focus:ring-blue-200"
                  disabled={isSubmitting || formStatus === 'success'}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief description of your issue"
                className="focus:border-blue-300 focus:ring-blue-200"
                disabled={isSubmitting || formStatus === 'success'}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide as much detail as possible..."
                rows={5}
                className="focus:border-blue-300 focus:ring-blue-200 resize-y"
                disabled={isSubmitting || formStatus === 'success'}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority
              </Label>
              <Select 
                value={formData.priority} 
                onValueChange={handleSelectChange}
                disabled={isSubmitting || formStatus === 'success'}
              >
                <SelectTrigger id="priority" className="focus:ring-blue-200">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="flex items-center">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getPriorityColor('low')}`}></span>
                      Low - General inquiry
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="flex items-center">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getPriorityColor('medium')}`}></span>
                      Medium - Need help soon
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="flex items-center">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getPriorityColor('high')}`}></span>
                      High - Urgent issue
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
                Before contacting support
              </h4>
              <p className="text-sm text-gray-600">
                Have you checked our <a href="/dashboard/help?tab=faqs" className="text-blue-600 hover:underline">FAQs</a> and <a href="/dashboard/help?tab=articles" className="text-blue-600 hover:underline">help articles</a>? You might find the answer you're looking for there.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-center bg-gray-50 border-t p-6 gap-4">
            <div className="text-sm text-gray-500 order-2 sm:order-1">
              We typically respond within 1 business day
            </div>
            <Button 
              type="submit" 
              className="w-full sm:w-auto order-1 sm:order-2"
              disabled={!isFormValid || isSubmitting || formStatus === 'success'}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}; 