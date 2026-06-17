import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "./lib/config";

// next-intl 3.26+ 推奨形式: requestLocale を await し、locale も返す
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !LOCALES.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
