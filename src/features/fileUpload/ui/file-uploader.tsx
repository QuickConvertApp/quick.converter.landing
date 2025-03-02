import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFileUpload } from "../model/use-file-upload";

export function FileUploader() {
    const {
        isDragging,
        isUploading,
        uploadProgress,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect
    } = useFileUpload();

    return (
        <Card
            className={`max-w-xl mx-auto border-2 border-dashed transition-all ${
                isDragging
                    ? "border-blue-400 bg-blue-900/20"
                    : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <CardContent className="p-8">
                {isUploading ? (
                    <div className="text-center">
                        <Progress value={uploadProgress} className="h-2.5 mb-4" />
                        <p className="text-slate-300 text-sm font-medium">Uploading... {uploadProgress}%</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-slate-400">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">Drop your PDF file here</h3>
                        <p className="text-slate-400 text-sm mb-4">or</p>
                        <Button
                            variant="secondary"
                            onClick={handleFileSelect}
                        >
                            Browse Files
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
