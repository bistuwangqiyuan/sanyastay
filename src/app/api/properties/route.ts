import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('per_page') || '20');
  const query = searchParams.get('query') || '';
  const district = searchParams.get('district') || '';
  const propertyType = searchParams.get('property_type') || '';
  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');
  const sortBy = searchParams.get('sort_by') || 'popular';
  const elderFriendly = searchParams.get('is_elder_friendly');

  if (!supabase) {
    return NextResponse.json({
      properties: [],
      total: 0,
      page,
      per_page: perPage,
      total_pages: 0,
    });
  }

  let dbQuery = supabase
    .from('properties')
    .select('*, images:property_images(*), host:profiles!properties_host_id_fkey(*)', { count: 'exact' })
    .eq('status', 'active');

  if (query) {
    dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%`);
  }
  if (district) {
    dbQuery = dbQuery.eq('district', district);
  }
  if (propertyType) {
    dbQuery = dbQuery.eq('property_type', propertyType);
  }
  if (elderFriendly === 'true') {
    dbQuery = dbQuery.eq('is_elder_friendly', true);
  }
  if (priceMin) {
    dbQuery = dbQuery.gte('price_monthly', parseInt(priceMin));
  }
  if (priceMax) {
    dbQuery = dbQuery.lte('price_monthly', parseInt(priceMax));
  }

  switch (sortBy) {
    case 'price_asc':
      dbQuery = dbQuery.order('price_monthly', { ascending: true, nullsFirst: false });
      break;
    case 'price_desc':
      dbQuery = dbQuery.order('price_monthly', { ascending: false, nullsFirst: false });
      break;
    case 'rating':
      dbQuery = dbQuery.order('average_rating', { ascending: false });
      break;
    case 'newest':
      dbQuery = dbQuery.order('created_at', { ascending: false });
      break;
    case 'popular':
    default:
      dbQuery = dbQuery.order('booking_count', { ascending: false });
      break;
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  dbQuery = dbQuery.range(from, to);

  const { data, count, error } = await dbQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    properties: data || [],
    total: count || 0,
    page,
    per_page: perPage,
    total_pages: Math.ceil((count || 0) / perPage),
  });
}
