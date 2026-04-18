export const APP_NAME = '三亚旅居通';
export const APP_NAME_EN = 'SanyaStay';
export const APP_SLOGAN = '在三亚，住出生活的模样';
export const APP_SLOGAN_EN = 'Live Your Life in Sanya';
export const APP_DESCRIPTION = '三亚旅居通是三亚领先的旅居民宿平台，提供短租、月租、季租一站式服务。';

export const BRAND_COLORS = {
  ocean: '#0077B6',
  oceanLight: '#4DA8DA',
  oceanDark: '#005A8C',
  sand: '#F4A261',
  sandLight: '#F7C59F',
  sandDark: '#E07B3A',
  coral: '#E76F51',
  palm: '#2A9D8F',
} as const;

export const PROPERTY_TYPES = [
  { value: 'apartment', label: '公寓', labelEn: 'Apartment' },
  { value: 'villa', label: '别墅', labelEn: 'Villa' },
  { value: 'house', label: '独栋住宅', labelEn: 'House' },
  { value: 'studio', label: '单间公寓', labelEn: 'Studio' },
  { value: 'resort', label: '度假村', labelEn: 'Resort' },
  { value: 'homestay', label: '民宿', labelEn: 'Homestay' },
] as const;

export const DISTRICTS = [
  { value: 'sanya-bay', label: '三亚湾', labelEn: 'Sanya Bay' },
  { value: 'yalong-bay', label: '亚龙湾', labelEn: 'Yalong Bay' },
  { value: 'haitang-bay', label: '海棠湾', labelEn: 'Haitang Bay' },
  { value: 'dadonghai', label: '大东海', labelEn: 'Dadonghai' },
  { value: 'tianya', label: '天涯区', labelEn: 'Tianya District' },
  { value: 'jiyang', label: '吉阳区', labelEn: 'Jiyang District' },
  { value: 'haikou', label: '海口', labelEn: 'Haikou' },
  { value: 'lingshui', label: '陵水', labelEn: 'Lingshui' },
  { value: 'wanning', label: '万宁', labelEn: 'Wanning' },
] as const;

export const AMENITY_CATEGORIES = [
  { value: 'basic', label: '基础设施', labelEn: 'Essentials' },
  { value: 'kitchen', label: '厨房', labelEn: 'Kitchen' },
  { value: 'bathroom', label: '卫浴', labelEn: 'Bathroom' },
  { value: 'entertainment', label: '娱乐', labelEn: 'Entertainment' },
  { value: 'outdoor', label: '户外', labelEn: 'Outdoor' },
  { value: 'safety', label: '安全', labelEn: 'Safety' },
  { value: 'accessibility', label: '无障碍', labelEn: 'Accessibility' },
  { value: 'health', label: '健康养生', labelEn: 'Health & Wellness' },
] as const;

export const DURATION_TYPES = [
  { value: 'daily', label: '短租 (日)', labelEn: 'Daily', minDays: 1, maxDays: 30 },
  { value: 'monthly', label: '月租', labelEn: 'Monthly', minDays: 30, maxDays: 90 },
  { value: 'seasonal', label: '季租', labelEn: 'Seasonal', minDays: 90, maxDays: 365 },
] as const;

export const SUPPORTED_CURRENCIES = [
  { code: 'CNY', symbol: '¥', label: '人民币' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'RUB', symbol: '₽', label: 'Рубль' },
  { code: 'KRW', symbol: '₩', label: '원' },
  { code: 'JPY', symbol: '¥', label: '円' },
] as const;

export const SUPPORTED_LOCALES = [
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
] as const;

export const COMMUNITY_CATEGORIES = [
  { value: 'life', label: '旅居生活', labelEn: 'Living' },
  { value: 'food', label: '美食探店', labelEn: 'Food' },
  { value: 'travel', label: '游玩攻略', labelEn: 'Travel' },
  { value: 'health', label: '养生健康', labelEn: 'Health' },
  { value: 'social', label: '邻里社交', labelEn: 'Social' },
  { value: 'qa', label: '问答互助', labelEn: 'Q&A' },
] as const;

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/light-v11';
export const SANYA_CENTER: [number, number] = [109.508, 18.248];
export const DEFAULT_ZOOM = 11;
