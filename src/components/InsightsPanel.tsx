import { TrendingUp, AlertCircle, Target, Award } from 'lucide-react';
import { Listing } from '../types/listing';
import { getTopHosts } from '../utils/analytics';

interface InsightsPanelProps {
  listings: Listing[];
}

export function InsightsPanel({ listings }: InsightsPanelProps) {
  const topHosts = getTopHosts(listings, 5);

  const highlyReviewedListings = listings
    .filter(l => l.number_of_reviews >= 100)
    .length;

  const averageMinNights = Math.round(
    listings.reduce((sum, l) => sum + l.minimum_nights, 0) / listings.length
  );

  const fullyBookedListings = listings.filter(l => l.availability_365 === 0).length;
  const fullyBookedPercentage = ((fullyBookedListings / listings.length) * 100).toFixed(1);

  const insights = [
    {
      icon: TrendingUp,
      title: 'Market Trend',
      description: `${highlyReviewedListings} listings have 100+ reviews, indicating strong market presence and guest satisfaction.`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: AlertCircle,
      title: 'Booking Pattern',
      description: `Average minimum stay is ${averageMinNights} nights. Hosts prefer longer bookings for operational efficiency.`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Target,
      title: 'Availability Insight',
      description: `${fullyBookedPercentage}% of listings are fully booked, showing strong demand in the NYC market.`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-slate-700" />
          <h2 className="text-lg font-semibold text-slate-900">Key Insights</h2>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className={`p-2.5 ${insight.bgColor} rounded-lg h-fit`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Hosts</h3>
        <div className="space-y-3">
          {topHosts.map((host, index) => (
            <div
              key={host.host_id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {host.host_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    ID: {host.host_id}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">{host.count}</p>
                <p className="text-xs text-slate-500">listings</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
