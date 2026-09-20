import { useMemo, useState } from "react";
import styles from "./DonationScreen.module.css";
import BoardPageLayout from "../../components/ui/BoardPageLayout";
import Button from "../../components/ui/Button";
import { IconLogo } from "../../components/ui/icons";
import { IconArrowLeft, IconArrowRight } from "../../components/icons";
import DonationCtaModal from "./DonationCtaModal";
import DonationCommentModal from "./DonationCommentModal";
import { useDonationWall, pickPosition } from "../../hooks/useDonationWall";
import type { WallComment } from "../../hooks/useDonationWall";

// Fixed mock value — no real donation/progress data source yet, see chat notes.
const DONATION_PERCENT = 44;

// "10월" is the live/current month (real, localStorage-backed wall).
// Only June-October are browsable at all for now, per request — no
// months before June are implemented yet.
const CURRENT_MONTH = 10;
const MIN_MONTH = 6;

// Archived (non-current) months have no real historical data, so they're
// filled with random sample comments instead — regenerated (not
// persisted) each time that month is viewed.
const MOCK_COMMENT_POOL = [
  "항상 잘 보고 있어요!",
  "추억 보존해주셔서 감사합니다",
  "어릴 때 생각나서 눈물나요 ㅠㅠ",
  "화이팅입니다 응원할게요",
  "이 사이트 덕분에 옛날 생각나요",
  "고생 많으세요 항상 감사해요",
  "좋은 프로젝트 응원합니다!",
  "덕분에 추억여행 잘 했어요",
  "오래오래 운영해주세요",
  "커피 한 잔 보탭니다",
  "매일 들어와서 놀아요 ㅎㅎ",
  "이런 아카이브 정말 소중해요",
];

function generateMockComments(month: number): WallComment[] {
  // month as a seed for the count only — just needs to vary a bit between
  // months, not be reproducible.
  const count = 6 + (month % MIN_MONTH) + Math.floor(Math.random() * 4);
  const result: WallComment[] = [];
  for (let i = 0; i < count; i++) {
    const { x, y } = pickPosition(result, "text");
    result.push({
      id: `mock-${month}-${i}`,
      type: "text",
      text: MOCK_COMMENT_POOL[Math.floor(Math.random() * MOCK_COMMENT_POOL.length)],
      x,
      y,
      rotate: Math.random() * 10 - 5,
    });
  }
  return result;
}

/**
 * Figma frame "1920/donation" (node 571:3087). Renders inside Layout.
 * Uses the shared BoardPageLayout shell — see that component for the
 * frame it was measured against.
 *
 * One addition with no Figma source, per explicit request carried over
 * from the previous version: the "44%" label above the progress bar —
 * the frame only draws the bar itself, no percent text anywhere near it.
 *
 * The month-nav arrows switch between June-October (see
 * CURRENT_MONTH/MIN_MONTH above); the right arrow starts disabled since
 * October is the current month (nothing newer to show). The "후원
 * 해주시는 분들께" link still has no real destination/behavior (no
 * supporter-list page was requested), so it stays an inert element
 * rather than a fake link that does nothing.
 *
 * Modal flow: donate button -> DonationCtaModal ("결제 로직 미구현") ->
 * its "후원 완료창으로 이동" button -> DonationCommentModal (comment wall
 * input). Only one modal is ever open at a time, tracked as a single
 * step instead of two separate booleans.
 */
type ModalStep = "none" | "cta" | "comment";

export default function DonationScreen() {
  const [modalStep, setModalStep] = useState<ModalStep>("none");
  const [month, setMonth] = useState(CURRENT_MONTH);
  const { comments: liveComments } = useDonationWall();

  const isCurrentMonth = month === CURRENT_MONTH;
  const canGoPrevMonth = month > MIN_MONTH;
  const canGoNextMonth = month < CURRENT_MONTH;

  // Regenerated (not persisted) whenever a different archived month is
  // selected — real data only exists for the current month.
  const archivedComments = useMemo(
    () => (isCurrentMonth ? [] : generateMockComments(month)),
    [month, isCurrentMonth]
  );
  const displayedComments = isCurrentMonth ? liveComments : archivedComments;

  return (
    <>
      <BoardPageLayout title="후원하기" description="와플래시를 후원해주세요" active="donation" contentGap={62}>
        <div className={styles.hero}>
          <IconLogo className={styles.logo} />
          <div className={styles.heroBody}>
            <h2 className={styles.heroTitle}>와플래시를 응원해주세요</h2>
            <p className={styles.description}>
              요즘 정말 많은 분들이 와플래시를 찾아주고 계십니다. 감사한 마음만큼이나 운영
              비용도 조금씩 늘고 있습니다. 커피 한 잔 정도의 후원이 모이면 추억을 오래오래
              지켜나가는 데 큰 힘이 됩니다!
            </p>
            <div className={styles.ctaGroup}>
              <Button color="primary" size="M" className={styles.donateButton} onClick={() => setModalStep("cta")}>
                와플래시 후원하기
              </Button>
              <span className={styles.supporterLink}>후원에 대해서</span>
            </div>
          </div>
        </div>

        <div className={styles.wallSection}>
          <div className={styles.monthNav}>
            <button
              type="button"
              className={styles.monthArrowButton}
              onClick={() => canGoPrevMonth && setMonth((m) => m - 1)}
              disabled={!canGoPrevMonth}
              aria-label="이전 달"
            >
              <IconArrowLeft
                className={`${styles.monthArrow} ${!canGoPrevMonth ? styles.monthArrowDisabled : ""}`}
              />
            </button>
            <span className={styles.monthLabel}>{month}월의 후원 현황</span>
            <button
              type="button"
              className={styles.monthArrowButton}
              onClick={() => canGoNextMonth && setMonth((m) => m + 1)}
              disabled={!canGoNextMonth}
              aria-label="다음 달"
            >
              <IconArrowRight
                className={`${styles.monthArrow} ${!canGoNextMonth ? styles.monthArrowDisabled : ""}`}
              />
            </button>
          </div>
          <p className={styles.wallCaption}>후원해주신 분들의 방명록이에요! 후원 1회당 1개씩 남기실 수 있어요.</p>

          <div className={styles.progressLabelRow}>
            <span className={styles.progressLabel}>후원 목표까지</span>
            <span className={styles.progressPercent}>{DONATION_PERCENT}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${DONATION_PERCENT}%` }} />
          </div>

          <div className={styles.board}>
            {displayedComments.map((comment) => (
              <div
                key={comment.id}
                className={styles.wallItem}
                style={{
                  left: `${comment.x}%`,
                  top: `${comment.y}%`,
                  transform: `rotate(${comment.rotate}deg)`,
                }}
              >
                {comment.type === "text" ? (
                  <p className={styles.wallText}>{comment.text}</p>
                ) : (
                  // 477x113 matches DonationCommentModal's own canvas
                  // pixel size (559px modal - 41px padding each side,
                  // x 113px fixed height) — the coordinate space the
                  // path data was actually recorded in, so the viewBox
                  // has to match it for the drawing to scale correctly
                  // here at a different (smaller) display size.
                  <svg className={styles.wallDrawing} viewBox="0 0 477 113">
                    {comment.paths?.map((d, i) => (
                      <path
                        key={i}
                        d={d}
                        fill="none"
                        stroke="var(--fg-primary-default)"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </BoardPageLayout>

      {modalStep === "cta" && (
        <DonationCtaModal onClose={() => setModalStep("none")} onGoToComment={() => setModalStep("comment")} />
      )}
      {modalStep === "comment" && <DonationCommentModal onClose={() => setModalStep("none")} />}
    </>
  );
}
