import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCategory, HelpArticle, FAQ } from '@/entities/help/model/types';
import { 
  getAllCategories, 
  getCategoryName, 
  getCategoryIcon, 
  searchArticles, 
  searchFaqs,
  helpArticles
} from '@/entities/help/model';
import { HelpSearch } from '@/features/help/ui/HelpSearch';
import { ArticlesSection } from '@/features/help/ui/ArticlesSection';
import { FAQSection } from '@/features/help/ui/FAQSection';
import { ContactForm } from '@/features/help/ui/ContactForm';
import { useToast } from '@/components/ui/use-toast';
import { 
  BookOpen, 
  FileQuestion, 
  LifeBuoy, 
  Rocket, 
  User, 
  CreditCard, 
  FileText, 
  HelpCircle,
  TrendingUp,
  Search as SearchIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

// Map category to icon component
const categoryIconMap = {
  'getting-started': Rocket,
  'account': User,
  'billing': CreditCard,
  'file-conversion': FileText,
  'troubleshooting': HelpCircle
};

interface HelpCenterWidgetProps {
  initialTab?: string;
  initialCategory?: string;
  initialSearch?: string;
}

export const HelpCenterWidget: React.FC<HelpCenterWidgetProps> = ({
  initialTab,
  initialCategory,
  initialSearch
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'articles');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory | null>(
    initialCategory ? initialCategory as HelpCategory : null
  );
  const [searchResults, setSearchResults] = useState<{ articles: HelpArticle[], faqs: FAQ[] }>({
    articles: [],
    faqs: []
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { toast } = useToast();
  
  const categories = getAllCategories();
  
  // Set active tab based on URL query parameter or props
  useEffect(() => {
    const tab = router.query.tab as string;
    if (tab && (tab === 'articles' || tab === 'faqs' || tab === 'contact' || tab === 'search')) {
      setActiveTab(tab);
    } else if (initialTab && (initialTab === 'articles' || initialTab === 'faqs' || initialTab === 'contact' || initialTab === 'search')) {
      setActiveTab(initialTab);
    }
  }, [router.query, initialTab]);

  // Initialize search results if initialSearch is provided
  useEffect(() => {
    if (initialSearch) {
      setSearchResults({
        articles: searchArticles(initialSearch),
        faqs: searchFaqs(initialSearch)
      });
      if (activeTab !== 'search') {
        setActiveTab('search');
      }
    }
  }, [initialSearch]);

  // Initialize selected category if initialCategory is provided
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory as HelpCategory);
    }
  }, [initialCategory]);

  // Get trending articles (example implementation - in a real app, this would be based on view counts)
  const trendingArticles = helpArticles.slice(0, 3);
  
  // Handle search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchResults({
        articles: searchArticles(query),
        faqs: searchFaqs(query)
      });
      setActiveTab('search');
      
      // Update URL to reflect search state
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tab: 'search', q: query }
      }, undefined, { shallow: true });
    } else {
      setSearchResults({ articles: [], faqs: [] });
      setActiveTab('articles');
      
      // Remove search parameters from URL
      const { tab, q, ...restQuery } = router.query;
      router.push({
        pathname: router.pathname,
        query: { ...restQuery, tab: 'articles' }
      }, undefined, { shallow: true });
    }
  };
  
  // Handle category filter
  const handleCategoryFilter = (category: HelpCategory | null) => {
    setSelectedCategory(category);
  };
  
  // Handle contact form submission
  const handleContactSubmit = (data: any) => {
    setIsSubmittingForm(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Support request data:', data);
      
      toast({
        title: 'Message Sent',
        description: 'We\'ve received your message and will get back to you soon.',
      });
      
      setIsSubmittingForm(false);
    }, 1500);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL to reflect tab state
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: value }
    }, undefined, { shallow: true });
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero section with search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-xl p-8 mb-8 shadow-md"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          How can we help you?
        </h1>
        <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          Search our knowledge base for answers to common questions or browse through our help articles.
        </p>
        <div className="max-w-2xl mx-auto">
          <HelpSearch onSearch={handleSearch} placeholder="Search for topics, questions, or articles..." />
        </div>
      </motion.div>
      
      {/* Trending topics section */}
      {activeTab !== 'search' && activeTab !== 'contact' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold">Trending Topics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingArticles.map((article) => (
              <motion.div 
                key={article.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start">
                  {React.createElement(categoryIconMap[article.category], { 
                    className: "h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" 
                  })}
                  <div>
                    <h3 className="font-medium mb-2 line-clamp-2">
                      <a 
                        href={`/help/articles/${article.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {article.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{article.summary}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Category filters */}
      {(activeTab === 'articles' || activeTab === 'faqs') && (
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(null)}
              className="whitespace-nowrap"
            >
              All Categories
            </Button>
            {categories.map((category) => {
              const Icon = categoryIconMap[category];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                  className="whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {getCategoryName(category)}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Main content with tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-8 flex justify-center">
          <TabsTrigger value="articles" className="flex items-center gap-2 px-6">
            <BookOpen className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2 px-6">
            <FileQuestion className="h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2 px-6">
            <LifeBuoy className="h-4 w-4" />
            Contact Support
          </TabsTrigger>
        </TabsList>
        
        {/* Articles tab content */}
        <TabsContent value="articles">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedCategory 
              ? <ArticlesSection category={selectedCategory} />
              : categories.map((category) => (
                  <ArticlesSection
                    key={category}
                    category={category}
                    showViewAllLink
                  />
                ))
            }
          </motion.div>
        </TabsContent>
        
        {/* FAQs tab content */}
        <TabsContent value="faqs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedCategory 
              ? <FAQSection category={selectedCategory} />
              : categories.map((category) => (
                  <FAQSection key={category} category={category} />
                ))
            }
          </motion.div>
        </TabsContent>
        
        {/* Contact tab content */}
        <TabsContent value="contact">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto py-8"
          >
            <ContactForm onSubmit={handleContactSubmit} isSubmitting={isSubmittingForm} />
          </motion.div>
        </TabsContent>
        
        {/* Search results tab content */}
        <TabsContent value="search">
          {searchQuery && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-center mb-4">
                <SearchIcon className="h-5 w-5 mr-2 text-gray-400" />
                <h2 className="text-2xl font-bold">
                  Results for <span className="text-blue-600">"{searchQuery}"</span>
                </h2>
                <Badge variant="outline" className="ml-3">
                  {searchResults.articles.length + searchResults.faqs.length} results
                </Badge>
              </div>
              
              {searchResults.articles.length === 0 && searchResults.faqs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <SearchIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    We couldn't find any content matching your search. Try using different keywords or browse our help categories.
                  </p>
                  <Button onClick={() => setActiveTab('articles')}>
                    Browse All Articles
                  </Button>
                </div>
              ) : (
                <>
                  {searchResults.articles.length > 0 && (
                    <ArticlesSection
                      customArticles={searchResults.articles}
                      title="Articles"
                    />
                  )}
                  
                  {searchResults.faqs.length > 0 && (
                    <FAQSection
                      customFaqs={searchResults.faqs}
                      title="Frequently Asked Questions"
                    />
                  )}
                </>
              )}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}; 