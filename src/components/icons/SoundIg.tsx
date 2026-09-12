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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.3111 3.65394C14.3111 3.53826 14.279 3.42465 14.2181 3.3247C14.1572 3.22474 14.0696 3.14203 13.9643 3.08499C13.859 3.02796 13.7398 2.99865 13.6188 3.00005C13.4978 3.00145 13.3794 3.03352 13.2756 3.09298L6.59886 6.92035H4.05184C2.91786 6.92035 2 7.79645 2 8.88177V14.1148C2 15.1988 2.91649 16.0762 4.05184 16.0762H6.59886L13.2742 19.9062C13.378 19.966 13.4966 19.9984 13.6178 19.9999C13.739 20.0015 13.8585 19.9723 13.964 19.9152C14.0695 19.8581 14.1572 19.7753 14.2182 19.6751C14.2792 19.575 14.3112 19.4611 14.3111 19.3453V3.65394ZM20.0672 11.4944L21.9986 13.3433L21.0315 14.2678L19.0987 12.4189L17.1645 14.2665L16.1974 13.342L18.1316 11.4944L16.1974 9.64672L17.1645 8.72224L19.0987 10.5699L21.0343 8.72224L22 9.64672L20.0672 11.4944Z"
        fill="currentColor"
      />
    </svg>
  );
}
