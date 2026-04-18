'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Property, SearchFilters, SearchResult } from '@/types/database';

async function fetchProperties(filters: SearchFilters): Promise<SearchResult> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, String(value));
      }
    }
  });
  const res = await fetch(`/api/properties?${params}`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

async function fetchProperty(id: string): Promise<Property> {
  const res = await fetch(`/api/properties/${id}`);
  if (!res.ok) throw new Error('Failed to fetch property');
  return res.json();
}

export function useProperties(filters: SearchFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, isFavorited }: { propertyId: string; isFavorited: boolean }) => {
      const res = await fetch('/api/properties/favorites', {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property_id: propertyId }),
      });
      if (!res.ok) throw new Error('Failed to update favorite');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}
