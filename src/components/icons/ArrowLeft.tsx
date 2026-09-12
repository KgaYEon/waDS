import type { SVGProps } from "react";

export interface IconArrowLeftProps extends SVGProps<SVGSVGElement> {
  /** ic/24/arrow-left or ic/32/arrow-left — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconArrowLeft({ size = 24, ...props }: IconArrowLeftProps) {
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
        d="M16.5567 2.36259C16.8505 2.64484 17.0156 3.02762 17.0156 3.42674C17.0156 3.82585 16.8505 4.20863 16.5567 4.49088L8.79799 11.9411L16.5567 19.3913C16.8332 19.6765 16.9837 20.0536 16.9766 20.4433C16.9694 20.8329 16.8052 21.2047 16.5184 21.4805C16.2315 21.7562 15.8445 21.9143 15.4387 21.9216C15.033 21.9289 14.6401 21.7848 14.3427 21.5195L5.47459 13.0064C5.18072 12.7241 5.01562 12.3414 5.01562 11.9422C5.01562 11.5431 5.18072 11.1603 5.47459 10.8781L14.3402 2.36259C14.6342 2.0804 15.0328 1.92188 15.4485 1.92188C15.8641 1.92188 16.2627 2.0804 16.5567 2.36259Z"
        fill="currentColor"
      />
    </svg>
  );
}
