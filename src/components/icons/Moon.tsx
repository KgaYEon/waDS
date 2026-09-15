import type { SVGProps } from "react";

export interface IconMoonProps extends SVGProps<SVGSVGElement> {
  /** ic/24/moon or ic/32/moon — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconMoon({ size = 24, ...props }: IconMoonProps) {
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
        d="M15.7906 16.2135C13.6833 14.1054 12.4994 11.2462 12.4994 8.2649C12.4986 7.15881 12.661 6.05865 12.9814 5C10.4012 5.78131 8.18779 7.46451 6.74496 9.74252C5.30213 12.0205 4.72603 14.7415 5.12176 17.4091C5.51749 20.0767 6.85868 22.513 8.90065 24.2737C10.9426 26.0343 13.5493 27.0019 16.2451 27C18.6557 27.0006 21.0026 26.2257 22.9393 24.7896C24.8759 23.3536 26.2996 21.3326 27 19.0251C25.9675 19.3386 24.8725 19.506 23.7363 19.506C20.7561 19.506 17.898 18.3216 15.7906 16.2135Z"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
