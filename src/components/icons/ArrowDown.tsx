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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.44072 6.45896C2.72297 6.16509 3.10574 6 3.50486 6C3.90398 6 4.28676 6.16509 4.56901 6.45896L12.0192 14.2176L19.4694 6.45896C19.7546 6.18243 20.1317 6.03189 20.5214 6.03904C20.9111 6.04618 21.2829 6.21044 21.5586 6.49726C21.8343 6.78409 21.9924 7.1711 21.9997 7.57688C22.007 7.98266 21.8629 8.37557 21.5977 8.67293L13.0845 17.541C12.8023 17.8349 12.4195 18 12.0204 18C11.6212 18 11.2385 17.8349 10.9562 17.541L2.44072 8.67538C2.15853 8.38144 2 7.98282 2 7.56717C2 7.15153 2.15853 6.7529 2.44072 6.45896Z"
        fill="currentColor"
      />
    </svg>
  );
}
