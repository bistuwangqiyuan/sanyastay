'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DISTRICTS, DURATION_TYPES } from '@/lib/constants';
import { useAppStore } from '@/store/app-store';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export function SearchBar({ variant = 'hero', className }: SearchBarProps) {
  const router = useRouter();
  const { searchFilters, setSearchFilters, locale } = useAppStore();
  const isZh = locale === 'zh-CN';
  const [query, setQuery] = useState(searchFilters.query || '');

  const handleSearch = () => {
    setSearchFilters({ query });
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (searchFilters.district) params.set('district', searchFilters.district);
    if (searchFilters.duration_type) params.set('duration', searchFilters.duration_type);
    router.push(`/properties?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 max-w-2xl', className)}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isZh ? '搜索区域、小区名称...' : 'Search area, community...'}
            className="pl-10"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-2xl border border-border bg-card p-2 shadow-lg max-w-4xl mx-auto',
      className
    )}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Location */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent transition-colors">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs text-muted-foreground font-medium">{isZh ? '目的地' : 'Location'}</label>
            <Select
              value={searchFilters.district || ''}
              onValueChange={(v) => setSearchFilters({ district: v })}
            >
              <SelectTrigger className="border-0 p-0 h-7 text-sm font-medium shadow-none focus:ring-0">
                <SelectValue placeholder={isZh ? '选择区域' : 'Select area'} />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {isZh ? d.label : d.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Duration Type */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent transition-colors">
          <Calendar className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs text-muted-foreground font-medium">{isZh ? '租期类型' : 'Duration'}</label>
            <Select
              value={searchFilters.duration_type || ''}
              onValueChange={(v) => setSearchFilters({ duration_type: v as 'daily' | 'monthly' | 'seasonal' })}
            >
              <SelectTrigger className="border-0 p-0 h-7 text-sm font-medium shadow-none focus:ring-0">
                <SelectValue placeholder={isZh ? '选择租期' : 'Select type'} />
              </SelectTrigger>
              <SelectContent>
                {DURATION_TYPES.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {isZh ? d.label : d.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent transition-colors">
          <Search className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs text-muted-foreground font-medium">{isZh ? '关键词' : 'Keywords'}</label>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isZh ? '搜索小区、地标...' : 'Community, landmark...'}
              className="border-0 p-0 h-7 text-sm font-medium shadow-none focus:ring-0 focus-visible:ring-0"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-center">
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 rounded-xl h-14 text-base font-semibold gap-2"
          >
            <Search className="h-5 w-5" />
            {isZh ? '搜索房源' : 'Search'}
          </Button>
        </div>
      </div>
    </div>
  );
}
