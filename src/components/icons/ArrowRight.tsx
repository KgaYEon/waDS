import type { SVGProps } from "react";

export interface IconArrowRightProps extends SVGProps<SVGSVGElement> {
  /** ic/24/arrow-right or ic/32/arrow-right — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconArrowRight({ size = 24, ...props }: IconArrowRightProps) {
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
        d="M7.92072 2.36259C7.65133 2.64484 7.5 3.02762 7.5 3.42674C7.5 3.82585 7.65133 4.20863 7.92072 4.49088L15.0328 11.9411L7.92072 19.3913C7.66723 19.6765 7.52924 20.0536 7.53578 20.4433C7.54233 20.8329 7.69291 21.2047 7.95583 21.4805C8.21875 21.7562 8.57351 21.9143 8.94548 21.9216C9.31744 21.9289 9.6776 21.7848 9.95019 21.5195L18.0793 13.0064C18.3487 12.7241 18.5 12.3414 18.5 11.9422C18.5 11.5431 18.3487 11.1603 18.0793 10.8781L9.95243 2.36259C9.68299 2.0804 9.31758 1.92188 8.93657 1.92188C8.55557 1.92188 8.19016 2.0804 7.92072 2.36259Z"
        fill="currentColor"
      />
    </svg>
  );
}
