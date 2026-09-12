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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.7584 19.5143C12.7986 19.5143 14.6842 18.8033 16.168 17.6286L20.5471 22.0078L22 20.555L17.6208 16.1758C18.8401 14.6361 19.5045 12.7302 19.5064 10.7662C19.5064 5.93362 15.5806 2.00781 10.7481 2.00781C5.91551 2.00781 2 5.92332 2 10.7559C2 15.5884 5.92581 19.5143 10.7584 19.5143ZM10.7584 4.0583C14.4472 4.0583 17.456 7.06706 17.456 10.7559C17.456 14.4447 14.4472 17.4535 10.7584 17.4535C7.06955 17.4535 4.06079 14.4447 4.06079 10.7559C4.06079 7.06706 7.06955 4.0583 10.7584 4.0583Z"
        fill="currentColor"
      />
    </svg>
  );
}
