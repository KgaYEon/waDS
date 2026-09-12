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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM16.5 13.5H7.5V10.5H16.5V13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
