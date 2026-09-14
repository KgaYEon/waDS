import type { SVGProps } from "react";

export interface IconChevronLeftThinProps extends SVGProps<SVGSVGElement> {
  /** ic/24/dashicons-arrow-left-alt2 or ic/32/... — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

/**
 * Pagination's thin chevron ("dashicons:arrow-left-alt2" in Figma) — a
 * distinct glyph from IconArrowLeft's bold filled arrowhead, confirmed
 * by comparing the exported path data. The "next" pagination button
 * reuses this same icon, mirrored with `transform: rotate(180deg)`
 * (Figma does the same: rotate + scaleY, equivalent for this
 * vertically-symmetric shape).
 */
export default function IconChevronLeftThin({ size = 24, ...props }: IconChevronLeftThinProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.8 6L10.8 12L16.8 18L15.6 20.4L7.2 12L15.6 3.6L16.8 6Z"
        fill="currentColor"
      />
    </svg>
  );
}
