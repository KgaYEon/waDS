import { useEffect, useRef, useState } from "react";
import styles from "./HeroBannerSection.module.css";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import CarouselDots from "../../../components/ui/CarouselDots";

const AUTOPLAY_MS = 5000;

export interface HeroSlide {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  /** Optional logo mark shown above the tagline — not every slide needs one. */
  logoUrl?: string;
  logoAlt?: string;
  tagline: string;
  ctaLabel: string;
  onCtaClick?: () => void;
}

export interface HeroBannerSectionProps {
  slides: HeroSlide[];
}

export default function HeroBannerSection({ slides }: HeroBannerSectionProps) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const timerRef = useRef<number | null>(null);

  const clearAutoplay = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoplay = () => {
    clearAutoplay();
    if (slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  // Restarts whenever the slide count changes (e.g. slides load in after
  // mount) and is cleared on unmount.
  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // Manual navigation (dots only — arrow buttons removed on request) —
  // advances immediately and restarts the 5s autoplay timer from this
  // point, so it doesn't also jump right after a manual click.
  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
    startAutoplay();
  };

  if (!slide) return null;

  return (
    <section className={styles.section}>
      <div className={styles.imageStack}>
        {slides.map((s, i) => (
          <img
            key={s.id}
            className={styles.image}
            style={{ opacity: i === index ? 1 : 0 }}
            src={s.imageUrl}
            alt={i === index ? s.imageAlt ?? "" : ""}
            aria-hidden={i === index ? undefined : true}
          />
        ))}
      </div>

      {slides.length > 1 && (
        <CarouselDots
          className={styles.dots}
          count={slides.length}
          activeIndex={index}
          onDotClick={goTo}
          tone="light"
          size={13 / 1.5}
          gap={16}
        />
      )}

      <div className={styles.overlay}>
        <Container>
          {/* Same crossfade technique as .imageStack above — all slides'
              logo/text/button are stacked (via CSS Grid, same grid cell)
              and always rendered, opacity toggling between them. Only the
              active one gets pointer-events/tab focus, so a hidden CTA
              button can't be clicked or tabbed into. */}
          <div className={styles.contentStack}>
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={styles.content}
                style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
                aria-hidden={i === index ? undefined : true}
              >
                {s.logoUrl && (
                  <img
                    className={styles.logo}
                    src={s.logoUrl}
                    alt={i === index ? s.logoAlt ?? "" : ""}
                  />
                )}
                <div className={styles.textGroup}>
                  <p className={styles.tagline}>{s.tagline}</p>
                  <Button color="white" size="S" onClick={s.onCtaClick} tabIndex={i === index ? undefined : -1}>
                    {s.ctaLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
