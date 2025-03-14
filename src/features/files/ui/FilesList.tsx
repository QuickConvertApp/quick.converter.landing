import React, { useRef, useEffect } from 'react';
import { FileEntity } from '@/shared/api/converter';
import { FileCard } from './FileCard';
import { FilesFilter } from './FilesFilter';
import { FileFilter } from '../model/files';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Trash, 
  FolderOpen, 
  Upload,
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilesListProps {
  files: FileEntity[];
  selectedFileIds: string[];
  isLoading: boolean;
  error: string | null;
  filter: FileFilter;
  onFilterChange: (filter: Partial<FileFilter>) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  onView?: (id: string, name: string) => void;
}

export const FilesList: React.FC<FilesListProps> = ({
  files,
  selectedFileIds,
  isLoading,
  error,
  filter,
  onFilterChange,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onDownload,
  onDelete,
  onDeleteSelected,
  onRefresh,
  onView
}) => {
  const allSelected = files.length > 0 && selectedFileIds.length === files.length;
  const someSelected = selectedFileIds.length > 0 && selectedFileIds.length < files.length;
  
  // Create a ref for the checkbox to manually control the indeterminate state
  const checkboxRef = useRef<HTMLButtonElement>(null);
  
  // Update the indeterminate property with useEffect
  useEffect(() => {
    if (checkboxRef.current) {
      const inputElement = checkboxRef.current.querySelector('input');
      if (inputElement) {
        inputElement.indeterminate = someSelected;
      }
    }
  }, [someSelected]);
  
  // Handle toggle all selected
  const handleToggleSelectAll = () => {
    if (allSelected) {
      onClearSelection();
    } else {
      onSelectAll();
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <FilesFilter 
          filter={filter}
          onFilterChange={onFilterChange}
          onRefresh={onRefresh}
          isLoading={isLoading}
        />
        
        <div className="flex items-center gap-2">
          {selectedFileIds.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onDeleteSelected}
              className="gap-2"
            >
              <Trash className="h-4 w-4" />
              <span>Delete {selectedFileIds.length}</span>
            </Button>
          )}
          
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-3">
          <div className="text-red-500 mt-0.5">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Error loading files</h4>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
          </div>
        </div>
      )}
      
      {files.length > 0 ? (
        <>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <Checkbox 
              ref={checkboxRef}
              checked={allSelected}
              onCheckedChange={handleToggleSelectAll}
            />
            <span className="text-sm text-gray-500">
              {selectedFileIds.length > 0 
                ? `Selected ${selectedFileIds.length} of ${files.length} files` 
                : `${files.length} files`}
            </span>
          </div>
          
          <AnimatePresence>
            <div className="space-y-2">
              {files.map(file => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileCard 
                    file={file}
                    isSelected={selectedFileIds.includes(file.id)}
                    onToggleSelect={onToggleSelect}
                    onDownload={onDownload}
                    onDelete={onDelete}
                    onView={onView}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="p-3 rounded-full bg-gray-100">
            <FolderOpen className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mt-4 text-gray-900 font-medium">No files found</h3>
          <p className="mt-1 text-gray-500 text-center">
            {isLoading 
              ? 'Loading your files...' 
              : filter.query 
                ? `No results found for "${filter.query}". Try a different search.` 
                : 'Upload your first file to get started.'}
          </p>
          
          {!isLoading && !filter.query && (
            <Button className="mt-4 gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload File</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}; 