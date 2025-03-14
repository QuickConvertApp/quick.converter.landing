import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { HelpArticle } from '../model/types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getCategoryName, getCategoryIcon } from '../model';
import { Badge } from '@/components/ui/badge';

interface ArticleCardProps {
  article: HelpArticle;
  index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index = 0 }) => {
  const { id, title, summary, lastUpdated, category, tags } = article;
  
  const formattedDate = formatDistanceToNow(new Date(lastUpdated), { addSuffix: true });
  const categoryName = getCategoryName(category);
  const categoryIcon = getCategoryIcon(category);
  
  // Map category to badge color
  const categoryColors: Record<string, string> = {
    'getting-started': 'bg-green-100 text-green-800',
    'account': 'bg-purple-100 text-purple-800',
    'billing': 'bg-blue-100 text-blue-800',
    'file-conversion': 'bg-orange-100 text-orange-800',
    'troubleshooting': 'bg-red-100 text-red-800',
  };
  
  const badgeColor = categoryColors[category] || 'bg-gray-100 text-gray-800';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group border-transparent hover:border-blue-200">
        <CardContent className="pt-6 pb-2">
          <div className="flex items-center mb-3">
            <Badge variant="secondary" className={`${badgeColor} flex items-center`}>
              <span className="mr-1" dangerouslySetInnerHTML={{ __html: `<i data-lucide="${categoryIcon}"></i>` }} />
              {categoryName}
            </Badge>
          </div>
          
          <Link href={`/help/articles/${id}`} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{title}</h3>
          </Link>
          
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">{summary}</p>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4 pb-4">
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Updated {formattedDate}</span>
          </div>
          <Link
            href={`/help/articles/${id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
          >
            Read more
            <ArrowRight className="ml-1 h-3 w-3 group-hover:ml-2 transition-all" />
          </Link>
        </CardFooter>
        
        {/* Highlight effect for the card */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-30 transition-opacity rounded-lg"></div>
      </Card>
    </motion.div>
  );
}; 