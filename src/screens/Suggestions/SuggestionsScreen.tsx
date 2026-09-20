import { useState, type FormEvent, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SuggestionsScreen.module.css";
import BoardPageLayout from "../../components/ui/BoardPageLayout";
import BigChip from "../../components/ui/BigChip";
import TextField from "../../components/ui/TextField";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";

const SUGGESTION_TYPES = ["서비스 개선", "게임 추가 요청", "버그 신고", "질문", "기타"];

// Submit button label follows the selected chip's tone (e.g. "질문" -> "질문하기").
const SUBMIT_LABELS: Record<string, string> = {
  "서비스 개선": "제안하기",
  "게임 추가 요청": "요청하기",
  "버그 신고": "신고하기",
  질문: "질문하기",
  기타: "보내기",
};

// Title/content placeholders follow the selected chip's tone too.
const TITLE_PLACEHOLDERS: Record<string, string> = {
  "서비스 개선": "개선하고 싶은 점을 입력해주세요",
  "게임 추가 요청": "추가를 원하는 게임 이름을 입력해주세요",
  "버그 신고": "발생한 버그를 간단히 입력해주세요",
  질문: "궁금한 점을 입력해주세요",
  기타: "건의 제목을 입력해주세요",
};

const CONTENT_PLACEHOLDERS: Record<string, string> = {
  "서비스 개선": "개선됐으면 하는 점을 자유롭게 작성해주세요",
  "게임 추가 요청": "추가하고 싶은 게임 정보를 자유롭게 작성해주세요",
  "버그 신고": "어떤 상황에서 어떤 문제가 발생했는지 자세히 작성해주세요",
  질문: "궁금한 내용을 자유롭게 작성해주세요",
  기타: "개선됐으면 하는 점이나 불편한 점을 자유롭게 작성해주세요",
};

/**
 * Figma frame "1920/VOC" (node 571:3062). Renders inside Layout. Uses
 * the shared BoardPageLayout shell — see that component for the frame
 * it was measured against.
 *
 * No mock-data hook here (unlike the list screens) — there's nothing to
 * fetch, just form state and a fixed set of suggestion types.
 *
 * Arriving with ?type=<label> (e.g. from FAQ's "1대1 질문하기" button)
 * pre-selects that suggestion-type chip instead of the default first one.
 */
export default function SuggestionsScreen() {
  const [searchParams] = useSearchParams();
  const requestedType = searchParams.get("type");
  const [type, setType] = useState(
    requestedType && SUGGESTION_TYPES.includes(requestedType) ? requestedType : SUGGESTION_TYPES[0]
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wantsReply, setWantsReply] = useState(false);

  const canSubmit = title !== "" && content !== "";

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    console.log({ type, title, content, wantsReply });
  };

  const toggleWantsReply = () => setWantsReply((v) => !v);
  const handleReplyRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleWantsReply();
    }
  };

  return (
    <BoardPageLayout title="건의함" description="여러분들의 소중한 의견을 전달해주세요" active="suggestion" contentGap={32}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.typeChips}>
          {SUGGESTION_TYPES.map((option) => (
            <BigChip
              key={option}
              size="L"
              variant={option === type ? "solid" : "outline"}
              className={styles.typeChip}
              onClick={() => setType(option)}
            >
              {option}
            </BigChip>
          ))}
        </div>

        <TextField
          label="제목"
          required
          placeholder={TITLE_PLACEHOLDERS[type] ?? TITLE_PLACEHOLDERS["기타"]}
          value={title}
          onChange={setTitle}
        />

        <TextField
          label="내용"
          required
          multiline
          maxLength={1000}
          placeholder={CONTENT_PLACEHOLDERS[type] ?? CONTENT_PLACEHOLDERS["기타"]}
          value={content}
          onChange={setContent}
        />

        <div
          role="button"
          tabIndex={0}
          aria-pressed={wantsReply}
          className={styles.replyRow}
          onClick={toggleWantsReply}
          onKeyDown={handleReplyRowKeyDown}
        >
          <Checkbox checked={wantsReply} onChange={setWantsReply} />
          <span>답변을 받겠습니다</span>
        </div>

        <Button type="submit" color="primary" size="L" disabled={!canSubmit} className={styles.submitButton}>
          {SUBMIT_LABELS[type] ?? "건의하기"}
        </Button>
      </form>
    </BoardPageLayout>
  );
}
