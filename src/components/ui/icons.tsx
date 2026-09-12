/**
 * Icons used by ui/ components that have no equivalent in the
 * src/components/icons/ library (checked against the Figma icon-library
 * frame directly — not guessed):
 *  - IconLogo: the brand mark, not part of that icon set at all.
 *  - IconProfile: Header's account-button glyph. Figma names it
 *    "ic/32/icon" too, but it's a different underlying asset (a person
 *    in a ring) from the library's same-named "icon" component (an
 *    info glyph) — a naming collision in the source file, confirmed by
 *    downloading both assets and comparing path data. Keeping this one
 *    local avoids silently swapping in the wrong icon.
 */
import type { SVGProps } from "react";

/** Profile / account glyph (a person inside a ring). */
export function IconProfile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.2641 9.5V12.1H16.9641V19.9H18.2641V22.5H13.0641V19.9H14.3641V12.1H13.0641V9.5H18.2641ZM15.6641 3C17.3712 3 19.0617 3.33625 20.6389 3.98957C22.2162 4.64288 23.6493 5.60045 24.8564 6.80761C26.0636 8.01477 27.0212 9.44788 27.6745 11.0251C28.3278 12.6023 28.6641 14.2928 28.6641 16C28.6641 19.4478 27.2944 22.7544 24.8564 25.1924C22.4185 27.6304 19.1119 29 15.6641 29C13.9569 29 12.2664 28.6637 10.6892 28.0104C9.11194 27.3571 7.67884 26.3995 6.47167 25.1924C4.0337 22.7544 2.66406 19.4478 2.66406 16C2.66406 12.5522 4.0337 9.24558 6.47167 6.80761C8.90965 4.36964 12.2162 3 15.6641 3ZM15.6641 5.6C12.9058 5.6 10.2605 6.69571 8.31015 8.64609C6.35977 10.5965 5.26406 13.2417 5.26406 16C5.26406 18.7583 6.35977 21.4035 8.31015 23.3539C10.2605 25.3043 12.9058 26.4 15.6641 26.4C18.4223 26.4 21.0676 25.3043 23.018 23.3539C24.9684 21.4035 26.0641 18.7583 26.0641 16C26.0641 13.2417 24.9684 10.5965 23.018 8.64609C21.0676 6.69571 18.4223 5.6 15.6641 5.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Two-tone brand mark. Colors are passed in (as token var() strings) so
 * the header's full-color mark and the footer's muted mark share one
 * component instead of duplicating the path data. */
export interface LogoMarkProps extends SVGProps<SVGSVGElement> {
  shapeColor?: string;
  dotColor?: string;
}

export function IconLogo({
  shapeColor = "var(--color-neutral-100)",
  dotColor = "var(--color-primary-400)",
  ...props
}: LogoMarkProps) {
  return (
    <svg viewBox="0 0 71.0712 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.02974 14.7632C-1.04986 11.018 -0.571146 5.43421 3.09898 2.29158C6.76911 -0.851064 12.2408 -0.36255 15.3204 3.3827L28.5379 19.4571C31.6175 23.2023 31.1388 28.7861 27.4687 31.9287C23.7985 35.0713 18.3268 34.5828 15.2472 30.8376L2.02974 14.7632Z"
        fill={shapeColor}
      />
      <path
        d="M42.0333 14.5429C45.1129 10.7977 44.6342 5.21393 40.964 2.07129C37.2939 -1.07135 31.8222 -0.582837 28.7426 3.16241L15.5251 19.2368C12.4455 22.982 12.9242 28.5658 16.5944 31.7084C20.2645 34.8511 25.7362 34.3625 28.8158 30.6173L42.0333 14.5429Z"
        fill={shapeColor}
      />
      <path
        d="M29.3475 14.5432C26.2679 10.7979 26.7466 5.2142 30.4167 2.07156C34.0869 -1.07108 39.5586 -0.582569 42.6382 3.16268L55.8557 19.2371C58.9353 22.9823 58.4566 28.5661 54.7864 31.7087C51.1163 34.8513 45.6446 34.3628 42.565 30.6176L29.3475 14.5432Z"
        fill={shapeColor}
      />
      <path
        d="M68.1369 7.21312C68.1369 11.1968 64.9722 14.4262 61.0684 14.4262C57.1646 14.4262 54 11.1968 54 7.21312C54 3.22942 57.1646 0 61.0684 0C64.9722 0 68.1369 3.22942 68.1369 7.21312Z"
        fill={dotColor}
      />
      <path
        d="M61.2261 9.99409C60.0828 10.151 59.3316 8.81029 60.044 7.88439L64.2781 2.38161C64.7439 1.77616 65.6182 1.70843 66.1683 2.23518L70.664 6.54015C71.4536 7.29631 71.029 8.64902 69.9558 8.79628L61.2261 9.99409Z"
        fill={dotColor}
      />
    </svg>
  );
}
