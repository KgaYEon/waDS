import type { SVGProps } from "react";

export interface IconArrowRightProps extends SVGProps<SVGSVGElement> {
  /** ic/24/arrow-right or ic/32/arrow-right — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconArrowRight({ size = 24, ...props }: IconArrowRightProps) {
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
        d="M10.5737 3.26043C10.2064 3.62736 10 4.12496 10 4.64382C10 5.16267 10.2064 5.66028 10.5737 6.02721L20.272 15.7125L10.5737 25.3977C10.228 25.7685 10.0399 26.2588 10.0488 26.7653C10.0577 27.2719 10.2631 27.7552 10.6216 28.1137C10.9801 28.4721 11.4639 28.6777 11.9711 28.6872C12.4783 28.6966 12.9695 28.5093 13.3412 28.1645L24.4263 17.0974C24.7936 16.7304 25 16.2328 25 15.714C25 15.1951 24.7936 14.6975 24.4263 14.3306L13.3442 3.26043C12.9768 2.89359 12.4785 2.6875 11.959 2.6875C11.4394 2.6875 10.9411 2.89359 10.5737 3.26043Z"
        fill="currentColor"
      />
    </svg>
  );
}
