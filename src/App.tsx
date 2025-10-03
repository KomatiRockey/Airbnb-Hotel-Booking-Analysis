import { useState, useMemo } from 'react';
import { Building2, DollarSign, MapPin, Star, Home, Calendar, BarChart3 } from 'lucide-react';
import { sampleListings } from './data/sampleData';
import { FilterOptions, Listing } from './types/listing';
import {
  calculateMetrics,
  getNeighbourhoodGroups,
  getRoomTypes,
  getPriceRange,
  getListingsByNeighbourhood,
  getListingsByRoomType,
  getPriceDistribution,
} from './utils/analytics';
import { StatCard } from './components/StatCard';
import { FilterPanel } from './components/FilterPanel';
import { ChartCard } from './components/ChartCard';
import { BarChart } from './components/BarChart';
import { ListingsTable } from './components/ListingsTable';
import { InsightsPanel } from './components/InsightsPanel';

function App() {
  const [listings] = useState<Listing[]>(sampleListings);
  const [filters, setFilters] = useState<FilterOptions>({
    neighbourhoodGroup: [],
    roomType: [],
    priceRange: getPriceRange(sampleListings),
    minReviews: 0,
    availability: 0,
  });

  const neighbourhoodGroups = useMemo(() => getNeighbourhoodGroups(listings), [listings]);
  const roomTypes = useMemo(() => getRoomTypes(listings), [listings]);
  const basePriceRange = useMemo(() => getPriceRange(listings), [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (
        filters.neighbourhoodGroup.length > 0 &&
        !filters.neighbourhoodGroup.includes(listing.neighbourhood_group)
      ) {
        return false;
      }

      if (filters.roomType.length > 0 && !filters.roomType.includes(listing.room_type)) {
        return false;
      }

      if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
        return false;
      }

      if (listing.number_of_reviews < filters.minReviews) {
        return false;
      }

      if (listing.availability_365 < filters.availability) {
        return false;
      }

      return true;
    });
  }, [listings, filters]);

  const metrics = useMemo(() => calculateMetrics(filteredListings), [filteredListings]);
  const neighbourhoodData = useMemo(
    () =>
      Object.entries(getListingsByNeighbourhood(filteredListings)).map(([label, value]) => ({
        label,
        value,
      })),
    [filteredListings]
  );
  const roomTypeData = useMemo(
    () =>
      Object.entries(getListingsByRoomType(filteredListings)).map(([label, value]) => ({
        label,
        value,
      })),
    [filteredListings]
  );
  const priceDistData = useMemo(
    () => getPriceDistribution(filteredListings),
    [filteredListings]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Airbnb NYC Market Analysis
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Comprehensive insights into New York City lodging market dynamics
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              neighbourhoodGroups={neighbourhoodGroups}
              roomTypes={roomTypes}
              priceRange={basePriceRange}
            />
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Listings"
                value={metrics.totalListings}
                icon={Home}
                description="Available properties"
              />
              <StatCard
                title="Average Price"
                value={`$${metrics.averagePrice}`}
                icon={DollarSign}
                description="Per night"
              />
              <StatCard
                title="Median Price"
                value={`$${metrics.medianPrice}`}
                icon={BarChart3}
                description="Market midpoint"
              />
              <StatCard
                title="Avg Reviews"
                value={metrics.averageReviews}
                icon={Star}
                description="Per listing"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Most Common Room Type"
                value={metrics.mostCommonRoomType}
                icon={Building2}
                description="Popular choice"
              />
              <StatCard
                title="Top Neighbourhood"
                value={metrics.mostPopularNeighbourhood}
                icon={MapPin}
                description="Most listings"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Listings by Borough"
                description="Distribution across NYC boroughs"
              >
                <BarChart data={neighbourhoodData} color="bg-blue-500" />
              </ChartCard>

              <ChartCard
                title="Listings by Room Type"
                description="Accommodation type breakdown"
              >
                <BarChart data={roomTypeData} color="bg-green-500" />
              </ChartCard>
            </div>

            <ChartCard
              title="Price Distribution"
              description="Listings grouped by price range"
            >
              <BarChart data={priceDistData} color="bg-amber-500" />
            </ChartCard>

            <InsightsPanel listings={filteredListings} />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Listings Overview
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Detailed view of filtered properties
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-slate-100 rounded-lg">
                  <span className="text-sm font-semibold text-slate-700">
                    {filteredListings.length} results
                  </span>
                </div>
              </div>
              <ListingsTable listings={filteredListings} maxRows={15} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-slate-600">
              NYC Airbnb Market Analysis Dashboard
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Data-driven insights for the hospitality industry
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
