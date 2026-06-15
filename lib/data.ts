/**
 * Wisefare — master data
 * 国(価格係数つき) / 国別の主要空港 / ホテル都市 / VPN 一覧。
 * 本番では価格係数(pf/ph)は使わず、実 API のレスポンスで置き換わります。
 * 係数はあくまでデモ用フォールバック値です。
 */
import type { Locale } from "./config";

export interface Country {
  c: string;            // ISO国コード
  fl: string;           // 国旗絵文字
  pf: number;           // フライト価格係数(デモ用, 米国=1.00)
  ph: number;           // ホテル価格係数(デモ用, 米国=1.00)
  nm: Record<Locale, string>; // 多言語国名
}

/** スキャン対象国(約47カ国)。安くなりやすい国を調査に基づき網羅 */
export const COUNTRIES: Country[] = [
  { c: "AR", fl: "🇦🇷", pf: 0.82, ph: 0.86, nm: { ja: "アルゼンチン", en: "Argentina", fr: "Argentine", es: "Argentina" } },
  { c: "AU", fl: "🇦🇺", pf: 1.00, ph: 1.02, nm: { ja: "オーストラリア", en: "Australia", fr: "Australie", es: "Australia" } },
  { c: "AT", fl: "🇦🇹", pf: 0.98, ph: 1.00, nm: { ja: "オーストリア", en: "Austria", fr: "Autriche", es: "Austria" } },
  { c: "BE", fl: "🇧🇪", pf: 0.98, ph: 1.00, nm: { ja: "ベルギー", en: "Belgium", fr: "Belgique", es: "Bélgica" } },
  { c: "BR", fl: "🇧🇷", pf: 0.85, ph: 0.90, nm: { ja: "ブラジル", en: "Brazil", fr: "Brésil", es: "Brasil" } },
  { c: "BG", fl: "🇧🇬", pf: 0.84, ph: 0.88, nm: { ja: "ブルガリア", en: "Bulgaria", fr: "Bulgarie", es: "Bulgaria" } },
  { c: "CA", fl: "🇨🇦", pf: 0.99, ph: 1.01, nm: { ja: "カナダ", en: "Canada", fr: "Canada", es: "Canadá" } },
  { c: "CL", fl: "🇨🇱", pf: 0.87, ph: 0.91, nm: { ja: "チリ", en: "Chile", fr: "Chili", es: "Chile" } },
  { c: "CO", fl: "🇨🇴", pf: 0.81, ph: 0.85, nm: { ja: "コロンビア", en: "Colombia", fr: "Colombie", es: "Colombia" } },
  { c: "CZ", fl: "🇨🇿", pf: 0.86, ph: 0.89, nm: { ja: "チェコ", en: "Czechia", fr: "Tchéquie", es: "Chequia" } },
  { c: "DK", fl: "🇩🇰", pf: 1.01, ph: 1.03, nm: { ja: "デンマーク", en: "Denmark", fr: "Danemark", es: "Dinamarca" } },
  { c: "EG", fl: "🇪🇬", pf: 0.80, ph: 0.84, nm: { ja: "エジプト", en: "Egypt", fr: "Égypte", es: "Egipto" } },
  { c: "FI", fl: "🇫🇮", pf: 0.99, ph: 1.01, nm: { ja: "フィンランド", en: "Finland", fr: "Finlande", es: "Finlandia" } },
  { c: "FR", fl: "🇫🇷", pf: 0.97, ph: 0.99, nm: { ja: "フランス", en: "France", fr: "France", es: "Francia" } },
  { c: "DE", fl: "🇩🇪", pf: 0.98, ph: 1.00, nm: { ja: "ドイツ", en: "Germany", fr: "Allemagne", es: "Alemania" } },
  { c: "GR", fl: "🇬🇷", pf: 0.90, ph: 0.93, nm: { ja: "ギリシャ", en: "Greece", fr: "Grèce", es: "Grecia" } },
  { c: "HK", fl: "🇭🇰", pf: 0.94, ph: 0.97, nm: { ja: "香港", en: "Hong Kong", fr: "Hong Kong", es: "Hong Kong" } },
  { c: "HU", fl: "🇭🇺", pf: 0.83, ph: 0.86, nm: { ja: "ハンガリー", en: "Hungary", fr: "Hongrie", es: "Hungría" } },
  { c: "IN", fl: "🇮🇳", pf: 0.74, ph: 0.90, nm: { ja: "インド", en: "India", fr: "Inde", es: "India" } },
  { c: "ID", fl: "🇮🇩", pf: 0.79, ph: 0.83, nm: { ja: "インドネシア", en: "Indonesia", fr: "Indonésie", es: "Indonesia" } },
  { c: "IE", fl: "🇮🇪", pf: 0.98, ph: 1.00, nm: { ja: "アイルランド", en: "Ireland", fr: "Irlande", es: "Irlanda" } },
  { c: "IL", fl: "🇮🇱", pf: 0.96, ph: 0.99, nm: { ja: "イスラエル", en: "Israel", fr: "Israël", es: "Israel" } },
  { c: "IT", fl: "🇮🇹", pf: 0.95, ph: 0.98, nm: { ja: "イタリア", en: "Italy", fr: "Italie", es: "Italia" } },
  { c: "JP", fl: "🇯🇵", pf: 0.92, ph: 0.94, nm: { ja: "日本", en: "Japan", fr: "Japon", es: "Japón" } },
  { c: "MY", fl: "🇲🇾", pf: 0.78, ph: 0.82, nm: { ja: "マレーシア", en: "Malaysia", fr: "Malaisie", es: "Malasia" } },
  { c: "MX", fl: "🇲🇽", pf: 0.80, ph: 0.88, nm: { ja: "メキシコ", en: "Mexico", fr: "Mexique", es: "México" } },
  { c: "NL", fl: "🇳🇱", pf: 0.98, ph: 1.00, nm: { ja: "オランダ", en: "Netherlands", fr: "Pays-Bas", es: "Países Bajos" } },
  { c: "NZ", fl: "🇳🇿", pf: 0.99, ph: 1.01, nm: { ja: "ニュージーランド", en: "New Zealand", fr: "Nouvelle-Zélande", es: "Nueva Zelanda" } },
  { c: "NO", fl: "🇳🇴", pf: 1.02, ph: 1.04, nm: { ja: "ノルウェー", en: "Norway", fr: "Norvège", es: "Noruega" } },
  { c: "PE", fl: "🇵🇪", pf: 0.81, ph: 0.85, nm: { ja: "ペルー", en: "Peru", fr: "Pérou", es: "Perú" } },
  { c: "PH", fl: "🇵🇭", pf: 0.79, ph: 0.84, nm: { ja: "フィリピン", en: "Philippines", fr: "Philippines", es: "Filipinas" } },
  { c: "PL", fl: "🇵🇱", pf: 0.80, ph: 0.81, nm: { ja: "ポーランド", en: "Poland", fr: "Pologne", es: "Polonia" } },
  { c: "PT", fl: "🇵🇹", pf: 0.91, ph: 0.94, nm: { ja: "ポルトガル", en: "Portugal", fr: "Portugal", es: "Portugal" } },
  { c: "RO", fl: "🇷🇴", pf: 0.82, ph: 0.85, nm: { ja: "ルーマニア", en: "Romania", fr: "Roumanie", es: "Rumanía" } },
  { c: "SG", fl: "🇸🇬", pf: 0.93, ph: 0.97, nm: { ja: "シンガポール", en: "Singapore", fr: "Singapour", es: "Singapur" } },
  { c: "ZA", fl: "🇿🇦", pf: 0.83, ph: 0.87, nm: { ja: "南アフリカ", en: "South Africa", fr: "Afrique du Sud", es: "Sudáfrica" } },
  { c: "KR", fl: "🇰🇷", pf: 0.90, ph: 0.93, nm: { ja: "韓国", en: "South Korea", fr: "Corée du Sud", es: "Corea del Sur" } },
  { c: "ES", fl: "🇪🇸", pf: 0.93, ph: 0.96, nm: { ja: "スペイン", en: "Spain", fr: "Espagne", es: "España" } },
  { c: "SE", fl: "🇸🇪", pf: 0.99, ph: 1.01, nm: { ja: "スウェーデン", en: "Sweden", fr: "Suède", es: "Suecia" } },
  { c: "CH", fl: "🇨🇭", pf: 1.03, ph: 1.05, nm: { ja: "スイス", en: "Switzerland", fr: "Suisse", es: "Suiza" } },
  { c: "TW", fl: "🇹🇼", pf: 0.88, ph: 0.92, nm: { ja: "台湾", en: "Taiwan", fr: "Taïwan", es: "Taiwán" } },
  { c: "TH", fl: "🇹🇭", pf: 0.77, ph: 0.85, nm: { ja: "タイ", en: "Thailand", fr: "Thaïlande", es: "Tailandia" } },
  { c: "TR", fl: "🇹🇷", pf: 0.76, ph: 0.83, nm: { ja: "トルコ", en: "Turkey", fr: "Turquie", es: "Turquía" } },
  { c: "AE", fl: "🇦🇪", pf: 0.92, ph: 0.95, nm: { ja: "アラブ首長国連邦", en: "UAE", fr: "Émirats arabes unis", es: "EAU" } },
  { c: "GB", fl: "🇬🇧", pf: 0.99, ph: 1.01, nm: { ja: "イギリス", en: "United Kingdom", fr: "Royaume-Uni", es: "Reino Unido" } },
  { c: "US", fl: "🇺🇸", pf: 1.00, ph: 1.00, nm: { ja: "アメリカ", en: "USA", fr: "États-Unis", es: "EE. UU." } },
  { c: "VN", fl: "🇻🇳", pf: 0.76, ph: 0.82, nm: { ja: "ベトナム", en: "Vietnam", fr: "Viêt Nam", es: "Vietnam" } },
];

