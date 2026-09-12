import type { SVGProps } from "react";

export interface IconQuestionProps extends SVGProps<SVGSVGElement> {
  /** ic/24/question or ic/32/question — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconQuestion({ size = 24, ...props }: IconQuestionProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* The glyph itself is drawn on a 13.06 x 20 grid; Figma insets it by
          20.83% / 8.33% inside the 24x24 icon box, i.e. translate(5, 2). */}
      <g transform="translate(5, 2)">
        <path
          d="M4.48785 16.4187C4.48785 16.1426 4.7117 15.9187 4.98785 15.9187H8.06948C8.34562 15.9187 8.56948 16.1426 8.56948 16.4187V19.5C8.56948 19.7761 8.34562 20 8.06948 20H4.98785C4.7117 20 4.48785 19.7761 4.48785 19.5V16.4187Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.53061 3.26502C4.57959 3.26502 3.26531 5.03792 3.26531 6.53003H0C0 3.58825 2.44245 0 6.53061 0C10.6057 0 13.0612 3.49683 13.0612 6.53003C13.0612 9.10613 11.2522 10.4121 10.1322 11.2202L9.94286 11.3574C8.7102 12.2585 8.16327 12.7711 8.16327 13.8763H4.89796C4.89796 10.9998 6.79347 9.61547 8.01143 8.72576L8.01633 8.72249C9.37469 7.7283 9.79592 7.35119 9.79592 6.53003C9.79592 4.97915 8.49633 3.26502 6.53061 3.26502Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
