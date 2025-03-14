import { 
  FileText, 
  Image,
  FileUp,
  Zap,
  ArrowDownToLine,
  BookCopy
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Conversion type interface
export interface ConversionType {
  id: string;
  name: string;
  sourceType: string;
  targetType: string;
  icon: LucideIcon;
  color: string;
  description: string;
  features: string[];
  tips: string[];
}

// Conversion types
export const conversionTypes: ConversionType[] = [
  { 
    id: 'pdf-to-word', 
    name: 'PDF to Word', 
    sourceType: 'PDF', 
    targetType: 'DOCX', 
    icon: FileText, 
    color: 'bg-blue-100 text-blue-700',
    description: 'Convert PDF documents to editable Word files while preserving formatting.',
    features: [
      'Preserves text formatting and layout',
      'Extracts images and tables',
      'Optional OCR for scanned documents'
    ],
    tips: [
      'Use OCR for scanned documents to improve text extraction.',
      'For complex layouts, check the output document for any formatting issues.'
    ]
  },
  { 
    id: 'image-to-pdf', 
    name: 'Image to PDF', 
    sourceType: 'JPG/PNG', 
    targetType: 'PDF', 
    icon: Image, 
    color: 'bg-green-100 text-green-700',
    description: 'Create PDF documents from your images with customizable layout options.',
    features: [
      'Supports multiple image formats (JPG, PNG)',
      'Adjustable quality settings',
      'Batch conversion support'
    ],
    tips: [
      'For best results, use high-resolution images.',
      'For multi-page PDFs, upload multiple images at once.'
    ]
  },
  { 
    id: 'word-to-pdf', 
    name: 'Word to PDF', 
    sourceType: 'DOCX', 
    targetType: 'PDF', 
    icon: FileText, 
    color: 'bg-purple-100 text-purple-700',
    description: 'Transform Word documents into universally accessible PDF files.',
    features: [
      'Maintains fonts and document structure',
      'Embeds all fonts for consistency',
      'Hyperlinks remain functional'
    ],
    tips: [
      'Save your Word document before converting to avoid data loss.',
      'Ensure all fonts used are available on your system for best results.'
    ]
  },
  { 
    id: 'pdf-to-epub', 
    name: 'PDF to EPUB', 
    sourceType: 'PDF', 
    targetType: 'EPUB', 
    icon: BookCopy, 
    color: 'bg-indigo-100 text-indigo-700',
    description: 'Convert PDF documents to EPUB format for e-readers.',
    features: [
      'Optimized for e-readers',
      'Maintains chapters and structure',
      'Supports text reflowing for different screen sizes'
    ],
    tips: [
      'Enable OCR for scanned PDFs to ensure text is selectable.',
      'Check the table of contents is preserved correctly after conversion.'
    ]
  },
  { 
    id: 'pdf-compress', 
    name: 'PDF Compress', 
    sourceType: 'PDF', 
    targetType: 'PDF', 
    icon: Zap, 
    color: 'bg-amber-100 text-amber-700',
    description: 'Reduce PDF file size while maintaining reasonable quality.',
    features: [
      'Smart compression algorithms',
      'Optimize images while preserving text quality',
      'Multiple compression levels available'
    ],
    tips: [
      'Balance between file size and quality based on your needs.',
      'For documents with many images, medium compression usually works best.'
    ]
  },
];

// Get a conversion type by ID
export const getConversionTypeById = (id: string): ConversionType | undefined => {
  return conversionTypes.find(type => type.id === id);
};

// Get file accept string based on source type
export const getAcceptTypes = (sourceType: string): string => {
  switch (sourceType) {
    case 'PDF':
      return '.pdf';
    case 'DOCX':
      return '.docx,.doc';
    case 'JPG/PNG':
      return '.jpg,.jpeg,.png';
    default:
      return '*';
  }
}; 