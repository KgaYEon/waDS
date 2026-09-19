/**
 * Mirrors tokens.css's spacing/radius layer, for the /debug/colors
 * "스페이싱" tab. Same rationale as the other *TokenData.ts files here:
 * plain literals, cross-checked visually against the live var()-sized
 * box next to each row.
 */

export interface ScaleToken {
  cssVar: string;
  label: string;
  px: number;
}

export const spacingTokens: ScaleToken[] = [
  { cssVar: "--spacing-xs", label: "xs", px: 8 },
  { cssVar: "--spacing-sm", label: "sm", px: 20 },
  { cssVar: "--spacing-md", label: "md", px: 24 },
  { cssVar: "--spacing-lg", label: "lg", px: 32 },
  { cssVar: "--spacing-xl", label: "xl", px: 64 },
];

export const radiusTokens: ScaleToken[] = [
  { cssVar: "--radius-none", label: "none", px: 0 },
  { cssVar: "--radius-sm", label: "sm", px: 4 },
  { cssVar: "--radius-md", label: "md", px: 12 },
  { cssVar: "--radius-lg", label: "lg", px: 16 },
  { cssVar: "--radius-big", label: "big", px: 24 },
  { cssVar: "--radius-full", label: "full", px: 99 },
];
