import type { SVGProps } from "react";

export interface IconCheckProps extends SVGProps<SVGSVGElement> {
  /** ic/24/check or ic/32/check — same artwork, only the rendered size differs.
   * A bare checkmark stroke, distinct from IconCheckFill/CheckEmpty/CheckEgnore
   * (those are full checkbox-state glyphs with their own box/circle). */
  size?: 24 | 32;
}

export default function IconCheck({ size = 24, ...props }: IconCheckProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 16L12.0013 24L28 8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
