import type { SVGProps } from "react";

export interface IconCloseProps extends SVGProps<SVGSVGElement> {
  /** ic/24/close or ic/32/close — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconClose({ size = 24, ...props }: IconCloseProps) {
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
        d="M9.155 6.87C8.53 6.245 7.515 6.245 6.89 6.87C6.265 7.495 6.265 8.51 6.89 9.135L13.76 16L6.895 22.87C6.27 23.495 6.27 24.51 6.895 25.135C7.52 25.76 8.535 25.76 9.16 25.135L16.025 18.265L22.895 25.13C23.52 25.755 24.535 25.755 25.16 25.13C25.785 24.505 25.785 23.49 25.16 22.865L18.29 16L25.155 9.13C25.78 8.505 25.78 7.49 25.155 6.865C24.53 6.24 23.515 6.24 22.89 6.865L16.025 13.735L9.155 6.87Z"
        fill="currentColor"
      />
    </svg>
  );
}
