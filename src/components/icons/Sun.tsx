import type { SVGProps } from "react";

export interface IconSunProps extends SVGProps<SVGSVGElement> {
  /** ic/24/sun or ic/32/sun — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

export default function IconSun({ size = 24, ...props }: IconSunProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Figma builds this glyph via a luminance-mask trick (white fill
          clipped by these same stroke shapes) purely to render a solid
          white icon — visually identical to just stroking the shapes
          directly, which is what this does instead. Glyph is drawn on
          its own 26.6667 grid, inset within the 32x32 box by translate
          (2.667, 2.667) — matches Figma's 12.5% inset + a further
          -5.56% (the rays' rounded caps extend past the circle). */}
      <g
        transform="translate(2.667, 2.667)"
        stroke="currentColor"
        strokeWidth={2.667}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.84762 4.84762L6.12076 6.12076M1.33333 13.3333H3.13333M4.84762 21.819L6.12076 20.5459M21.819 21.819L20.5459 20.5459M25.3333 13.3333H23.5333M21.819 4.84762L20.5459 6.12076M13.3333 1.33333V3.13333" />
        <path d="M13.3331 20.1905C17.1199 20.1905 20.1902 17.1202 20.1902 13.3333C20.1902 9.54648 17.1199 6.47619 13.3331 6.47619C9.5462 6.47619 6.47591 9.54648 6.47591 13.3333C6.47591 17.1202 9.5462 20.1905 13.3331 20.1905Z" />
        <path d="M13.3333 25.3333V23.5333" />
      </g>
    </svg>
  );
}
