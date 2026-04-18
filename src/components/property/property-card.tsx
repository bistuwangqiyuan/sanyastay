'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, MapPin, Bed, Bath, Maximize, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import type { Property } from '@/types/database';
import { useAppStore } from '@/store/app-store';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'horizontal';
  className?: string;
}

const certBadgeColors = {
  diamond: 'bg-violet-100 text-violet-800 border-violet-200',
  gold: 'bg-amber-100 text-amber-800 border-amber-200',
  silver: 'bg-slate-100 text-slate-600 border-slate-200',
  standard: 'bg-gray-100 text-gray-600 border-gray-200',
};

const certLabels = {
  diamond: '钻石',
  gold: '金牌',
  silver: '银牌',
  standard: '标准',
};

export function PropertyCard({ property, variant = 'default', className }: PropertyCardProps) {
  const { currency, locale } = useAppStore();
  const isZh = locale === 'zh-CN';
  const coverImage = property.images?.find((img) => img.is_cover)?.url || property.images?.[0]?.url || '/placeholder-property.jpg';

  const displayPrice = property.price_monthly || property.price_daily || 0;
  const priceUnit = property.price_monthly ? (isZh ? '/月' : '/mo') : (isZh ? '/晚' : '/night');

  if (variant === 'horizontal') {
    return (
      <Link href={`/properties/${property.id}`}>
        <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow group', className)}>
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-72 h-48 sm:h-auto shrink-0">
              <Image src={coverImage} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              {property.certification_level !== 'standard' && (
                <Badge className={cn('absolute top-3 left-3', certBadgeColors[property.certification_level])}>
                  <Award className="h-3 w-3 mr-1" />
                  {certLabels[property.certification_level]}
                </Badge>
              )}
            </div>
            <CardContent className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.district} · {property.city}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-sand text-sand" />
                  <span className="font-semibold">{property.average_rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({property.review_count})</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms}{isZh ? '室' : 'BR'}</span>
                <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms}{isZh ? '卫' : 'BA'}</span>
                <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {property.area_sqm}m²</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-bold text-primary">{formatPrice(displayPrice, currency)}</span>
                  <span className="text-sm text-muted-foreground">{priceUnit}</span>
                </div>
                {property.is_elder_friendly && (
                  <Badge variant="outline" className="text-palm border-palm/30">
                    {isZh ? '适老化' : 'Senior OK'}
                  </Badge>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className={cn('overflow-hidden hover:shadow-lg transition-all duration-300 group', className)}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={coverImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {property.certification_level !== 'standard' && (
            <Badge className={cn('absolute top-3 left-3', certBadgeColors[property.certification_level])}>
              <Award className="h-3 w-3 mr-1" />
              {certLabels[property.certification_level]}
            </Badge>
          )}
          {property.featured && (
            <Badge className="absolute top-3 right-12 bg-sand text-white border-0">
              {isZh ? '精选' : 'Featured'}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-foreground"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="h-3.5 w-3.5 fill-sand text-sand" />
              <span className="text-sm font-semibold">{property.average_rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
            <MapPin className="h-3 w-3" />
            {property.district}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.bathrooms}</span>
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.area_sqm}m²</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">{formatPrice(displayPrice, currency)}</span>
              <span className="text-xs text-muted-foreground">{priceUnit}</span>
            </div>
            {property.is_elder_friendly && (
              <Badge variant="outline" className="text-xs text-palm border-palm/30">
                {isZh ? '适老' : 'Senior'}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
