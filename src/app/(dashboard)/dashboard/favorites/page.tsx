import { Heart } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { PropertyCard } from '@/components/property/property-card';
import type { Property } from '@/types/database';

const mockFavorites: Property[] = [
  {
    id: 'fav-1', host_id: 'h1', title: '三亚湾海景精装公寓', title_en: null, description: '', description_en: null,
    property_type: 'apartment', status: 'active', address: '', city: '三亚', district: '三亚湾',
    latitude: 18.25, longitude: 109.5, bedrooms: 2, bathrooms: 1, max_guests: 4, area_sqm: 85,
    floor: 15, total_floors: 28, price_daily: 380, price_weekly: null, price_monthly: 3800, price_seasonal: 10000,
    currency: 'CNY', certification_level: 'gold', is_elder_friendly: true, has_elevator: true,
    wifi_speed_mbps: 100, check_in_time: '14:00', check_out_time: '12:00', min_stay_days: 1, max_stay_days: 365,
    cancellation_policy: 'moderate', house_rules: null, average_rating: 4.9, review_count: 128,
    view_count: 0, booking_count: 0, featured: true, created_at: '', updated_at: '', images: [],
  },
  {
    id: 'fav-2', host_id: 'h2', title: '亚龙湾豪华海景别墅', title_en: null, description: '', description_en: null,
    property_type: 'villa', status: 'active', address: '', city: '三亚', district: '亚龙湾',
    latitude: 18.22, longitude: 109.6, bedrooms: 3, bathrooms: 2, max_guests: 6, area_sqm: 200,
    floor: null, total_floors: null, price_daily: 1200, price_weekly: null, price_monthly: 12000, price_seasonal: 30000,
    currency: 'CNY', certification_level: 'diamond', is_elder_friendly: false, has_elevator: false,
    wifi_speed_mbps: 200, check_in_time: '15:00', check_out_time: '11:00', min_stay_days: 1, max_stay_days: 365,
    cancellation_policy: 'strict', house_rules: null, average_rating: 4.8, review_count: 56,
    view_count: 0, booking_count: 0, featured: true, created_at: '', updated_at: '', images: [],
  },
];

export default function FavoritesPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
      {mockFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFavorites.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Heart} title="暂无收藏" description="浏览房源并点击收藏按钮" />
      )}
    </div>
  );
}
