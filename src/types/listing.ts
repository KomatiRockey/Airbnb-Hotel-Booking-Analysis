export interface Listing {
  id: number;
  listing_id: number;
  name: string;
  host_id: number;
  host_name: string;
  neighbourhood_group: string;
  neighbourhood: string;
  latitude: number;
  longitude: number;
  room_type: string;
  price: number;
  minimum_nights: number;
  number_of_reviews: number;
  last_review: string | null;
  reviews_per_month: number | null;
  calculated_host_listings_count: number;
  availability_365: number;
}

export interface FilterOptions {
  neighbourhoodGroup: string[];
  roomType: string[];
  priceRange: [number, number];
  minReviews: number;
  availability: number;
}

export interface AnalysisMetrics {
  totalListings: number;
  averagePrice: number;
  medianPrice: number;
  mostCommonRoomType: string;
  mostPopularNeighbourhood: string;
  averageReviews: number;
  averageAvailability: number;
}
