import type { SVGProps } from "react";

export interface IconArrowUpProps extends SVGProps<SVGSVGElement> {
  /** ic/24/arrow-up or ic/32/arrow-up — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconArrowUp({ size = 24, ...props }: IconArrowUpProps) {
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
        d="M3.25429 23.0943C3.63062 23.4705 4.14099 23.6819 4.67315 23.6819C5.20531 23.6819 5.71567 23.4705 6.09201 23.0943L16.0256 13.1607L25.9592 23.0943C26.3395 23.4484 26.8423 23.6411 27.3619 23.6319C27.8814 23.6228 28.3771 23.4125 28.7448 23.0453C29.1124 22.678 29.3233 22.1825 29.333 21.663C29.3427 21.1435 29.1505 20.6404 28.7969 20.2597L17.446 8.9057C17.0697 8.52945 16.5593 8.31808 16.0272 8.31808C15.495 8.31808 14.9846 8.52945 14.6083 8.9057L3.25429 20.2566C2.87804 20.6329 2.66667 21.1433 2.66667 21.6754C2.66667 22.2076 2.87804 22.718 3.25429 23.0943Z"
        fill="currentColor"
      />
    </svg>
  );
}
