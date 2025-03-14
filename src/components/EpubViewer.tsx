'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Menu, Book, Info, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface EpubViewerProps {
  url: string;
  fileName: string;
  onClose: () => void;
}

export const EpubViewer: React.FC<EpubViewerProps> = ({ url, fileName, onClose }) => {
  const [location, setLocation] = useState<string | number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showToc, setShowToc] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const renditionRef = useRef<any>(null);
  const tocRef = useRef<any>(null);
  
  // State for loading the EPUB file
  const [epubData, setEpubData] = useState<ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Get book metadata
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookAuthor, setBookAuthor] = useState<string>('');
  
  // Fetch the EPUB file as a blob
  useEffect(() => {
    const fetchEpub = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to load EPUB: ${response.status} ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        
        setEpubData(arrayBuffer);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching EPUB:', error);
        setLoadError(error instanceof Error ? error.message : 'Unknown error loading EPUB');
        setIsLoading(false);
      }
    };
    
    fetchEpub();
  }, [url]);
  
  const locationChanged = (epubcifi: string) => {
    setLocation(epubcifi);
    
    // Get current page
    if (renditionRef.current && totalPages) {
      const currentLocation = renditionRef.current.location?.start?.percentage || 0;
      const page = Math.round(currentLocation * totalPages);
      setCurrentPage(page <= 0 ? 1 : page);
    }
  };

  const toggleToc = () => {
    setShowToc(!showToc);
    setShowInfo(false);
  };
  
  const toggleInfo = () => {
    setShowInfo(!showInfo);
    setShowToc(false);
  };
  
  const navigatePrevious = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };
  
  const navigateNext = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-blue-600" />
            <DialogTitle className="text-lg truncate">{fileName}</DialogTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleInfo}
              className={showInfo ? 'bg-gray-100' : ''}
              disabled={isLoading || !!loadError}
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Info</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleToc}
              className={showToc ? 'bg-gray-100' : ''}
              disabled={isLoading || !!loadError}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Table of Contents</span>
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="relative flex-1 overflow-hidden border rounded-md">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-2" />
              <p className="text-gray-600">Loading EPUB...</p>
            </div>
          )}
          
          {/* Error State */}
          {loadError && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 p-6">
              <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md w-full text-center">
                <h3 className="text-red-600 font-medium mb-2">Error Loading EPUB</h3>
                <p className="text-sm text-gray-600">{loadError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          
          {/* TOC Sidebar */}
          {showToc && !isLoading && !loadError && (
            <div className="absolute top-0 left-0 h-full w-64 bg-white border-r z-10 overflow-auto shadow-md">
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Table of Contents</h3>
                <div ref={tocRef} className="toc-content text-sm" />
              </div>
            </div>
          )}
          
          {/* Book Info Sidebar */}
          {showInfo && !isLoading && !loadError && (
            <div className="absolute top-0 left-0 h-full w-64 bg-white border-r z-10 overflow-auto shadow-md">
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Book Information</h3>
                
                {bookTitle && (
                  <div className="mb-3">
                    <h4 className="text-xs uppercase text-gray-500">Title</h4>
                    <p className="text-sm">{bookTitle}</p>
                  </div>
                )}
                
                {bookAuthor && (
                  <div className="mb-3">
                    <h4 className="text-xs uppercase text-gray-500">Author</h4>
                    <p className="text-sm">{bookAuthor}</p>
                  </div>
                )}
                
                <div className="mb-3">
                  <h4 className="text-xs uppercase text-gray-500">Format</h4>
                  <p className="text-sm">EPUB</p>
                </div>
              </div>
            </div>
          )}
          
          {/* EPUB Reader */}
          {!isLoading && !loadError && epubData && (
            <div className="w-full h-full">
              <ReactReader
                location={location}
                locationChanged={locationChanged}
                url={epubData} // Pass the ArrayBuffer directly instead of a URL
                title={fileName}
                getRendition={(rendition) => {
                  renditionRef.current = rendition;
                  
                  // Set book metadata when loaded
                  rendition.book.loaded.metadata.then((metadata: any) => {
                    setBookTitle(metadata.title);
                    setBookAuthor(metadata.creator);
                  });
                  
                  // Generate locations for page numbers
                  rendition.book.ready.then(() => {
                    rendition.book.locations.generate(1000).then(() => {
                      // Use a workaround for the TypeScript error with length()
                      const totalLocations = rendition.book.locations.length
                        ? rendition.book.locations.length()
                        : 0;
                      setTotalPages(totalLocations);
                    }).catch(err => console.error('Error generating locations:', err));
                  });
                  
                  // Set TOC when loaded
                  rendition.book.loaded.navigation.then((navigation: any) => {
                    if (tocRef.current && navigation.toc) {
                      const tocItems = navigation.toc.map((item: any, index: number) => (
                        `<div key=${index} class="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer" data-href="${item.href}">
                          ${item.label}
                        </div>`
                      )).join('');
                      
                      tocRef.current.innerHTML = tocItems;
                      
                      // Add click event listeners for TOC items
                      const items = tocRef.current.querySelectorAll('[data-href]');
                      items.forEach((item: HTMLElement) => {
                        item.addEventListener('click', (e) => {
                          const href = item.getAttribute('data-href');
                          if (href && renditionRef.current) {
                            renditionRef.current.display(href);
                            setShowToc(false);
                          }
                        });
                      });
                    }
                  });
                }}
                epubOptions={{
                  flow: "scrolled",
                  manager: "continuous",
                }}
                swipeable={true}
              />
            </div>
          )}
          
          {/* Navigation Controls */}
          {!isLoading && !loadError && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-md">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={navigatePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              
              <div className="text-xs text-gray-600 w-16 text-center">
                {currentPage} / {totalPages || '?'}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={navigateNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 