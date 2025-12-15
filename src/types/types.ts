export interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

// Define the main structure for a Historical Building entry
export interface HistoricalBuilding {
  shortcode: string;
  title: string;
  location: LocationData;
  imageUrl: string; // The primary image URL (often used for previews)
  addedDate: string; // ISO 8601 string format
  hashtags: string[];
  description: string;
  images: string[]; // Array of image URLs for the carousel
}