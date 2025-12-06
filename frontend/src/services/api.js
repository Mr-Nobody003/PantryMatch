const API_BASE_URL = 'http://127.0.0.1:5000';

export const api = {
  // Search recipes by ingredients
  searchRecipes: async (query) => {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Failed to fetch recipes');
    return response.json();
  },

  // Classify ingredients from single image (LLM only)
  classifySingleImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch(
      `${API_BASE_URL}/classify-image?mode=llm_only`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to classify image');
    }
    
    return response.json();
  },

  // Classify ingredients from multiple images (CNN + LLM)
  classifyMultiImages: async (imageFiles) => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await fetch(
      `${API_BASE_URL}/classify-image?mode=cnn`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to classify images');
    }
    
    return response.json();
  },

  // Get adaptation advice for missing ingredient
  getAdaptation: async (instructions, missing, title) => {
    const response = await fetch(`${API_BASE_URL}/adapt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instructions,
        missing,
        title,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to get adaptation');
    const data = await response.json();
    return data.adaptedStep;
  },

  // Get YouTube videos for recipe
  getVideos: async (recipeTitle) => {
    const response = await fetch(
      `${API_BASE_URL}/videos?recipe=${encodeURIComponent(recipeTitle)}`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },
};

