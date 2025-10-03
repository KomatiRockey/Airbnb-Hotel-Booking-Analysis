import { Filter } from 'lucide-react';
import { FilterOptions } from '../types/listing';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  neighbourhoodGroups: string[];
  roomTypes: string[];
  priceRange: [number, number];
}

export function FilterPanel({
  filters,
  onFilterChange,
  neighbourhoodGroups,
  roomTypes,
  priceRange,
}: FilterPanelProps) {
  const handleNeighbourhoodToggle = (neighbourhood: string) => {
    const newNeighbourhoods = filters.neighbourhoodGroup.includes(neighbourhood)
      ? filters.neighbourhoodGroup.filter(n => n !== neighbourhood)
      : [...filters.neighbourhoodGroup, neighbourhood];
    onFilterChange({ ...filters, neighbourhoodGroup: newNeighbourhoods });
  };

  const handleRoomTypeToggle = (roomType: string) => {
    const newRoomTypes = filters.roomType.includes(roomType)
      ? filters.roomType.filter(r => r !== roomType)
      : [...filters.roomType, roomType];
    onFilterChange({ ...filters, roomType: newRoomTypes });
  };

  const handleReset = () => {
    onFilterChange({
      neighbourhoodGroup: [],
      roomType: [],
      priceRange: priceRange,
      minReviews: 0,
      availability: 0,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-700" />
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Borough</h3>
          <div className="space-y-2">
            {neighbourhoodGroups.map(group => (
              <label key={group} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.neighbourhoodGroup.includes(group)}
                  onChange={() => handleNeighbourhoodToggle(group)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                  {group}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Room Type</h3>
          <div className="space-y-2">
            {roomTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.roomType.includes(type)}
                  onChange={() => handleRoomTypeToggle(type)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-600 block mb-2">
                Min Price: ${filters.priceRange[0]}
              </label>
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceRange: [parseInt(e.target.value), filters.priceRange[1]],
                  })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 block mb-2">
                Max Price: ${filters.priceRange[1]}
              </label>
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                  })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Minimum Reviews</h3>
          <input
            type="number"
            min="0"
            value={filters.minReviews}
            onChange={(e) =>
              onFilterChange({ ...filters, minReviews: parseInt(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Minimum Availability (days/year)
          </h3>
          <input
            type="number"
            min="0"
            max="365"
            value={filters.availability}
            onChange={(e) =>
              onFilterChange({ ...filters, availability: parseInt(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}
