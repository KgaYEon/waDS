import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./GameDetailScreen.module.css";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import GridColumn from "../../components/ui/GridColumn";
import { IconReset, IconQuestion, IconSound, IconSoundIg } from "../../components/icons";
import { useGameDetailData } from "./useGameDetailData";

const PLACEHOLDER_TEXT = "정보가 준비되지 않았습니다";
// Pure UX flourish, not real asset loading — see chat notes. 2.5s sits in
// the requested 2-3s window.
const LOAD_DURATION_MS = 2500;
// How long the volume bar stays open with no interaction before it
// auto-hides — no Figma spec for this, an explicit request.
const SOUND_BAR_IDLE_MS = 3000;

/**
 * Figma frames "1920" (node 37:4958) and "1440" (node 307:3050). The
 * frames' own Header/Footer are intentionally NOT reproduced — this
 * screen renders inside Layout, same as every other screen.
 *
 * Figma draws the info box (게임 방법/제작 정보/게임 설명) always open, with no
 * toggle. Per request it's collapsible — the "?" round button (otherwise
 * decorative in Figma) is the only toggle; there's no separate trigger row
 * on the box itself. The collapse animation reuses the same grid-rows
 * pattern as QuestionHead/FilterCap. The reset round button restarts the
 * fake-loading bar. The 제작 정보 (제작자/출처/제작 연도) block hides itself
 * entirely when none of those three optional games.ts fields are set (see
 * hasProductionInfo below).
 */
export default function GameDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const game = useGameDetailData(id);

  const [progress, setProgress] = useState(0);
  const [loadKey, setLoadKey] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [soundBarOpen, setSoundBarOpen] = useState(false);
  const idleTimerRef = useRef<number | null>(null);

  const clearIdleTimer = () => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const scheduleAutoHide = () => {
    clearIdleTimer();
    idleTimerRef.current = window.setTimeout(() => {
      setSoundBarOpen(false);
    }, SOUND_BAR_IDLE_MS);
  };

  useEffect(() => clearIdleTimer, []);

  // First click opens the volume bar (doesn't mute). A second click while
  // it's open mutes and closes it. Clicking again while muted unmutes and
  // reopens the bar, restarting the same cycle.
  const handleSoundIconClick = () => {
    if (muted) {
      setMuted(false);
      setSoundBarOpen(true);
      scheduleAutoHide();
      return;
    }
    if (soundBarOpen) {
      setMuted(true);
      setSoundBarOpen(false);
      clearIdleTimer();
    } else {
      setSoundBarOpen(true);
      scheduleAutoHide();
    }
  };

  const handleVolumeChange = (next: number) => {
    setVolume(next);
    // Any actual interaction with the slider counts as "not idle" —
    // restart the 3s auto-hide window from here.
    scheduleAutoHide();
  };

  useEffect(() => {
    setProgress(0);
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / LOAD_DURATION_MS) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [id, loadKey]);

  if (!game) {
    return (
      <Container>
        <Grid>
          <GridColumn span={12} className={styles.notFound}>
            게임을 찾을 수 없습니다.
          </GridColumn>
        </Grid>
      </Container>
    );
  }

  const isLoaded = progress >= 100;
  const howToPlayText = game.howToPlay ?? PLACEHOLDER_TEXT;
  const descriptionText = game.description ?? PLACEHOLDER_TEXT;
  const productionRows = [
    { label: "제작자", value: game.author },
    { label: "출처", value: game.source },
    { label: "제작 연도", value: game.releaseYear },
  ];
  const hasProductionInfo = productionRows.some((row) => row.value);

  return (
    <Container>
      <Grid>
        <GridColumn span={12} className={styles.content}>
          <div className={styles.gameFrame}>
            <div className={styles.loadingBlock}>
              <div className={styles.headBlock}>
                <span className={styles.flashLabel}>Flash Game</span>
                <p className={styles.gameName}>{game.title}</p>
              </div>
              <span className={styles.nowLoading}>Now Loading</span>
              {isLoaded ? (
                <p className={styles.readyText}>게임 준비중</p>
              ) : (
                <div className={styles.progressBlock}>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                  </div>
                  <div className={styles.progressRow}>
                    <span className={styles.progressLabel}>리소스 불러오는 중...</span>
                    <span className={styles.progressPercent}>{progress}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTop}>
              <div className={styles.titleGroup}>
                <h1 className={styles.title}>{game.title}</h1>
                <div className={styles.soundControl}>
                  <button
                    type="button"
                    className={styles.soundToggle}
                    aria-label={muted ? "음소거 해제" : soundBarOpen ? "음소거" : "음량 조절 열기"}
                    aria-pressed={muted}
                    onClick={handleSoundIconClick}
                  >
                    {muted ? (
                      <IconSoundIg size={32} className={styles.soundIcon} />
                    ) : (
                      <IconSound size={32} className={styles.soundIcon} />
                    )}
                  </button>
                  {soundBarOpen && (
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className={styles.volumeSlider}
                      style={{
                        background: `linear-gradient(to right, var(--color-primary-400) ${volume}%, var(--color-neutral-800) ${volume}%)`,
                      }}
                      aria-label="음량 조절"
                    />
                  )}
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.roundButton}
                  aria-label="다시 로딩"
                  onClick={() => setLoadKey((k) => k + 1)}
                >
                  <IconReset width={16} height={16} />
                </button>
                <button
                  type="button"
                  className={`${styles.roundButton} ${styles.roundButtonPrimary}`}
                  aria-label="게임 정보 보기"
                  aria-expanded={infoOpen}
                  onClick={() => setInfoOpen((v) => !v)}
                >
                  <IconQuestion width={16} height={16} />
                </button>
              </div>
            </div>

            <div className={styles.infoAccordion} data-open={infoOpen}>
              <div className={styles.infoWrap}>
                <div className={styles.infoInner}>
                  <div className={styles.infoBox}>
                    <div className={styles.infoSection}>
                      <p className={styles.infoHeading}>게임 방법</p>
                      <p className={styles.infoText}>{howToPlayText}</p>
                    </div>
                    <hr className={styles.infoDivider} />
                    <div className={styles.bottomRow}>
                      {hasProductionInfo && (
                        <div className={styles.productionInfo}>
                          <p className={styles.infoHeading}>제작 정보</p>
                          <div className={styles.productionRows}>
                            {productionRows.map((row) => (
                              <div key={row.label} className={styles.productionRow}>
                                <span className={styles.productionLabel}>{row.label}</span>
                                <span className={styles.productionValue}>
                                  {row.value ?? PLACEHOLDER_TEXT}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className={styles.gameExplain}>
                        <p className={styles.infoHeading}>게임 설명</p>
                        <p className={styles.infoText}>{descriptionText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GridColumn>
      </Grid>
    </Container>
  );
}
