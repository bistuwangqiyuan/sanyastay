import { z } from 'zod/v4';

export const propertySchema = z.object({
  title: z.string().min(5, '标题至少5个字符').max(100, '标题不超过100个字符'),
  title_en: z.string().optional(),
  description: z.string().min(20, '描述至少20个字符').max(5000, '描述不超过5000个字符'),
  description_en: z.string().optional(),
  property_type: z.string().min(1, '请选择房源类型'),
  address: z.string().min(5, '请输入详细地址'),
  city: z.string().min(1, '请选择城市'),
  district: z.string().min(1, '请选择区域'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  bedrooms: z.number().int().min(0).max(20),
  bathrooms: z.number().int().min(1).max(20),
  max_guests: z.number().int().min(1).max(50),
  area_sqm: z.number().min(10).max(10000),
  floor: z.number().int().optional(),
  total_floors: z.number().int().optional(),
  price_daily: z.number().min(0).optional(),
  price_monthly: z.number().min(0).optional(),
  price_seasonal: z.number().min(0).optional(),
  is_elder_friendly: z.boolean(),
  has_elevator: z.boolean(),
  wifi_speed_mbps: z.number().min(0).optional(),
  check_in_time: z.string(),
  check_out_time: z.string(),
  min_stay_days: z.number().int().min(1),
  max_stay_days: z.number().int().optional(),
  cancellation_policy: z.string(),
  house_rules: z.string().optional(),
});

export const bookingSchema = z.object({
  property_id: z.string().uuid(),
  check_in: z.string(),
  check_out: z.string(),
  guests_count: z.number().int().min(1),
  duration_type: z.enum(['daily', 'weekly', 'monthly', 'seasonal']),
  special_requests: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
