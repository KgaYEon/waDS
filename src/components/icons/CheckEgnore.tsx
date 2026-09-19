import type { SVGProps } from "react";

export interface IconCheckEgnoreProps extends SVGProps<SVGSVGElement> {
  /** ic/24/check-egnore or ic/32/check-egnore — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

/** Indeterminate checkbox state (filled square with a dash). Named after
 * the Figma layer "check-egnore" as-is. */
export default function IconCheckEgnore({ size = 24, ...props }: IconCheckEgnoreProps) {
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
        d="M26 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4ZM22 18H10V14H22V18Z"
        fill="currentColor"
      />
    </svg>
  );
}
