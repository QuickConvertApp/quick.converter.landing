import React, { useState } from 'react';
import { FilesList } from './FilesList';
import { useFiles } from '../model/files';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { EpubViewer } from '@/components/EpubViewer';

export const FilesFeature: React.FC = () => {
  const {
    state,
    loadFiles,
    updateFilter,
    toggleFileSelection,
    clearSelection,
    selectAllFiles,
    deleteFile,
    deleteSelectedFiles,
    downloadFile,
    getFilteredFiles
  } = useFiles();
  
  // State for deletion confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  
  // State for EPUB viewer
  const [viewingEpub, setViewingEpub] = useState(false);
  const [epubData, setEpubData] = useState<{ id: string; name: string } | null>(null);
  
  // Handle file deletion with confirmation
  const handleDeleteFile = (fileId: string) => {
    setFileToDelete(fileId);
    setShowDeleteConfirm(true);
  };
  
  // Handle selected files deletion with confirmation
  const handleDeleteSelected = () => {
    setFileToDelete(null); // null means delete all selected
    setShowDeleteConfirm(true);
  };
  
  // Handle EPUB viewing
  const handleViewEpub = (fileId: string, fileName: string) => {
    // Set state for viewing the EPUB
    setEpubData({ id: fileId, name: fileName });
    setViewingEpub(true);
  };
  
  // Close EPUB viewer
  const closeEpubViewer = () => {
    setViewingEpub(false);
    setEpubData(null);
  };
  
  // Confirm deletion
  const confirmDelete = async () => {
    try {
      if (fileToDelete) {
        // Delete single file
        await deleteFile(fileToDelete);
      } else {
        // Delete all selected files
        await deleteSelectedFiles();
      }
    } catch (error) {
      console.error('Error deleting file(s):', error);
    } finally {
      setShowDeleteConfirm(false);
      setFileToDelete(null);
    }
  };
  
  const filteredFiles = getFilteredFiles();
  
  // Generate EPUB download URL with cache buster to prevent caching issues
  const getEpubUrl = (fileId: string) => {
    // Use origin to create absolute URL with cache buster
    const baseUrl = window.location.origin;
    const cacheBuster = new Date().getTime(); // Prevents caching issues
    return `${baseUrl}/api/converter/download/${fileId}?t=${cacheBuster}`;
  };
  
  return (
    <div className="relative">
      <FilesList
        files={filteredFiles}
        selectedFileIds={state.selectedFileIds}
        isLoading={state.isLoading}
        error={state.error}
        filter={state.filter}
        onFilterChange={updateFilter}
        onToggleSelect={toggleFileSelection}
        onSelectAll={selectAllFiles}
        onClearSelection={clearSelection}
        onDownload={downloadFile}
        onDelete={handleDeleteFile}
        onDeleteSelected={handleDeleteSelected}
        onRefresh={loadFiles}
        onView={handleViewEpub}
      />
      
      {/* EPUB Viewer */}
      {viewingEpub && epubData && (
        <EpubViewer
          url={getEpubUrl(epubData.id)}
          fileName={epubData.name}
          onClose={closeEpubViewer}
        />
      )}
      
      {/* Simple Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Confirm Deletion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {fileToDelete 
                  ? "Are you sure you want to delete this file? This action cannot be undone."
                  : `Are you sure you want to delete ${state.selectedFileIds.length} selected files? This action cannot be undone.`}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}; 