export const CTRY = (c: string) => COUNTRIES.find((x) => x.c === c)!;

/** 国 → 主要空港([IATA, 都市名]) */
export const AIRPORTS: Record<string, [string, string][]> = {
  AR: [["EZE", "Buenos Aires"]],
  AU: [["SYD", "Sydney"], ["MEL", "Melbourne"], ["BNE", "Brisbane"], ["PER", "Perth"]],
  AT: [["VIE", "Vienna"]],
  BE: [["BRU", "Brussels"]],
  BR: [["GRU", "São Paulo"], ["GIG", "Rio de Janeiro"], ["BSB", "Brasília"]],
  BG: [["SOF", "Sofia"]],
  CA: [["YYZ", "Toronto"], ["YVR", "Vancouver"], ["YUL", "Montreal"]],
  CL: [["SCL", "Santiago"]],
  CO: [["BOG", "Bogotá"], ["MDE", "Medellín"]],
  CZ: [["PRG", "Prague"]],
  DK: [["CPH", "Copenhagen"]],
  EG: [["CAI", "Cairo"]],
  FI: [["HEL", "Helsinki"]],
  FR: [["CDG", "Paris"], ["NCE", "Nice"], ["LYS", "Lyon"], ["MRS", "Marseille"]],
  DE: [["FRA", "Frankfurt"], ["MUC", "Munich"], ["BER", "Berlin"]],
  GR: [["ATH", "Athens"]],
  HK: [["HKG", "Hong Kong"]],
  HU: [["BUD", "Budapest"]],
  IN: [["DEL", "Delhi"], ["BOM", "Mumbai"], ["BLR", "Bengaluru"]],
  ID: [["CGK", "Jakarta"], ["DPS", "Bali (Denpasar)"]],
  IE: [["DUB", "Dublin"]],
  IL: [["TLV", "Tel Aviv"]],
  IT: [["FCO", "Rome"], ["MXP", "Milan"], ["VCE", "Venice"]],
  JP: [["NRT", "Tokyo (Narita)"], ["HND", "Tokyo (Haneda)"], ["KIX", "Osaka"], ["FUK", "Fukuoka"], ["OKA", "Okinawa"], ["CTS", "Sapporo"]],
  MY: [["KUL", "Kuala Lumpur"]],
  MX: [["MEX", "Mexico City"], ["CUN", "Cancún"]],
  NL: [["AMS", "Amsterdam"]],
  NZ: [["AKL", "Auckland"]],
  NO: [["OSL", "Oslo"]],
  PE: [["LIM", "Lima"]],
  PH: [["MNL", "Manila"], ["CEB", "Cebu"]],
  PL: [["WAW", "Warsaw"], ["KRK", "Kraków"], ["WRO", "Wrocław"], ["GDN", "Gdańsk"]],
  PT: [["LIS", "Lisbon"], ["OPO", "Porto"]],
  RO: [["OTP", "Bucharest"]],
  SG: [["SIN", "Singapore"]],
  ZA: [["JNB", "Johannesburg"], ["CPT", "Cape Town"]],
  KR: [["ICN", "Seoul"], ["PUS", "Busan"]],
  ES: [["MAD", "Madrid"], ["BCN", "Barcelona"], ["AGP", "Málaga"], ["PMI", "Palma"]],
  SE: [["ARN", "Stockholm"]],
  CH: [["ZRH", "Zurich"], ["GVA", "Geneva"]],
  TW: [["TPE", "Taipei"]],
  TH: [["BKK", "Bangkok"], ["HKT", "Phuket"], ["CNX", "Chiang Mai"]],
  TR: [["IST", "Istanbul"], ["AYT", "Antalya"]],
  AE: [["DXB", "Dubai"], ["AUH", "Abu Dhabi"]],
  GB: [["LHR", "London (Heathrow)"], ["LGW", "London (Gatwick)"], ["MAN", "Manchester"], ["EDI", "Edinburgh"]],
  US: [["JFK", "New York (JFK)"], ["LAX", "Los Angeles"], ["SFO", "San Francisco"], ["ORD", "Chicago"], ["MIA", "Miami"], ["HNL", "Honolulu"]],
  VN: [["SGN", "Ho Chi Minh City"], ["HAN", "Hanoi"]],
};

