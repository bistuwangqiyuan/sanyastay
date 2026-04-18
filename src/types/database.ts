export type UserRole = 'guest' | 'host' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
export type PropertyStatus = 'draft' | 'active' | 'inactive' | 'archived';
export type DurationType = 'daily' | 'weekly' | 'monthly' | 'seasonal';
export type CertificationLevel = 'diamond' | 'gold' | 'silver' | 'standard';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  elder_mode: boolean;
  preferred_language: string;
  bio: string | null;
  credit_score: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  host_id: string;
  title: string;
  title_en: string | null;
  description: string;
  description_en: string | null;
  property_type: string;
  status: PropertyStatus;
  address: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  area_sqm: number;
  floor: number | null;
  total_floors: number | null;
  price_daily: number | null;
  price_weekly: number | null;
  price_monthly: number | null;
  price_seasonal: number | null;
  currency: string;
  certification_level: CertificationLevel;
  is_elder_friendly: boolean;
  has_elevator: boolean;
  wifi_speed_mbps: number | null;
  check_in_time: string;
  check_out_time: string;
  min_stay_days: number;
  max_stay_days: number | null;
  cancellation_policy: string;
  house_rules: string | null;
  average_rating: number;
  review_count: number;
  view_count: number;
  booking_count: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  host?: Profile;
  images?: PropertyImage[];
  amenities?: PropertyAmenity[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  alt_text: string | null;
  is_cover: boolean;
  is_vr_panorama: boolean;
  sort_order: number;
  created_at: string;
}

export interface PropertyAmenity {
  id: string;
  property_id: string;
  category: string;
  name: string;
  name_en: string | null;
  icon: string | null;
}

export interface Booking {
  id: string;
  property_id: string;
  guest_id: string;
  host_id: string;
  status: BookingStatus;
  duration_type: DurationType;
  check_in: string;
  check_out: string;
  guests_count: number;
  total_price: number;
  currency: string;
  service_fee: number;
  cleaning_fee: number;
  deposit: number;
  special_requests: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
  property?: Property;
  guest?: Profile;
  host?: Profile;
}

export interface Review {
  id: string;
  booking_id: string;
  property_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  cleanliness_rating: number;
  accuracy_rating: number;
  communication_rating: number;
  location_rating: number;
  value_rating: number;
  comment: string;
  response: string | null;
  is_from_guest: boolean;
  created_at: string;
  updated_at: string;
  reviewer?: Profile;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  booking_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: Profile;
  receiver?: Profile;
}

export interface CommunityPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  image_urls: string[];
  like_count: number;
  comment_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  author?: Profile;
  comments?: CommunityComment[];
}

export interface CommunityComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  parent_id: string | null;
  like_count: number;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface CommunityEvent {
  id: string;
  organizer_id: string;
  title: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  event_date: string;
  end_date: string | null;
  max_attendees: number | null;
  attendee_count: number;
  category: string;
  image_url: string | null;
  is_free: boolean;
  price: number | null;
  created_at: string;
  updated_at: string;
  organizer?: Profile;
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export interface LifeCirclePOI {
  id: string;
  property_id: string;
  name: string;
  category: string;
  distance_meters: number;
  walking_minutes: number | null;
  driving_minutes: number | null;
  latitude: number;
  longitude: number;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  district?: string;
  property_type?: string;
  duration_type?: DurationType;
  price_min?: number;
  price_max?: number;
  bedrooms_min?: number;
  bathrooms_min?: number;
  guests_min?: number;
  amenities?: string[];
  certification_level?: CertificationLevel;
  is_elder_friendly?: boolean;
  has_elevator?: boolean;
  sort_by?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
  latitude?: number;
  longitude?: number;
  radius_km?: number;
  page?: number;
  per_page?: number;
}

export interface SearchResult {
  properties: Property[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
