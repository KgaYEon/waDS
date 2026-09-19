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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* The glyph itself is drawn on a ~16.98 x 26 grid; Figma insets it by
          25% (left) / 21.94% (right) / 9.38% (top) / 9.37% (bottom) inside
          the 32x32 icon box, i.e. translate(8, 3). Dot under the mark is a
          plain rectangle now (was a rounded rect in the previous version of
          this asset). */}
      <g transform="translate(8, 3)">
        <path d="M5.83477 20.6947H11.1409V26H5.83477V20.6947Z" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.4898 4.24427C5.95347 4.24427 4.2449 6.54891 4.2449 8.48854H0C0 4.66445 3.17518 0 8.4898 0C13.7874 0 16.9796 4.54561 16.9796 8.48854C16.9796 11.8373 14.6279 13.535 13.1719 14.5854L12.9257 14.7637C11.3233 15.9351 10.6122 16.6015 10.6122 18.0381H6.36735C6.36735 14.2989 8.83151 12.4994 10.4149 11.3428L10.4212 11.3386C12.1871 10.0462 12.7347 9.55597 12.7347 8.48854C12.7347 6.47251 11.0452 4.24427 8.4898 4.24427Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
