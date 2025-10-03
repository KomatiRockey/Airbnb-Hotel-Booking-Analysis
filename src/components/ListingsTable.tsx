import { Listing } from '../types/listing';
import { MapPin, DollarSign, Calendar, Star } from 'lucide-react';

interface ListingsTableProps {
  listings: Listing[];
  maxRows?: number;
}

export function ListingsTable({ listings, maxRows = 10 }: ListingsTableProps) {
  const displayListings = listings.slice(0, maxRows);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Location</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Room Type</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Price</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Reviews</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Availability</th>
          </tr>
        </thead>
        <tbody>
          {displayListings.map((listing) => (
            <tr
              key={listing.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="max-w-xs">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {listing.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Host: {listing.host_name}
                  </p>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-900">{listing.neighbourhood_group}</p>
                    <p className="text-xs text-slate-500">{listing.neighbourhood}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {listing.room_type}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-900">
                    {listing.price}
                  </span>
                  <span className="text-xs text-slate-500">/night</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-slate-700">
                    {listing.number_of_reviews}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sm text-slate-700">
                    {listing.availability_365}
                  </span>
                  <span className="text-xs text-slate-500">days</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {listings.length > maxRows && (
        <div className="text-center py-4 text-sm text-slate-500">
          Showing {maxRows} of {listings.length} listings
        </div>
      )}
    </div>
  );
}
