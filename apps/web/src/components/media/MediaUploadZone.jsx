import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import { useGenerateUploadUrl, useCreateMediaAsset } from '@postpilot/lib';

/**
 * Drag-and-drop upload zone for media files.
 * Uses Convex file storage to upload, then creates a media asset record.
 */
export function MediaUploadZone({ onUploadComplete }) {
  const generateUrl = useGenerateUploadUrl();
  const createAsset = useCreateMediaAsset();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = useCallback(
    async (files) => {
      if (!files?.length) return;
      setIsUploading(true);
      try {
        for (const file of files) {
          const uploadUrl = await generateUrl();
          const result = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': file.type },
            body: file,
          });
          const { storageId } = await result.json();
          await createAsset({
            fileName: file.name,
            fileType: file.type.startsWith('image') ? 'image' : 'video',
            mimeType: file.type,
            fileSize: file.size,
            storageId,
            source: 'upload',
          });
        }
        onUploadComplete?.();
      } catch (err) {
        console.error('Upload failed:', err);
      } finally {
        setIsUploading(false);
      }
    },
    [generateUrl, createAsset, onUploadComplete],
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={[
        'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all',
        isDragging
          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
          : 'border-border/60 hover:border-primary/40 hover:bg-muted/30',
      ].join(' ')}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {isUploading ? (
        <Loader2 className="mb-2 h-8 w-8 animate-spin text-primary" />
      ) : (
        <Upload className="mb-2 h-8 w-8 text-primary/50" />
      )}
      <p className="text-sm font-medium">
        {isUploading ? 'Uploading...' : 'Drop files here or click to upload'}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Images and videos</p>
    </motion.div>
  );
}