/** 国 → 主要観光都市(ホテル用) */
export const HOTEL_CITIES: Record<string, string[]> = {
  AR: ["Buenos Aires"], AU: ["Sydney", "Melbourne"], AT: ["Vienna", "Salzburg"], BE: ["Brussels", "Bruges"],
  BR: ["Rio de Janeiro", "São Paulo"], BG: ["Sofia"], CA: ["Toronto", "Vancouver"], CL: ["Santiago"],
  CO: ["Bogotá", "Cartagena"], CZ: ["Prague"], DK: ["Copenhagen"], EG: ["Cairo", "Hurghada"],
  FI: ["Helsinki"], FR: ["Paris", "Nice", "Lyon"], DE: ["Berlin", "Munich"], GR: ["Athens", "Santorini"],
  HK: ["Hong Kong"], HU: ["Budapest"], IN: ["Delhi", "Mumbai", "Jaipur"], ID: ["Bali", "Jakarta"],
  IE: ["Dublin"], IL: ["Tel Aviv", "Jerusalem"], IT: ["Rome", "Venice", "Florence"],
  JP: ["Tokyo", "Osaka", "Kyoto"], MY: ["Kuala Lumpur"], MX: ["Mexico City", "Cancún"],
  NL: ["Amsterdam"], NZ: ["Auckland", "Queenstown"], NO: ["Oslo"], PE: ["Lima", "Cusco"],
  PH: ["Manila", "Cebu"], PL: ["Warsaw", "Kraków"], PT: ["Lisbon", "Porto"], RO: ["Bucharest"],
  SG: ["Singapore"], ZA: ["Cape Town", "Johannesburg"], KR: ["Seoul", "Busan"],
  ES: ["Madrid", "Barcelona", "Seville"], SE: ["Stockholm"], CH: ["Zurich", "Geneva"],
  TW: ["Taipei"], TH: ["Bangkok", "Phuket", "Chiang Mai"], TR: ["Istanbul", "Antalya"],
  AE: ["Dubai", "Abu Dhabi"], GB: ["London", "Edinburgh"], US: ["New York", "Los Angeles", "Las Vegas"],
  VN: ["Ho Chi Minh City", "Hanoi"],
};

