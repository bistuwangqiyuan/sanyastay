export const locales = ['zh-CN', 'en', 'ru', 'ko', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-CN';

export function getMessages(locale: Locale) {
  return import(`./messages/${locale}.json`).then((m) => m.default);
}
