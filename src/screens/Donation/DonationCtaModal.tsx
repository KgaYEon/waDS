import styles from "./DonationCtaModal.module.css";
import Button from "../../components/ui/Button";
import { IconClose } from "../../components/icons";

export interface DonationCtaModalProps {
  onClose: () => void;
  onGoToComment: () => void;
}

/**
 * Figma frame "후원완료" (node 437:3678), 1920 only — used as-is at 1440
 * too, no media query (per request). Opens from the Donation screen's
 * "와플래시 후원하기" button, which had no real payment flow to send to;
 * this modal is that honest explanation instead.
 *
 * First modal in the app, so built local to this screen rather than
 * promoted to ui/ — same "second real consumer" rule this project has
 * followed for every other shared piece (BoardNav, PageGlow, etc.).
 *
 * "로직 확인하러 가기" opens the archived write-up in a new tab. It used to
 * point at the static public/docs/payment-logic.html file; that content
 * is now ported into a real in-app route (PaymentLogicDocScreen, see
 * App.tsx) instead, per request. "후원 완료창으로 이동" now opens the comment
 * overlay (DonationCommentModal) instead of just closing.
 */
export default function DonationCtaModal({ onClose, onGoToComment }: DonationCtaModalProps) {
  const openPaymentLogicDoc = () => {
    window.open("/docs/payment-logic", "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-cta-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <p id="donation-cta-modal-title" className={styles.headerTitle}>
            결제 로직 미구현 안내
          </p>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
            <IconClose className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.textGroup}>
            <p className={styles.heading}>결제 로직은 구현이 불가능합니다.</p>
            <p className={styles.description}>
              결제 로직 구현을 위해서는 사업자 등록이 필요하기 때문에
              <br />
              현재로선 구현이 불가능합니다. 대신하여
              <br />
              해당 로직의 구현 가능성과 방식에 대해 아카이빙 해두었습니다.
            </p>
          </div>
          <div className={styles.actions}>
            <Button
              color="border"
              size="S"
              className={styles.actionButton}
              onClick={onGoToComment}
            >
              후원 완료창으로 이동
            </Button>
            <Button
              color="primary"
              size="S"
              className={styles.actionButton}
              onClick={openPaymentLogicDoc}
            >
              로직 확인하러 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
