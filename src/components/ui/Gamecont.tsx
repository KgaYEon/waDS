import { useState } from "react";
import styles from "./Gamecont.module.css";
import Container from "./Container";
import Grid from "./Grid";
import GridColumn from "./GridColumn";
import RoundButton from "./RoundButton";
import { IconSound, IconSoundIg, IconReset } from "../icons";

export interface HowToItem {
  label: string;
  value: string;
}

export interface Credits {
  author: string;
  source: string;
  year: string;
}

export interface GamecontProps {
  title: string;
  muted?: boolean;
  onToggleMute?: () => void;
  onReset?: () => void;
  howTo?: HowToItem[];
  credits?: Credits;
  description?: string;
  defaultOpen?: boolean;
  className?: string;
}

export default function Gamecont({
  title,
  muted = false,
  onToggleMute,
  onReset,
  howTo = [],
  credits,
  description,
  defaultOpen = false,
  className,
}: GamecontProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Container className={className}>
      <Grid>
        <GridColumn span={12} className={styles.wrap}>
          <div className={styles.topRow}>
            <div className={styles.titleGroup}>
              <span className={styles.title}>{title}</span>
              <button
                type="button"
                className={styles.muteButton}
                aria-label={muted ? "음소거 해제" : "음소거"}
                onClick={onToggleMute}
              >
                {muted ? (
                  <IconSoundIg size={32} className={styles.muteIcon} />
                ) : (
                  <IconSound size={32} className={styles.muteIcon} />
                )}
              </button>
            </div>
            <div className={styles.actions}>
              <RoundButton
                variant="dark"
                icon={<IconReset size={24} className={styles.icon} />}
                aria-label="재시작"
                onClick={onReset}
              />
              <RoundButton
                variant="dark"
                active={open}
                aria-label="게임 정보"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              />
            </div>
          </div>

          {open && (howTo.length > 0 || credits || description) && (
            <div className={styles.panel}>
              <div className={styles.panelInner}>
                {howTo.length > 0 && (
                  <div className={styles.howTo}>
                    <span className={styles.howToLabel}>게임 방법</span>
                    <div className={styles.howToList}>
                      {howTo.map((item) => (
                        <div className={styles.howToItem} key={item.label}>
                          <span className={styles.howToKey}>{item.label}</span>
                          <span className={styles.howToValue}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(credits || description) && (
                  <>
                    <hr className={styles.divider} />
                    <div className={styles.bottom}>
                      {credits && (
                        <div className={styles.credits}>
                          <span className={styles.creditsHead}>제작 정보</span>
                          <div className={styles.creditsList}>
                            <div className={styles.creditsRow}>
                              <span className={styles.creditsKey}>제작자</span>
                              <span className={styles.creditsValue}>{credits.author}</span>
                            </div>
                            <div className={styles.creditsRow}>
                              <span className={styles.creditsKey}>출처</span>
                              <span className={styles.creditsValue}>{credits.source}</span>
                            </div>
                            <div className={styles.creditsRow}>
                              <span className={styles.creditsKey}>제작 연도</span>
                              <span className={styles.creditsValue}>{credits.year}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {description && (
                        <div className={styles.description}>
                          <span className={styles.descriptionHead}>게임 설명</span>
                          <p className={styles.descriptionBody}>{description}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </GridColumn>
      </Grid>
    </Container>
  );
}
