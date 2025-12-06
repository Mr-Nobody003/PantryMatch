import { useState } from 'react';
import { api } from '../services/api';

export function useIngredientDetection() {
  const [detectingSingle, setDetectingSingle] = useState(false);
  const [detectingMulti, setDetectingMulti] = useState(false);
  const [cnnDetected, setCnnDetected] = useState([]);
  const [llmDetected, setLlmDetected] = useState([]);

  const detectFromSingleImage = async (imageFile, onSuccess, onError) => {
    if (!imageFile) return;
    
    setDetectingSingle(true);
    setCnnDetected([]);
    setLlmDetected([]);

    try {
      const data = await api.classifySingleImage(imageFile);
      
      const cnnList = Array.isArray(data.cnn_ingredients) ? data.cnn_ingredients : [];
      const llmList = Array.isArray(data.ingredients) ? data.ingredients : [];

      setCnnDetected(cnnList);
      setLlmDetected(llmList);

      if (llmList.length > 0 && onSuccess) {
        onSuccess(llmList.join(', '));
      } else if (onError) {
        onError('No ingredients detected from image');
      }
    } catch (err) {
      console.error(err);
      if (onError) {
        onError(err.message || 'Error detecting ingredients from image');
      }
    } finally {
      setDetectingSingle(false);
    }
  };

  const detectFromMultiImages = async (imageFiles, onSuccess, onError) => {
    if (imageFiles.length === 0) return;
    
    setDetectingMulti(true);
    setCnnDetected([]);
    setLlmDetected([]);

    try {
      const data = await api.classifyMultiImages(imageFiles);
      
      const cnnList = Array.isArray(data.cnn_ingredients) ? data.cnn_ingredients : [];
      const llmList = Array.isArray(data.ingredients) ? data.ingredients : [];

      setCnnDetected(cnnList);
      setLlmDetected(llmList);

      if (llmList.length > 0 && onSuccess) {
        onSuccess(llmList.join(', '));
      } else if (onError) {
        onError('No ingredients detected from images');
      }
    } catch (err) {
      console.error(err);
      if (onError) {
        onError(err.message || 'Error detecting ingredients from images');
      }
    } finally {
      setDetectingMulti(false);
    }
  };

  const clearDetections = () => {
    setCnnDetected([]);
    setLlmDetected([]);
  };

  return {
    detectingSingle,
    detectingMulti,
    cnnDetected,
    llmDetected,
    detectFromSingleImage,
    detectFromMultiImages,
    clearDetections,
  };
}

