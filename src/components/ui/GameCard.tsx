import type { ButtonHTMLAttributes } from "react";
import styles from "./GameCard.module.css";

export interface GameCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  title: string;
  category?: string;
}

export default function GameCard({
  imageUrl,
  title,
  category = "플래시 게임",
  className,
  ...rest
}: GameCardProps) {
  return (
    <button className={[styles.card, className].filter(Boolean).join(" ")} {...rest}>
      <div className={styles.thumb}>
        <img src={imageUrl} alt="" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{category}</span>
      </div>
    </button>
  );
}
