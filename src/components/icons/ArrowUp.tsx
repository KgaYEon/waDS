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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.44072 17.541C2.72297 17.8349 3.10574 18 3.50486 18C3.90398 18 4.28676 17.8349 4.56901 17.541L12.0192 9.78236L19.4694 17.541C19.7546 17.8176 20.1317 17.9681 20.5214 17.961C20.9111 17.9538 21.2829 17.7896 21.5586 17.5027C21.8343 17.2159 21.9924 16.8289 21.9997 16.4231C22.007 16.0173 21.8629 15.6244 21.5977 15.3271L13.0845 6.45896C12.8023 6.16509 12.4195 6 12.0204 6C11.6212 6 11.2385 6.16509 10.9562 6.45896L2.44072 15.3246C2.15853 15.6186 2 16.0172 2 16.4328C2 16.8485 2.15853 17.2471 2.44072 17.541Z"
        fill="currentColor"
      />
    </svg>
  );
}
