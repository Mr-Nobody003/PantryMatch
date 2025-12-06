// Format AI suggestion text into bullet points
export function formatAdaptationText(text) {
  if (!text) return [];
  
  // Split by common patterns: numbered lists, bullet points, line breaks, or periods
  // First, try to split by numbered items (1., 2., etc.)
  let items = text.split(/(?=\d+\.\s)/).filter(item => item.trim());
  
  // If no numbered items, try splitting by line breaks
  if (items.length <= 1) {
    items = text.split(/\n+/).filter(item => item.trim());
  }
  
  // If still single item, try splitting by periods followed by space
  if (items.length <= 1) {
    items = text.split(/\.\s+/).filter(item => item.trim() && item.length > 10);
  }
  
  // Clean up items: remove leading numbers/bullets, trim whitespace
  return items.map(item => {
    // Remove leading numbers, bullets, dashes
    item = item.replace(/^[\d\-\•\*\u2022]\s*/, '').trim();
    // Remove trailing period if present
    item = item.replace(/\.$/, '');
    return item;
  }).filter(item => item.length > 0);
}

