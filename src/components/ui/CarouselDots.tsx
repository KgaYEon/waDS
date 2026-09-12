import styles from "./CarouselDots.module.css";

export type CarouselDotsTone = "light" | "muted";

export interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
  /** "light": full/50% opacity white, for use over a busy image (hero banner).
   *  "muted": neutral-300/neutral-600, for use on the plain page background. */
  tone?: CarouselDotsTone;
  /** Dot diameter in px — Figma uses 13px on the hero banner and 10px elsewhere. */
  size?: number;
  /** Gap between dots in px — 16px on the hero banner, 24px elsewhere. */
  gap?: number;
  className?: string;
}

export default function CarouselDots({
  count,
  activeIndex,
  onDotClick,
  tone = "muted",
  size = 10,
  gap = 24,
  className,
}: CarouselDotsProps) {
  return (
    <div
      className={[styles.dots, className].filter(Boolean).join(" ")}
      style={{ gap }}
      role="tablist"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`${i + 1}번째 슬라이드`}
          className={[styles.dot, styles[tone], i === activeIndex && styles.active]
            .filter(Boolean)
            .join(" ")}
          style={{ width: size, height: size }}
          onClick={() => onDotClick?.(i)}
        />
      ))}
    </div>
  );
}
