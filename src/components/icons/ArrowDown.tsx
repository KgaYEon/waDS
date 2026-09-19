import type { SVGProps } from "react";

export interface IconArrowDownProps extends SVGProps<SVGSVGElement> {
  /** ic/24/arrow-down or ic/32/arrow-down — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconArrowDown({ size = 24, ...props }: IconArrowDownProps) {
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
        d="M3.25429 8.9057C3.63062 8.52945 4.14099 8.31808 4.67315 8.31808C5.20531 8.31808 5.71567 8.52945 6.09201 8.9057L16.0256 18.8393L25.9592 8.9057C26.3395 8.55165 26.8423 8.35892 27.3619 8.36806C27.8814 8.37721 28.3771 8.58752 28.7448 8.95474C29.1124 9.32196 29.3233 9.81747 29.333 10.337C29.3427 10.8565 29.1505 11.3596 28.7969 11.7403L17.446 23.0943C17.0697 23.4705 16.5593 23.6819 16.0272 23.6819C15.495 23.6819 14.9846 23.4705 14.6083 23.0943L3.25429 11.7434C2.87804 11.3671 2.66667 10.8567 2.66667 10.3246C2.66667 9.7924 2.87804 9.28204 3.25429 8.9057Z"
        fill="currentColor"
      />
    </svg>
  );
}
