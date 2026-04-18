'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { PropertyCard } from '@/components/property/property-card';
import { PropertyListSkeleton } from '@/components/shared/loading-skeleton';
import { EmptyState } from '@/components/shared/empty-state';
import { DISTRICTS, PROPERTY_TYPES, DURATION_TYPES } from '@/lib/constants';
import { useAppStore } from '@/store/app-store';
import type { Property } from '@/types/database';

const MOCK_PROPERTIES: Property[] = Array.from({ length: 12 }, (_, i) => ({
  id: `prop-${i + 1}`,
  host_id: `host-${i}`,
  title: ['海景花园精装两居', '亚龙湾豪华别墅', '三亚湾温馨公寓', '大东海阳光家庭套房', '海棠湾度假公寓', '椰林海景民宿'][i % 6],
  title_en: null,
  description: '精装修旅居公寓，配套齐全',
  description_en: null,
  property_type: ['apartment', 'villa', 'apartment', 'house', 'apartment', 'homestay'][i % 6],
  status: 'active' as const,
  address: '三亚市天涯区海坡路',
  city: '三亚',
  district: ['三亚湾', '亚龙湾', '三亚湾', '大东海', '海棠湾', '三亚湾'][i % 6],
  latitude: 18.25 + Math.random() * 0.05,
  longitude: 109.5 + Math.random() * 0.05,
  bedrooms: [2, 3, 1, 3, 2, 1][i % 6],
  bathrooms: [1, 2, 1, 2, 1, 1][i % 6],
  max_guests: [4, 6, 2, 6, 4, 2][i % 6],
  area_sqm: [85, 200, 55, 120, 90, 45][i % 6],
  floor: 15,
  total_floors: 28,
  price_daily: [380, 1200, 280, 580, 450, 220][i % 6],
  price_weekly: null,
  price_monthly: [3800, 12000, 2800, 5800, 4500, 2200][i % 6],
  price_seasonal: [10000, 30000, 7500, 15000, 12000, 6000][i % 6],
  currency: 'CNY',
  certification_level: ['gold', 'diamond', 'silver', 'gold', 'gold', 'standard'][i % 6] as Property['certification_level'],
  is_elder_friendly: i % 3 === 0,
  has_elevator: true,
  wifi_speed_mbps: 100,
  check_in_time: '14:00',
  check_out_time: '12:00',
  min_stay_days: 1,
  max_stay_days: 365,
  cancellation_policy: 'moderate',
  house_rules: null,
  average_rating: 4.5 + Math.random() * 0.5,
  review_count: Math.floor(20 + Math.random() * 100),
  view_count: 0,
  booking_count: 0,
  featured: i < 3,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  images: [],
}));

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { locale } = useAppStore();
  const isZh = locale === 'zh-CN';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [properties] = useState<Property[]>(MOCK_PROPERTIES);
  const [priceRange, setPriceRange] = useState([0, 20000]);

  const query = searchParams.get('q') || '';

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{isZh ? '搜索房源' : 'Search Properties'}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isZh ? `找到 ${properties.length} 套房源` : `${properties.length} properties found`}
            {query && <span> · {isZh ? '搜索' : 'Search'}: &ldquo;{query}&rdquo;</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="popular">
            <SelectTrigger className="w-36 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">{isZh ? '最热门' : 'Popular'}</SelectItem>
              <SelectItem value="price_asc">{isZh ? '价格低到高' : 'Price Low'}</SelectItem>
              <SelectItem value="price_desc">{isZh ? '价格高到低' : 'Price High'}</SelectItem>
              <SelectItem value="rating">{isZh ? '评分最高' : 'Top Rated'}</SelectItem>
              <SelectItem value="newest">{isZh ? '最新发布' : 'Newest'}</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border border-border rounded-lg">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9 rounded-r-none" onClick={() => setViewMode('grid')}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9 rounded-l-none" onClick={() => setViewMode('list')}>
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                {isZh ? '筛选' : 'Filters'}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{isZh ? '筛选条件' : 'Filters'}</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="font-medium mb-3">{isZh ? '租期类型' : 'Duration'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {DURATION_TYPES.map((d) => (
                      <Badge key={d.value} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary">
                        {isZh ? d.label : d.labelEn}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">{isZh ? '价格范围 (月)' : 'Price Range (/mo)'}</h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={50000} step={500} className="mt-6" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>¥{priceRange[0]}</span>
                    <span>¥{priceRange[1]}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">{isZh ? '区域' : 'District'}</h4>
                  <div className="space-y-2">
                    {DISTRICTS.map((d) => (
                      <label key={d.value} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span className="text-sm">{isZh ? d.label : d.labelEn}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">{isZh ? '房源类型' : 'Property Type'}</h4>
                  <div className="space-y-2">
                    {PROPERTY_TYPES.map((t) => (
                      <label key={t.value} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span className="text-sm">{isZh ? t.label : t.labelEn}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-3">{isZh ? '特殊需求' : 'Special'}</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm">{isZh ? '适老化设施' : 'Senior Friendly'}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm">{isZh ? '有电梯' : 'Has Elevator'}</span>
                    </label>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div>
            <h4 className="font-medium mb-3">{isZh ? '租期类型' : 'Duration'}</h4>
            <div className="flex flex-wrap gap-2">
              {DURATION_TYPES.map((d) => (
                <Badge key={d.value} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary">
                  {isZh ? d.label : d.labelEn}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">{isZh ? '价格范围 (月)' : 'Price (/mo)'}</h4>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={50000} step={500} className="mt-6" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>¥{priceRange[0]}</span>
              <span>¥{priceRange[1]}</span>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">{isZh ? '区域' : 'District'}</h4>
            <div className="space-y-2">
              {DISTRICTS.map((d) => (
                <label key={d.value} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-sm">{isZh ? d.label : d.labelEn}</span>
                </label>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">{isZh ? '房源类型' : 'Type'}</h4>
            <div className="space-y-2">
              {PROPERTY_TYPES.map((t) => (
                <label key={t.value} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-sm">{isZh ? t.label : t.labelEn}</span>
                </label>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{isZh ? '适老化设施' : 'Senior Friendly'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <Checkbox />
              <span className="text-sm">{isZh ? '有电梯' : 'Has Elevator'}</span>
            </label>
          </div>
        </aside>

        {/* Properties Grid */}
        <div className="flex-1">
          {properties.length > 0 ? (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={viewMode === 'list' ? 'horizontal' : 'default'}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title={isZh ? '没有找到匹配的房源' : 'No properties found'}
              description={isZh ? '试试调整筛选条件' : 'Try adjusting your filters'}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertyListSkeleton />}>
      <PropertiesContent />
    </Suspense>
  );
}
