import type { SVGProps } from "react";

export interface IconCheckEmptyProps extends SVGProps<SVGSVGElement> {
  /** ic/24/check-empty or ic/32/check-empty — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconCheckEmpty({ size = 24, ...props }: IconCheckEmptyProps) {
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
        d="M5 9.4V22.6C5 24.14 5 24.91 5.29975 25.4985C5.5634 26.0159 5.98408 26.4366 6.5015 26.7002C7.08862 27 7.85862 27 9.39588 27H22.6041C24.1414 27 24.91 27 25.4971 26.7002C26.0155 26.4362 26.4362 26.0155 26.7002 25.4985C27 24.91 27 24.1428 27 22.6055V9.39588C27 7.85862 27 7.08862 26.7002 6.5015C26.4362 5.98387 26.0151 5.56316 25.4971 5.29975C24.91 5 24.14 5 22.6 5H9.4C7.86 5 7.09 5 6.5015 5.29975C5.98408 5.5634 5.5634 5.98408 5.29975 6.5015C5 7.09 5 7.86 5 9.4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
