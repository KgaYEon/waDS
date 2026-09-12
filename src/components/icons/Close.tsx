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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.86625 5.1525C6.3975 4.68375 5.63625 4.68375 5.1675 5.1525C4.69875 5.62125 4.69875 6.3825 5.1675 6.85125L10.32 12L5.17125 17.1525C4.7025 17.6212 4.7025 18.3825 5.17125 18.8513C5.64 19.32 6.40125 19.32 6.87 18.8513L12.0188 13.6987L17.1712 18.8475C17.64 19.3162 18.4013 19.3162 18.87 18.8475C19.3388 18.3787 19.3388 17.6175 18.87 17.1488L13.7175 12L18.8663 6.8475C19.335 6.37875 19.335 5.6175 18.8663 5.14875C18.3975 4.68 17.6363 4.68 17.1675 5.14875L12.0188 10.3013L6.86625 5.1525Z"
        fill="currentColor"
      />
    </svg>
  );
}
