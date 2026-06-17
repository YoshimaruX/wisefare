import createMiddleware from "next-intl/middleware";
import { LOCALES, DEFAULT_LOCALE } from "./lib/config";

export default createMiddleware({
  locales: LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always", // 常に /ja /en /fr /es を付与
});

export const config = {
  // _next, api, 静的ファイルを除く全パスにロケール処理を適用
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