export interface Vpn {
  id: string;
  name: string;
  long: number;   // 長期プラン月額(円)
  single: number; // 単月価格(円)
  countries: number;
  dev: string;    // 同時接続台数 ("unl" = 無制限)
  refund: number; // 返金保証日数
  tag?: "long" | "single";
  /** アフィリエイトリンク(本番で差し替え) */
  affiliateUrlEnv: string;
}

export const VPNS: Vpn[] = [
  { id: "sfs", name: "Surfshark",  long: 300, single: 2320, countries: 100, dev: "unl", refund: 30, tag: "long",   affiliateUrlEnv: "AFF_SURFSHARK" },
  { id: "pia", name: "PIA",        long: 330, single: 1790, countries: 91,  dev: "unl", refund: 30,                affiliateUrlEnv: "AFF_PIA" },
  { id: "exp", name: "ExpressVPN", long: 370, single: 1940, countries: 105, dev: "8",   refund: 30,                affiliateUrlEnv: "AFF_EXPRESSVPN" },
  { id: "nrd", name: "NordVPN",    long: 440, single: 1950, countries: 126, dev: "10",  refund: 30,                affiliateUrlEnv: "AFF_NORDVPN" },
  { id: "ptn", name: "Proton VPN", long: 450, single: 1500, countries: 112, dev: "10",  refund: 30, tag: "single", affiliateUrlEnv: "AFF_PROTONVPN" },
];
