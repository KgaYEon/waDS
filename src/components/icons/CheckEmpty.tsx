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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.75 7.05V16.95C3.75 18.105 3.75 18.6825 3.97481 19.1239C4.17255 19.5119 4.48806 19.8275 4.87613 20.0252C5.31647 20.25 5.89397 20.25 7.04691 20.25H16.9531C18.106 20.25 18.6825 20.25 19.1228 20.0252C19.5116 19.8272 19.8272 19.5116 20.0252 19.1239C20.25 18.6825 20.25 18.1071 20.25 16.9541V7.04691C20.25 5.89397 20.25 5.31647 20.0252 4.87613C19.8272 4.4879 19.5113 4.17237 19.1228 3.97481C18.6825 3.75 18.105 3.75 16.95 3.75H7.05C5.895 3.75 5.3175 3.75 4.87613 3.97481C4.48806 4.17255 4.17255 4.48806 3.97481 4.87613C3.75 5.3175 3.75 5.895 3.75 7.05Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
