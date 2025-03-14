import React from 'react';
import { FileEntity } from '@/shared/api/converter';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  MoreVertical,
  Trash,
  Share,
  Edit,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFileIcon, getFileColor, formatFileSize, formatDate, getFileExtension } from '@/entities/file/model';

interface FileCardProps {
  file: FileEntity;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onView?: (id: string, name: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  isSelected,
  onToggleSelect,
  onDownload,
  onDelete,
  onView
}) => {
  const Icon = getFileIcon(file.mimeType, file.name);
  const colorClass = getFileColor(file.mimeType, file.name);
  const extension = getFileExtension(file.name);
  
  // Check if file is an EPUB
  const isEpub = file.mimeType === 'application/epub+zip' || extension.toLowerCase() === 'epub';
  
  return (
    <Card className={`border ${isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'} hover:border-blue-300 transition-colors`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(file.id)}
              className="mt-1"
            />
          </div>
          
          <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="min-w-0 flex-grow">
            <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span className="uppercase font-mono mr-2">{extension}</span>
              <span className="mx-2">•</span>
              <span>{formatFileSize(file.size)}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(file.createdAt)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* View button for EPUB files */}
            {isEpub && onView && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onView(file.id, file.name)}
                className="text-gray-500 hover:text-gray-700"
                title="View EPUB"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDownload(file.id)}
              className="text-gray-500 hover:text-gray-700"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => onDownload(file.id)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                
                {/* View option for EPUB files */}
                {isEpub && onView && (
                  <DropdownMenuItem 
                    onClick={() => onView(file.id, file.name)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View EPUB</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem className="gap-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="gap-2">
                  <Edit className="h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => onDelete(file.id)}
                  className="gap-2 text-red-600 focus:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 