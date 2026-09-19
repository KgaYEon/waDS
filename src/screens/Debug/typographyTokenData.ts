/**
 * Mirrors tokens.css's typography layer, for the /debug/colors "타이포"
 * tab. Same rationale as colorTokenData.ts: kept as plain literals (not
 * read from the CSS) so the page's displayed size/weight/line-height
 * text is an independent cross-check against the live var()-rendered
 * sample next to it — a drift between the two is a visible bug on the
 * page itself, not a silent one.
 */

export interface TypographyToken {
  cssVarBase: string;
  label: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface TypographyGroup {
  title: string;
  tokens: TypographyToken[];
}

export const typographyGroups: TypographyGroup[] = [
  {
    title: "Loading title",
    tokens: [
      { cssVarBase: "--font-loading-title-l", label: "Loading title-L", size: "32px", weight: "700", lineHeight: "40px", letterSpacing: "0" },
      { cssVarBase: "--font-loading-title-s", label: "Loading title-S", size: "24px", weight: "700", lineHeight: "32px", letterSpacing: "0" },
    ],
  },
  {
    title: "Page title",
    tokens: [
      { cssVarBase: "--font-page-title-l", label: "Page title-L", size: "26px", weight: "500", lineHeight: "34px", letterSpacing: "0" },
      { cssVarBase: "--font-page-title-s", label: "Page title-S", size: "20px", weight: "500", lineHeight: "28px", letterSpacing: "0" },
    ],
  },
  {
    title: "Heading",
    tokens: [
      { cssVarBase: "--font-heading-1", label: "Heading-1", size: "32px", weight: "500", lineHeight: "40px", letterSpacing: "0" },
      { cssVarBase: "--font-heading-2", label: "Heading-2", size: "28px", weight: "500", lineHeight: "36px", letterSpacing: "0" },
      { cssVarBase: "--font-heading-3", label: "Heading-3", size: "24px", weight: "500", lineHeight: "32px", letterSpacing: "0" },
      { cssVarBase: "--font-heading-4", label: "Heading-4", size: "20px", weight: "500", lineHeight: "28px", letterSpacing: "0" },
    ],
  },
  {
    title: "Body",
    tokens: [
      { cssVarBase: "--font-body-1", label: "Body-1", size: "20px", weight: "400", lineHeight: "28px", letterSpacing: "0" },
      { cssVarBase: "--font-body-2", label: "Body-2", size: "18px", weight: "400", lineHeight: "26px", letterSpacing: "0" },
      { cssVarBase: "--font-body-3", label: "Body-3", size: "16px", weight: "400", lineHeight: "24px", letterSpacing: "0" },
    ],
  },
  {
    title: "Card",
    tokens: [
      { cssVarBase: "--font-card-1", label: "Card-1", size: "16px", weight: "600", lineHeight: "24px", letterSpacing: "0" },
      { cssVarBase: "--font-card-2", label: "Card-2", size: "14px", weight: "600", lineHeight: "21px", letterSpacing: "0" },
      { cssVarBase: "--font-card-3", label: "Card-3", size: "12px", weight: "600", lineHeight: "18px", letterSpacing: "0" },
    ],
  },
  {
    title: "Label",
    tokens: [
      { cssVarBase: "--font-label-l", label: "Label-L", size: "16px", weight: "400", lineHeight: "24px", letterSpacing: "0" },
      { cssVarBase: "--font-label-m", label: "Label-M", size: "14px", weight: "400", lineHeight: "24px", letterSpacing: "0" },
      { cssVarBase: "--font-label-s", label: "Label-S", size: "12px", weight: "400", lineHeight: "20px", letterSpacing: "0" },
    ],
  },
  {
    title: "Navigation",
    tokens: [
      { cssVarBase: "--font-navigation-l", label: "Navigation-L", size: "18px", weight: "600", lineHeight: "28px", letterSpacing: "0" },
      { cssVarBase: "--font-navigation-s", label: "Navigation-S", size: "16px", weight: "600", lineHeight: "24px", letterSpacing: "0" },
    ],
  },
  {
    title: "Footer",
    tokens: [
      { cssVarBase: "--font-footer-wordmark", label: "Footer wordmark", size: "16px", weight: "500", lineHeight: "1.8", letterSpacing: "0" },
      { cssVarBase: "--font-footer-nav", label: "Footer nav", size: "12px", weight: "600", lineHeight: "1.8", letterSpacing: "1.68px" },
      { cssVarBase: "--font-footer-m", label: "Footer-M", size: "12px", weight: "400", lineHeight: "1.8", letterSpacing: "0" },
      { cssVarBase: "--font-footer-s", label: "Footer-S", size: "10px", weight: "400", lineHeight: "14px", letterSpacing: "0" },
    ],
  },
  {
    title: "Button / Chip",
    tokens: [
      { cssVarBase: "--font-button-1", label: "Button-1", size: "18px", weight: "700", lineHeight: "24px", letterSpacing: "0" },
      { cssVarBase: "--font-button-2", label: "Button-2", size: "16px", weight: "700", lineHeight: "20px", letterSpacing: "0" },
      { cssVarBase: "--font-button-3", label: "Button-3", size: "14px", weight: "700", lineHeight: "18px", letterSpacing: "0" },
      { cssVarBase: "--font-chip-1", label: "Chip-1", size: "14px", weight: "500", lineHeight: "18px", letterSpacing: "0" },
      { cssVarBase: "--font-chip-2", label: "Chip-2", size: "12px", weight: "500", lineHeight: "16px", letterSpacing: "0" },
    ],
  },
  {
    title: "Hero tagline / Search input",
    tokens: [
      { cssVarBase: "--font-hero-tagline", label: "Hero tagline", size: "20px", weight: "500", lineHeight: "1.2", letterSpacing: "-0.04em" },
      { cssVarBase: "--font-search-input", label: "Search input", size: "16px", weight: "500", lineHeight: "30px", letterSpacing: "0" },
    ],
  },
];
