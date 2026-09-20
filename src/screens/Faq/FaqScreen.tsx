import { useNavigate } from "react-router-dom";
import styles from "./FaqScreen.module.css";
import BoardPageLayout from "../../components/ui/BoardPageLayout";
import QuestionHead from "../../components/ui/QuestionHead";
import Button from "../../components/ui/Button";
import { useFaqData } from "./useFaqData";

/**
 * Figma frame "1920/FAQ" (node 571:2967). Renders inside Layout. Uses
 * the shared BoardPageLayout shell — see that component for the frame
 * it was measured against.
 *
 * Accordion rows reuse QuestionHead's plain variant as-is — it already
 * manages its own open/closed state and chevron direction. All items
 * start closed (`defaultOpen` left unset); the frame's own first item
 * is drawn open purely to show that state, not as a default.
 */
export default function FaqScreen() {
  const faqs = useFaqData();
  const navigate = useNavigate();

  return (
    <BoardPageLayout title="FAQ" description="자주 묻는 질문을 확인해보세요" active="faq" contentGap={48}>
      <hr className={styles.topDivider} />
      <div className={styles.rows}>
        {faqs.map((item) => (
          <QuestionHead key={item.id} question={item.question} answer={item.answer} className={styles.row} />
        ))}
      </div>

      <div className={styles.cta}>
        <Button
          color="primary"
          size="M"
          onClick={() => navigate("/suggestions?type=" + encodeURIComponent("질문"))}
        >
          1대1 질문하기
        </Button>
      </div>
    </BoardPageLayout>
  );
}
