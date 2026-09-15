import type { SVGProps } from "react";

export interface IconKakaoProps extends SVGProps<SVGSVGElement> {
  /** ic/24/kakao or ic/32/kakao — Figma only has the 32px artwork; 24px
   * is the same viewBox scaled down like every other icon here. */
  size?: 24 | 32;
}

export default function IconKakao({ size = 24, ...props }: IconKakaoProps) {
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
        d="M16 4.00031C22.4128 4.00031 28 8.60225 28 14.7377C28 20.8732 22.4128 25.4752 16 25.4752C15.3696 25.4752 14.7512 25.4331 14.1448 25.3489L10.6648 27.7894C10.4673 27.9275 10.2355 28.0008 9.99844 28.0003C9.76142 27.9998 9.52984 27.9254 9.33294 27.7865C9.13604 27.6476 8.98262 27.4504 8.89205 27.2198C8.80147 26.9892 8.77779 26.7356 8.824 26.4908L9.3568 23.6839C6.1936 21.8005 4 18.5502 4 14.7377C4 8.60225 9.5872 4.00031 16 4.00031Z"
        fill="currentColor"
      />
    </svg>
  );
}
