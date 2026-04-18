import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { defaultLocale, type Locale, locales } from './config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  let locale: Locale = defaultLocale;

  const cookieLocale = cookieStore.get('locale')?.value as Locale;
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const acceptLanguage = headerStore.get('accept-language');
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0]?.split(';')[0]?.trim();
      if (preferred) {
        const match = locales.find(
          (l) => l === preferred || l.startsWith(preferred.split('-')[0])
        );
        if (match) locale = match;
      }
    }
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
