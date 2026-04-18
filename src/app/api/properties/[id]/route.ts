import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      images:property_images(*),
      amenities:property_amenities(*),
      host:profiles!properties_host_id_fkey(*),
      reviews(*, reviewer:profiles!reviews_reviewer_id_fkey(*))
    `)
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  // Increment view count
  await supabase.rpc('increment_view_count', { property_id: id });

  return NextResponse.json(data);
}
