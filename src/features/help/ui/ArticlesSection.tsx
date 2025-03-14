import React, { useState } from 'react';
import { HelpCategory, HelpArticle } from '@/entities/help/model/types';
import { getCategoryName, getArticlesByCategory, getCategoryIcon } from '@/entities/help/model';
import { ArticleCard } from '@/entities/help/ui/ArticleCard';
import { motion } from 'framer-motion';
import { Filter, BookOpen, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ArticlesSectionProps {
  category?: HelpCategory;
  customArticles?: HelpArticle[];
  title?: string;
  showViewAllLink?: boolean;
  showFilter?: boolean;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  category,
  customArticles,
  title,
  showViewAllLink = false,
  showFilter = false
}) => {
  // Use either custom articles or get articles by category
  const allArticles = customArticles || (category ? getArticlesByCategory(category) : []);
  
  // State for filtering articles
  const [filterText, setFilterText] = useState('');
  const [displayedArticles, setDisplayedArticles] = useState(allArticles);
  
  // If no articles, don't render anything
  if (allArticles.length === 0) {
    return null;
  }
  
  // Use custom title or generate from category
  const sectionTitle = title || (category ? `${getCategoryName(category)} Articles` : 'Help Articles');
  
  // Handle search filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilterText(query);
    
    if (!query) {
      setDisplayedArticles(allArticles);
      return;
    }
    
    const filtered = allArticles.filter(
      article => 
        article.title.toLowerCase().includes(query) || 
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setDisplayedArticles(filtered);
  };
  
  const handleClearFilter = () => {
    setFilterText('');
    setDisplayedArticles(allArticles);
  };
  
  // Category icon for display
  const categoryIcon = category ? getCategoryIcon(category) : 'book-open';
  
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
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            {showFilter && allArticles.length > 3 && (
              <>
                <div className="relative flex-grow md:w-64">
                  <Input
                    placeholder="Filter articles..."
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
              </>
            )}
            
            {showViewAllLink && category && (
              <Link 
                href={`/help/categories/${category}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium ml-2"
              >
                View all
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
        
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No articles found</p>
            <p className="text-gray-500 text-sm">
              No articles match your search. Try different keywords or{' '}
              <button 
                onClick={handleClearFilter}
                className="text-blue-600 hover:underline"
              >
                clear the filter
              </button>.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}; 