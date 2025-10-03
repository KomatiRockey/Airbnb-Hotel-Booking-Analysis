import { Listing, AnalysisMetrics } from '../types/listing';

export const calculateMetrics = (listings: Listing[]): AnalysisMetrics => {
  if (listings.length === 0) {
    return {
      totalListings: 0,
      averagePrice: 0,
      medianPrice: 0,
      mostCommonRoomType: '',
      mostPopularNeighbourhood: '',
      averageReviews: 0,
      averageAvailability: 0,
    };
  }

  const prices = listings.map(l => l.price).sort((a, b) => a - b);
  const medianPrice = prices.length % 2 === 0
    ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
    : prices[Math.floor(prices.length / 2)];

  const roomTypeCounts = listings.reduce((acc, listing) => {
    acc[listing.room_type] = (acc[listing.room_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const neighbourhoodCounts = listings.reduce((acc, listing) => {
    acc[listing.neighbourhood] = (acc[listing.neighbourhood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonRoomType = Object.entries(roomTypeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const mostPopularNeighbourhood = Object.entries(neighbourhoodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  return {
    totalListings: listings.length,
    averagePrice: Math.round(listings.reduce((sum, l) => sum + l.price, 0) / listings.length),
    medianPrice: Math.round(medianPrice),
    mostCommonRoomType,
    mostPopularNeighbourhood,
    averageReviews: Math.round(listings.reduce((sum, l) => sum + l.number_of_reviews, 0) / listings.length),
    averageAvailability: Math.round(listings.reduce((sum, l) => sum + l.availability_365, 0) / listings.length),
  };
};

export const getNeighbourhoodGroups = (listings: Listing[]): string[] => {
  return Array.from(new Set(listings.map(l => l.neighbourhood_group))).filter(Boolean).sort();
};

export const getRoomTypes = (listings: Listing[]): string[] => {
  return Array.from(new Set(listings.map(l => l.room_type))).filter(Boolean).sort();
};

export const getPriceRange = (listings: Listing[]): [number, number] => {
  if (listings.length === 0) return [0, 1000];
  const prices = listings.map(l => l.price);
  return [Math.min(...prices), Math.max(...prices)];
};

export const getListingsByNeighbourhood = (listings: Listing[]) => {
  return listings.reduce((acc, listing) => {
    const group = listing.neighbourhood_group;
    if (!acc[group]) {
      acc[group] = 0;
    }
    acc[group]++;
    return acc;
  }, {} as Record<string, number>);
};

export const getListingsByRoomType = (listings: Listing[]) => {
  return listings.reduce((acc, listing) => {
    const type = listing.room_type;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type]++;
    return acc;
  }, {} as Record<string, number>);
};

export const getPriceDistribution = (listings: Listing[]) => {
  const ranges = [
    { label: '$0-50', min: 0, max: 50 },
    { label: '$51-100', min: 51, max: 100 },
    { label: '$101-150', min: 101, max: 150 },
    { label: '$151-200', min: 151, max: 200 },
    { label: '$201-300', min: 201, max: 300 },
    { label: '$301+', min: 301, max: Infinity },
  ];

  return ranges.map(range => ({
    label: range.label,
    count: listings.filter(l => l.price >= range.min && l.price <= range.max).length,
  }));
};

export const getTopHosts = (listings: Listing[], limit = 10) => {
  const hostListings = listings.reduce((acc, listing) => {
    if (!acc[listing.host_id]) {
      acc[listing.host_id] = {
        host_id: listing.host_id,
        host_name: listing.host_name,
        count: 0,
      };
    }
    acc[listing.host_id].count++;
    return acc;
  }, {} as Record<number, { host_id: number; host_name: string; count: number }>);

  return Object.values(hostListings)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
