import { useState } from "react";
import styles from "./HeroBannerSection.module.css";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import CarouselDots from "../../../components/ui/CarouselDots";
import { IconArrowLeft, IconArrowRight } from "../../../components/icons";

export interface HeroSlide {
  id: string;
  imageUrl: string;
  imageAlt?: string;
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

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  if (!slide) return null;

  return (
    <section className={styles.section}>
      <img className={styles.image} src={slide.imageUrl} alt={slide.imageAlt ?? ""} />

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            aria-label="이전 배너"
            onClick={() => goTo(index - 1)}
          >
            <IconArrowLeft size={32} />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            aria-label="다음 배너"
            onClick={() => goTo(index + 1)}
          >
            <IconArrowRight size={32} />
          </button>
          <CarouselDots
            className={styles.dots}
            count={slides.length}
            activeIndex={index}
            onDotClick={goTo}
            tone="light"
            size={13}
            gap={16}
          />
        </>
      )}

      <div className={styles.overlay}>
        <Container>
          <div className={styles.content}>
            <p className={styles.tagline}>{slide.tagline}</p>
            <Button color="white" size="S" onClick={slide.onCtaClick}>
              {slide.ctaLabel}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
