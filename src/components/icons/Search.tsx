import type { SVGProps } from "react";

export interface IconSearchProps extends SVGProps<SVGSVGElement> {
  /** ic/24/search or ic/32/search — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconSearch({ size = 24, ...props }: IconSearchProps) {
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
        d="M14.0499 25.4381C16.7022 25.4381 19.1535 24.5138 21.0824 22.9867L26.7753 28.6797L28.6641 26.791L22.9711 21.098C24.5562 19.0965 25.4199 16.6188 25.4224 14.0656C25.4224 7.78324 20.3189 2.67969 14.0366 2.67969C7.75422 2.67969 2.66406 7.76985 2.66406 14.0522C2.66406 20.3345 7.76762 25.4381 14.0499 25.4381ZM14.0499 5.34532C18.8454 5.34532 22.7568 9.25671 22.7568 14.0522C22.7568 18.8476 18.8454 22.759 14.0499 22.759C9.25448 22.759 5.34309 18.8476 5.34309 14.0522C5.34309 9.25671 9.25448 5.34532 14.0499 5.34532Z"
        fill="currentColor"
      />
    </svg>
  );
}
