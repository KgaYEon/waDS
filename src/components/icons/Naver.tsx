import type { SVGProps } from "react";

export interface IconNaverProps extends SVGProps<SVGSVGElement> {
  /** ic/24/naver or ic/32/naver — Figma only has the 32px artwork; 24px
   * is the same viewBox scaled down like every other icon here. */
  size?: 24 | 32;
}

export default function IconNaver({ size = 24, ...props }: IconNaverProps) {
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
        d="M19.9169 16.7746L11.7613 5H5V27H12.0822V15.2263L20.2387 27H27V5H19.9169V16.7746Z"
        fill="currentColor"
      />
    </svg>
  );
}
