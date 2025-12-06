import { useState, useRef } from 'react';

export function useImageUpload() {
  const [singleImageFile, setSingleImageFile] = useState(null);
  const [singleImagePreview, setSingleImagePreview] = useState(null);
  const [multiImageFiles, setMultiImageFiles] = useState([]);
  const [multiImagePreviews, setMultiImagePreviews] = useState([]);

  const singleImageInputRef = useRef(null);
  const multiImageInputRef = useRef(null);

  const handleSingleImageUpload = (file) => {
    if (!file) return;

    setSingleImageFile(file);
    setSingleImagePreview(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSingleImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMultiImageUpload = (files) => {
    if (!files || files.length === 0) return;

    // Append new images to existing ones
    const newFiles = [...multiImageFiles, ...files];
    setMultiImageFiles(newFiles);

    // Generate previews for new images only
    const newPreviews = [];
    let completedCount = 0;
    
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result;
        completedCount++;
        if (completedCount === files.length) {
          setMultiImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSingleImage = () => {
    setSingleImageFile(null);
    setSingleImagePreview(null);
    if (singleImageInputRef.current) {
      singleImageInputRef.current.value = '';
    }
  };

  const removeMultiImage = (index) => {
    const newFiles = multiImageFiles.filter((_, i) => i !== index);
    const newPreviews = multiImagePreviews.filter((_, i) => i !== index);
    setMultiImageFiles(newFiles);
    setMultiImagePreviews(newPreviews);
    if (newFiles.length === 0 && multiImageInputRef.current) {
      multiImageInputRef.current.value = '';
    }
  };

  const clearAllImages = () => {
    setSingleImageFile(null);
    setSingleImagePreview(null);
    setMultiImageFiles([]);
    setMultiImagePreviews([]);
  };

  return {
    singleImageFile,
    singleImagePreview,
    multiImageFiles,
    multiImagePreviews,
    singleImageInputRef,
    multiImageInputRef,
    handleSingleImageUpload,
    handleMultiImageUpload,
    removeSingleImage,
    removeMultiImage,
    clearAllImages,
  };
}

