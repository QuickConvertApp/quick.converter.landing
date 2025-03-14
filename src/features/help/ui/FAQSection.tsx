import React, { useState } from 'react';
import { HelpCategory, FAQ } from '@/entities/help/model/types';
import { getCategoryName, getFaqsByCategory, getCategoryIcon } from '@/entities/help/model';
import { FAQItem } from '@/entities/help/ui/FAQItem';
import { motion } from 'framer-motion';
import { FileQuestion, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FAQSectionProps {
  category?: HelpCategory;
  customFaqs?: FAQ[];
  title?: string;
  showFilter?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  category,
  customFaqs,
  title,
  showFilter = false
}) => {
  // Use either custom FAQs or get FAQs by category
  const allFaqs = customFaqs || (category ? getFaqsByCategory(category) : []);
  
  // State for filtering FAQs
  const [filterText, setFilterText] = useState('');
  const [displayedFaqs, setDisplayedFaqs] = useState(allFaqs);
  
  // If no FAQs and no custom title, don't render anything
  if (allFaqs.length === 0 && !title) {
    return null;
  }
  
  // Use custom title or generate from category
  const sectionTitle = title || (category ? `${getCategoryName(category)} FAQs` : 'Frequently Asked Questions');
  
  // Handle search filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilterText(query);
    
    if (!query) {
      setDisplayedFaqs(allFaqs);
      return;
    }
    
    const filtered = allFaqs.filter(
      faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
    );
    
    setDisplayedFaqs(filtered);
  };
  
  const handleClearFilter = () => {
    setFilterText('');
    setDisplayedFaqs(allFaqs);
  };
  
  // Category icon for display
  const categoryIcon = category ? getCategoryIcon(category) : 'help-circle';
  
  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="mr-3 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span dangerouslySetInnerHTML={{ __html: `<i data-lucide="${categoryIcon}"></i>` }} />
            </div>
            <h2 className="text-2xl font-bold">{sectionTitle}</h2>
          </div>
          
          {showFilter && allFaqs.length > 0 && (
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Input
                  placeholder="Filter questions..."
                  value={filterText}
                  onChange={handleFilterChange}
                  className="pl-9"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {filterText && (
                <Button variant="ghost" size="sm" onClick={handleClearFilter}>
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
          {displayedFaqs.length > 0 ? (
            <div>
              {displayedFaqs.map((faq, index) => (
                <FAQItem key={faq.id} faq={faq} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <FileQuestion className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No FAQs found</p>
              {filterText ? (
                <p className="text-gray-500 text-sm">
                  No questions match your search. Try different keywords or{' '}
                  <button 
                    onClick={handleClearFilter}
                    className="text-blue-600 hover:underline"
                  >
                    clear the filter
                  </button>.
                </p>
              ) : (
                <p className="text-gray-500 text-sm">No questions available for this category.</p>
              )}
            </div>
          )}
        </div>
        
        {/* Help prompt at bottom */}
        {displayedFaqs.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Can't find the answer you're looking for?{' '}
              <a href="/dashboard/help?tab=contact" className="text-blue-600 hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}; 