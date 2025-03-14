import { 
  File as FileIcon, 
  FileText, 
  FileImage, 
  FileArchive, 
  FileBadge, 
  FileCode, 
  BookOpen
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// File type interface
export interface FileType {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  icon: LucideIcon;
  color: string;
}

// Get file extension from name
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

// Get file type icon based on mime type or extension
export const getFileIcon = (mimeType: string, filename: string): LucideIcon => {
  const extension = getFileExtension(filename);
  
  if (mimeType.startsWith('image/')) {
    return FileImage;
  } else if (mimeType === 'application/pdf') {
    return FileText;
  } else if (mimeType === 'application/epub+zip' || extension === 'epub') {
    return BookOpen;
  } else if (mimeType.startsWith('text/')) {
    return FileText;
  } else if (mimeType.includes('zip') || mimeType.includes('compressed') || 
             ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return FileArchive;
  } else if (['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml'].includes(extension)) {
    return FileCode;
  } else if (['doc', 'docx', 'odt', 'rtf'].includes(extension)) {
    return FileText;
  }
  
  return FileIcon;
};

// Get file color based on mime type or extension
export const getFileColor = (mimeType: string, filename: string): string => {
  const extension = getFileExtension(filename);
  
  if (mimeType.startsWith('image/')) {
    return 'bg-green-100 text-green-700';
  } else if (mimeType === 'application/pdf') {
    return 'bg-red-100 text-red-700';
  } else if (mimeType === 'application/epub+zip' || extension === 'epub') {
    return 'bg-indigo-100 text-indigo-700';
  } else if (mimeType.startsWith('text/')) {
    return 'bg-blue-100 text-blue-700';
  } else if (mimeType.includes('zip') || mimeType.includes('compressed') || 
             ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return 'bg-yellow-100 text-yellow-700';
  } else if (['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml'].includes(extension)) {
    return 'bg-purple-100 text-purple-700';
  } else if (['doc', 'docx', 'odt', 'rtf'].includes(extension)) {
    return 'bg-blue-100 text-blue-700';
  }
  
  return 'bg-gray-100 text-gray-700';
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}; 