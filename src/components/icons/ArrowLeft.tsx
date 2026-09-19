import type { SVGProps } from "react";

export interface IconArrowLeftProps extends SVGProps<SVGSVGElement> {
  /** ic/24/arrow-left or ic/32/arrow-left — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconArrowLeft({ size = 24, ...props }: IconArrowLeftProps) {
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
        d="M21.1138 3.26043C21.4811 3.62736 21.6875 4.12496 21.6875 4.64382C21.6875 5.16267 21.4811 5.66028 21.1138 6.02721L11.4155 15.7125L21.1138 25.3977C21.4595 25.7685 21.6476 26.2588 21.6387 26.7653C21.6298 27.2719 21.4244 27.7552 21.0659 28.1137C20.7074 28.4721 20.2236 28.6777 19.7164 28.6872C19.2092 28.6966 18.718 28.5093 18.3463 28.1645L7.26121 17.0974C6.89386 16.7304 6.6875 16.2328 6.6875 15.714C6.6875 15.1951 6.89386 14.6975 7.26121 14.3306L18.3433 3.26043C18.7107 2.89359 19.209 2.6875 19.7285 2.6875C20.2481 2.6875 20.7464 2.89359 21.1138 3.26043Z"
        fill="currentColor"
      />
    </svg>
  );
}
