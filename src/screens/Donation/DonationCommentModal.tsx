import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import ctaStyles from "./DonationCtaModal.module.css";
import styles from "./DonationCommentModal.module.css";
import BigChip from "../../components/ui/BigChip";
import TextField from "../../components/ui/TextField";
import TextButtonSmall from "../../components/ui/TextButtonSmall";
import Button from "../../components/ui/Button";
import { IconClose, IconCheck } from "../../components/icons";
import { useDonationWall } from "../../hooks/useDonationWall";

export interface DonationCommentModalProps {
  onClose: () => void;
}

type Mode = "mouse" | "text";

const TEXT_MAX_LENGTH = 200;

/**
 * Figma frame "Frame 516" (node 501:3111), 1920 only — used as-is at
 * 1440 too, no media query (per request). Same header/body shell as
 * DonationCtaModal (imported directly from its module — literally the
 * same compiled classes, not a copy), only the content inside is new.
 *
 * Drawing mode records raw pointer coordinates as an SVG path "d" string
 * per stroke (not a canvas-to-image conversion) — stored in
 * useDonationWall exactly as drawn, then re-rendered as a small inline
 * <svg> on the wall.
 */
export default function DonationCommentModal({ onClose }: DonationCommentModalProps) {
  const { addComment } = useDonationWall();
  const [mode, setMode] = useState<Mode>("mouse");
  const [text, setText] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const isDrawingRef = useRef(false);

  const hasDrawing = paths.length > 0 || currentPath !== "";
  const canConfirm = mode === "text" ? text.trim().length > 0 : paths.length > 0;

  const getPoint = (event: ReactPointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    const { x, y } = getPoint(event);
    isDrawingRef.current = true;
    setCurrentPath(`M ${x} ${y}`);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getPoint(event);
    setCurrentPath((prev) => `${prev} L ${x} ${y}`);
  };

  const endStroke = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    setCurrentPath((prev) => {
      if (prev) setPaths((prevPaths) => [...prevPaths, prev]);
      return "";
    });
  };

  const handleClearDrawing = () => {
    setPaths([]);
    setCurrentPath("");
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    if (!window.confirm("한번 남기면 수정할 수 없습니다. 정말 완료하시겠습니까?")) return;
    if (mode === "text") {
      addComment({ type: "text", text: text.trim() });
    } else {
      addComment({ type: "drawing", paths });
    }
    onClose();
  };

  const handleSkip = () => {
    if (!window.confirm("정말 닫으시겠습니까? 닫으면 추가 코멘트를 남길 수 없습니다.")) return;
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={ctaStyles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-comment-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={ctaStyles.header}>
          <p id="donation-comment-modal-title" className={ctaStyles.headerTitle}>
            후원 완료
          </p>
          <button
            type="button"
            className={ctaStyles.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            <IconClose className={ctaStyles.closeIcon} />
          </button>
        </div>

        <div className={ctaStyles.body}>
          <div className={styles.contentGroup}>
            <div className={styles.thanksHead}>
              <div className={styles.checkBadge}>
                <IconCheck size={32} />
              </div>
              <div className={styles.thanksText}>
                <p className={styles.thanksTitle}>후원해주셔서 감사합니다</p>
                <p className={styles.thanksSubtitle}>
                  후원의 전당에 남기실 코멘트를 자유롭게 작성해주세요
                </p>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.chipRow}>
                <BigChip
                  size="M"
                  variant={mode === "mouse" ? "solid" : "outline"}
                  className={styles.modeChip}
                  onClick={() => setMode("mouse")}
                >
                  마우스 입력
                </BigChip>
                <BigChip
                  size="M"
                  variant={mode === "text" ? "solid" : "outline"}
                  className={styles.modeChip}
                  onClick={() => setMode("text")}
                >
                  텍스트 입력
                </BigChip>
              </div>

              {mode === "text" ? (
                <TextField
                  label="코멘트"
                  className={styles.textField}
                  multiline
                  maxLength={TEXT_MAX_LENGTH}
                  placeholder="텍스트를 입력해주세요"
                  value={text}
                  onChange={setText}
                />
              ) : (
                <div className={styles.drawingGroup}>
                  <div className={styles.canvasWrap}>
                    <svg
                      ref={svgRef}
                      className={styles.canvas}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={endStroke}
                      onPointerLeave={endStroke}
                    >
                      {paths.map((d, i) => (
                        <path
                          key={i}
                          d={d}
                          fill="none"
                          stroke="var(--color-primary-400)"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ))}
                      {currentPath && (
                        <path
                          d={currentPath}
                          fill="none"
                          stroke="var(--color-primary-400)"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                    {!hasDrawing && (
                      <p className={styles.canvasPlaceholder}>
                        마우스로
                        <br />
                        코멘트를 그려주세요
                      </p>
                    )}
                  </div>
                  {hasDrawing && (
                    <TextButtonSmall className={styles.clearButton} onClick={handleClearDrawing}>
                      지우기
                    </TextButtonSmall>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={ctaStyles.actions}>
            <Button color="border" size="S" className={ctaStyles.actionButton} onClick={handleSkip}>
              코멘트 안함
            </Button>
            <Button
              color="primary"
              size="S"
              className={ctaStyles.actionButton}
              disabled={!canConfirm}
              onClick={handleConfirm}
            >
              코멘트 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
