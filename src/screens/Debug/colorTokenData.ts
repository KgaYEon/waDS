/**
 * Plain data mirroring tokens.css's color layer, for the /debug/colors
 * demo page only. Kept as literals (not read from the CSS) since the
 * page's whole point is to show the intended name -> value mapping
 * next to a live swatch (which does use the real var()) — if tokens.css
 * and this file drift, that's a visible red flag on the page itself.
 */

export interface PrimitiveSwatch {
  step: string;
  cssVar: string;
  hex: string;
}

export const neutralPrimitives: PrimitiveSwatch[] = [
  { step: "0", cssVar: "--primitive-neutral-0", hex: "#FBFAF8" },
  { step: "100", cssVar: "--primitive-neutral-100", hex: "#F2F0EC" },
  { step: "200", cssVar: "--primitive-neutral-200", hex: "#E4E1DA" },
  { step: "300", cssVar: "--primitive-neutral-300", hex: "#B8B5AE" },
  { step: "400", cssVar: "--primitive-neutral-400", hex: "#8C8A85" },
  { step: "500", cssVar: "--primitive-neutral-500", hex: "#6B6B6E" },
  { step: "600", cssVar: "--primitive-neutral-600", hex: "#4A4A4D" },
  { step: "700", cssVar: "--primitive-neutral-700", hex: "#2A2A2E" },
  { step: "800", cssVar: "--primitive-neutral-800", hex: "#1F1F22" },
  { step: "900", cssVar: "--primitive-neutral-900", hex: "#161618" },
  { step: "1000", cssVar: "--primitive-neutral-1000", hex: "#0D0D0F" },
];

export const primaryPrimitives: PrimitiveSwatch[] = [
  { step: "100", cssVar: "--primitive-primary-100", hex: "#F6CBD1" },
  { step: "200", cssVar: "--primitive-primary-200", hex: "#ED9BA8" },
  { step: "300", cssVar: "--primitive-primary-300", hex: "#E56C7E" },
  { step: "400", cssVar: "--primitive-primary-400", hex: "#DD3C54" },
  { step: "500", cssVar: "--primitive-primary-500", hex: "#C41E3A" },
  { step: "600", cssVar: "--primitive-primary-600", hex: "#8C1D2B" },
  { step: "700", cssVar: "--primitive-primary-700", hex: "#5F111D" },
  { step: "800", cssVar: "--primitive-primary-800", hex: "#30080E" },
];

export interface SemanticSwatch {
  cssVar: string;
  refVar: string;
  hex: string;
}

export const semanticBg: SemanticSwatch[] = [
  { cssVar: "--bg-neutral-strong", refVar: "--primitive-neutral-0", hex: "#FBFAF8" },
  { cssVar: "--bg-neutral-default", refVar: "--primitive-neutral-100", hex: "#F2F0EC" },
  { cssVar: "--bg-neutral-muted", refVar: "--primitive-neutral-500", hex: "#6B6B6E" },
  { cssVar: "--bg-neutral-soft", refVar: "--primitive-neutral-300", hex: "#B8B5AE" },
  { cssVar: "--bg-neutral-subtle", refVar: "--primitive-neutral-200", hex: "#E4E1DA" },
  { cssVar: "--bg-neutral-inverted", refVar: "--primitive-neutral-900", hex: "#161618" },
  { cssVar: "--bg-primary-default", refVar: "--primitive-primary-400", hex: "#DD3C54" },
  { cssVar: "--bg-primary-muted", refVar: "--primitive-primary-300", hex: "#E56C7E" },
  { cssVar: "--bg-primary-subtle", refVar: "--primitive-primary-100", hex: "#F6CBD1" },
];

export const semanticFg: SemanticSwatch[] = [
  { cssVar: "--fg-primary-deep", refVar: "--primitive-primary-600", hex: "#8C1D2B" },
  { cssVar: "--fg-primary-default", refVar: "--primitive-primary-400", hex: "#DD3C54" },
  { cssVar: "--fg-primary-hover", refVar: "--primitive-primary-300", hex: "#E56C7E" },
  { cssVar: "--fg-primary-subtle", refVar: "--primitive-primary-100", hex: "#F6CBD1" },
  { cssVar: "--fg-neutral-default", refVar: "--primitive-neutral-900", hex: "#161618" },
  { cssVar: "--fg-neutral-muted", refVar: "--primitive-neutral-700", hex: "#2A2A2E" },
  { cssVar: "--fg-neutral-soft", refVar: "--primitive-neutral-400", hex: "#8C8A85" },
  { cssVar: "--fg-neutral-subtle", refVar: "--primitive-neutral-300", hex: "#B8B5AE" },
  { cssVar: "--fg-neutral-inverted", refVar: "--primitive-neutral-100", hex: "#F2F0EC" },
];

export const semanticStroke: SemanticSwatch[] = [
  { cssVar: "--stroke-neutral-default", refVar: "--primitive-neutral-900", hex: "#161618" },
  { cssVar: "--stroke-neutral-muted", refVar: "--primitive-neutral-500", hex: "#6B6B6E" },
  { cssVar: "--stroke-neutral-soft", refVar: "--primitive-neutral-400", hex: "#8C8A85" },
  { cssVar: "--stroke-neutral-subtle", refVar: "--primitive-neutral-300", hex: "#B8B5AE" },
  { cssVar: "--stroke-neutral-inverted", refVar: "--primitive-neutral-100", hex: "#F2F0EC" },
  { cssVar: "--stroke-primary-default", refVar: "--primitive-primary-400", hex: "#DD3C54" },
  { cssVar: "--stroke-primary-muted", refVar: "--primitive-primary-300", hex: "#E56C7E" },
  { cssVar: "--stroke-primary-subtle", refVar: "--primitive-primary-100", hex: "#F6CBD1" },
];
