import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  RefreshCcw,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileFilter, FileSort, SortDirection } from '../model/files';

interface FilesFilterProps {
  filter: FileFilter;
  onFilterChange: (filter: Partial<FileFilter>) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const FilesFilter: React.FC<FilesFilterProps> = ({
  filter,
  onFilterChange,
  onRefresh,
  isLoading
}) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ query: e.target.value });
  };

  const handleSortChange = (sortBy: FileSort) => {
    if (filter.sortBy === sortBy) {
      // Toggle direction if same sort field
      const newDirection: SortDirection = filter.sortDirection === 'asc' ? 'desc' : 'asc';
      onFilterChange({ sortDirection: newDirection });
    } else {
      // Set new sort field with default desc direction
      onFilterChange({ sortBy, sortDirection: 'desc' });
    }
  };

  const getSortLabel = (sort: FileSort): string => {
    switch (sort) {
      case 'name': return 'Name';
      case 'date': return 'Date';
      case 'size': return 'Size';
      case 'type': return 'Type';
      default: return 'Sort';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search files..."
          value={filter.query}
          onChange={handleQueryChange}
          className="pl-9 w-full"
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {filter.sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              {getSortLabel(filter.sortBy)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {(['name', 'date', 'size', 'type'] as FileSort[]).map((sortOption) => (
              <DropdownMenuItem 
                key={sortOption}
                onClick={() => handleSortChange(sortOption)}
                className="flex items-center gap-2"
              >
                {filter.sortBy === sortOption && (
                  <Check className="h-4 w-4" />
                )}
                <span className={filter.sortBy === sortOption ? 'font-medium' : ''}>
                  {getSortLabel(sortOption)}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className={isLoading ? 'animate-spin' : ''}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 