import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') || 'guest';

  let query = supabase
    .from('bookings')
    .select('*, property:properties(*, images:property_images(*)), guest:profiles!bookings_guest_id_fkey(*), host:profiles!bookings_host_id_fkey(*)')
    .order('created_at', { ascending: false });

  if (role === 'host') {
    query = query.eq('host_id', user.id);
  } else {
    query = query.eq('guest_id', user.id);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  
  const { data: property } = await supabase
    .from('properties')
    .select('host_id, price_daily, price_monthly, price_seasonal')
    .eq('id', body.property_id)
    .single();

  if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 });

  const checkIn = new Date(body.check_in);
  const checkOut = new Date(body.check_out);
  const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

  let totalPrice = 0;
  let durationType = body.duration_type || 'daily';

  if (durationType === 'seasonal' && property.price_seasonal) {
    totalPrice = property.price_seasonal * Math.ceil(days / 90);
  } else if (durationType === 'monthly' && property.price_monthly) {
    totalPrice = property.price_monthly * Math.ceil(days / 30);
  } else if (property.price_daily) {
    totalPrice = property.price_daily * days;
    durationType = 'daily';
  }

  const serviceFee = Math.round(totalPrice * 0.1);
  const cleaningFee = 200;
  const deposit = Math.round(totalPrice * 0.1);

  const { data, error } = await supabase.from('bookings').insert({
    property_id: body.property_id,
    guest_id: user.id,
    host_id: property.host_id,
    status: 'pending',
    duration_type: durationType,
    check_in: body.check_in,
    check_out: body.check_out,
    guests_count: body.guests_count || 1,
    total_price: totalPrice + serviceFee + cleaningFee,
    currency: 'CNY',
    service_fee: serviceFee,
    cleaning_fee: cleaningFee,
    deposit,
    special_requests: body.special_requests || null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
