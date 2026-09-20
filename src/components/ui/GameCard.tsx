import type { ButtonHTMLAttributes } from "react";
import styles from "./GameCard.module.css";

export type GameCardVariant = "thumb" | "poster";

export interface GameCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  /** Defaults to "" (decorative) since the title is already shown as visible text over the image. */
  imageAlt?: string;
  title: string;
  category?: string;
  /** "thumb" (default): full-bleed 16:9-ish image with title/category overlaid
   *  on a gradient scrim — used everywhere (grids, filter, search results).
   *  "poster": portrait cover image with title/category below it, no scrim —
   *  Figma node 562:2314 ("recommand"), used only by Home's weekly-pick panel. */
  variant?: GameCardVariant;
}

export default function GameCard({
  imageUrl,
  imageAlt = "",
  title,
  category = "플래시 게임",
  variant = "thumb",
  className,
  ...rest
}: GameCardProps) {
  if (variant === "poster") {
    return (
      <button className={[styles.posterCard, className].filter(Boolean).join(" ")} {...rest}>
        <img className={styles.posterImage} src={imageUrl} alt={imageAlt} />
        <div className={styles.posterBody}>
          <span className={styles.posterCategory}>{category}</span>
          <span className={styles.posterTitle}>{title}</span>
        </div>
      </button>
    );
  }

  return (
    <button className={[styles.card, className].filter(Boolean).join(" ")} {...rest}>
      <img className={styles.image} src={imageUrl} alt={imageAlt} />
      <div className={styles.caption}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{category}</span>
      </div>
    </button>
  );
}
