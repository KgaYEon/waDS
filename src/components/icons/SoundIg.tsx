import type { SVGProps } from "react";

export interface IconSoundIgProps extends SVGProps<SVGSVGElement> {
  /** ic/24/sound ig or ic/32/sound ig — same artwork, only the rendered size differs. */
  size?: 24 | 32;
}

/** Named "SoundIg" after the Figma layer "ic/24/sound ig" as-is — visually
 * the muted/off counterpart to IconSound (speaker with an X). */
export default function IconSoundIg({ size = 24, ...props }: IconSoundIgProps) {
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
        d="M19.0814 4.55629C19.0814 4.39494 19.0387 4.23647 18.9575 4.09705C18.8762 3.95764 18.7595 3.84226 18.6191 3.76271C18.4787 3.68316 18.3198 3.64228 18.1584 3.64423C17.9971 3.64619 17.8392 3.69092 17.7007 3.77385L8.79849 9.11229H5.40246C3.89048 9.11229 2.66667 10.3343 2.66667 11.8481V19.1472C2.66667 20.6592 3.88865 21.883 5.40246 21.883H8.79849L17.6989 27.2251C17.8374 27.3085 17.9955 27.3536 18.1571 27.3558C18.3187 27.3579 18.478 27.3172 18.6187 27.2375C18.7593 27.1579 18.8763 27.0424 18.9576 26.9027C19.0389 26.763 19.0816 26.6042 19.0814 26.4426V4.55629ZM26.7562 15.4922L29.3315 18.0711L28.042 19.3606L25.4649 16.7816L22.886 19.3587L21.5965 18.0693L24.1755 15.4922L21.5965 12.915L22.886 11.6256L25.4649 14.2027L28.0457 11.6256L29.3333 12.915L26.7562 15.4922Z"
        fill="currentColor"
      />
    </svg>
  );
}
