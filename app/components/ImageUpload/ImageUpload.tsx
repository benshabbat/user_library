'use client';

import { useState, useCallback } from 'react';
import styles from './ImageUpload.module.scss';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  initialImage?: string;
}

export default function ImageUpload({ onImageSelect, initialImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialImage || '');

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        console.log('Image converted to base64');
        setImagePreview(imageUrl);
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {imagePreview ? (
          <div className={styles.preview}>
            <img src={imagePreview} alt="Preview" />
            <button 
              type="button" 
              className={styles.changeButton}
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('fileInput')?.click();
              }}
            >
              Change Image
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
              <line x1="16" y1="5" x2="22" y2="5" />
              <line x1="19" y1="2" x2="19" y2="8" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <p>Drag & drop an image here or click to select</p>
          </div>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        className={styles.fileInput}
        accept="image/*"
        onChange={handleFileInput}
      />
    </div>
  );
}