import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { getArticleById, getCategoryName, getRelatedArticles, helpArticles } from '@/entities/help/model';
import { HelpArticle } from '@/entities/help/model/types';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  FileQuestion,
  BookOpen,
  LifeBuoy,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArticleCard } from '@/entities/help/ui/ArticleCard';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ArticleDetailPageProps {
  article: HelpArticle | null;
  relatedArticles: HelpArticle[];
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ article, relatedArticles }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  
  // Simulate loading state for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // If fallback route, show loading state
  if (router.isFallback || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-500" />
            <h2 className="mt-4 text-xl font-semibold">Loading article...</h2>
            <p className="text-gray-500 mt-2">Please wait a moment</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // If article not found
  if (!article) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <FileQuestion className="h-16 w-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Article Not Found</h1>
            <p className="text-gray-500 mb-6 text-center">
              We couldn't find the article you're looking for.
            </p>
            <Link href="/dashboard/help" passHref>
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Help Center
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    setFeedback(type);
    toast({
      title: type === 'helpful' ? "Thanks for your feedback!" : "We'll try to improve this article",
      description: type === 'helpful' 
        ? "We're glad this article was useful to you."
        : "Thank you for letting us know this article needs improvement.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now paste the link anywhere you'd like to share it.",
        duration: 2000,
      });
    }
  };
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Estimate read time (rough calculation)
  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };
  
  const readTime = estimateReadTime(article.content);
  
  return (
    <>
      <Head>
        <title>{article.title} | Help Center | QuickConvert</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={`${article.title} | QuickConvert Help`} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} | QuickConvert Help`} />
        <meta name="twitter:description" content={article.summary} />
      </Head>
      
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumbs and back button */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Link href="/dashboard/help" passHref>
                <Button variant="ghost" className="p-0 h-8">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Help Center
                </Button>
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <Link 
                href={`/dashboard/help?tab=articles&category=${article.category}`} 
                className="text-blue-600 hover:underline"
              >
                {getCategoryName(article.category)}
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-600 truncate max-w-[200px] sm:max-w-[300px]">
                {article.title}
              </span>
            </div>

            {/* Article header */}
            <div className="mb-8 border-b pb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                  <BookOpen className="h-3 w-3" />
                  {getCategoryName(article.category)}
                </Badge>
                
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  {formatDate(article.publishedAt)}
                </Badge>
                
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {readTime} min read
                </Badge>
              </div>
              
              <p className="text-gray-600 text-lg mb-4">{article.summary}</p>
              
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Article content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-3">
                <div className="prose prose-blue max-w-none mb-12">
                  {/* Simple content rendering - in a real app, you'd use a markdown renderer */}
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                      className="mb-4"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                
                {/* Article feedback */}
                <div className="border rounded-lg p-6 bg-gray-50 mt-8">
                  <h3 className="font-semibold mb-4">Was this article helpful?</h3>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleFeedback('helpful')} 
                      variant={feedback === 'helpful' ? 'default' : 'outline'}
                      disabled={feedback !== null && feedback !== 'helpful'}
                      className="flex gap-2"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Yes, it was helpful
                    </Button>
                    <Button 
                      onClick={() => handleFeedback('not-helpful')} 
                      variant={feedback === 'not-helpful' ? 'default' : 'outline'}
                      disabled={feedback !== null && feedback !== 'not-helpful'}
                      className="flex gap-2"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No, I need more help
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {feedback === 'not-helpful' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-100">
                          <div className="flex items-start">
                            <LifeBuoy className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Need more assistance?</h4>
                              <p className="text-sm text-gray-600 mb-3">
                                We're sorry this article didn't solve your problem. You can:
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1 mb-3">
                                <li>• Check our <Link href="/dashboard/help?tab=faqs" className="text-blue-600 hover:underline">FAQ section</Link></li>
                                <li>• Browse <Link href="/dashboard/help?tab=articles" className="text-blue-600 hover:underline">related articles</Link></li>
                                <li>• Contact our support team directly</li>
                              </ul>
                              <Link href="/dashboard/help?tab=contact" passHref>
                                <Button size="sm">Contact Support</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:col-span-1">
                <Card className="p-4 sticky top-24">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share this article
                  </h3>
                  <Button 
                    onClick={handleShare} 
                    variant="outline" 
                    className="w-full mb-6"
                  >
                    Copy Link
                  </Button>
                  
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relArticle, index) => (
                      <Link 
                        key={relArticle.id} 
                        href={`/help/articles/${relArticle.id}`} 
                        className="block p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-colors"
                      >
                        <h4 className="font-medium text-sm line-clamp-2">{relArticle.title}</h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-1">{relArticle.summary}</p>
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // In a real app, this would fetch from an API or database
  const articleId = params?.id as string;
  const article = getArticleById(articleId);
  const relatedArticles = article ? getRelatedArticles(article, 3) : [];
  
  return {
    props: {
      article,
      relatedArticles
    },
  };
};

export default ArticleDetailPage; 