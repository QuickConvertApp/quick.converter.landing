import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HelpSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const HelpSearch: React.FC<HelpSearchProps> = ({
  onSearch,
  placeholder = 'Search for help...'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-16 py-6 text-base w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Button 
          type="submit"
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2"
          size="sm"
          disabled={!searchQuery.trim()}
        >
          Search
        </Button>
      </div>
    </form>
  );
}; 