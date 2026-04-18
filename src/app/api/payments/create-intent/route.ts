import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { booking_id, currency = 'cny' } = await request.json();

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, property:properties(title)')
    .eq('id', booking_id)
    .eq('guest_id', user.id)
    .single();

  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

  const paymentIntent = await getStripe().paymentIntents.create({
    amount: Math.round(booking.total_price * 100),
    currency,
    metadata: {
      booking_id: booking.id,
      user_id: user.id,
      property_title: booking.property?.title || '',
    },
    description: `SanyaStay Booking: ${booking.property?.title}`,
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
