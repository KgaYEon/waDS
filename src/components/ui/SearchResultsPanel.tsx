import styles from "./SearchResultsPanel.module.css";
import RecentSearchItem from "./RecentSearchItem";
import TextButtonSmall from "./TextButtonSmall";

export interface SearchResultsPanelProps {
  recentSearches?: string[];
  onSelect?: (label: string) => void;
  onRemove?: (label: string) => void;
  onClearAll?: () => void;
  showFooter?: boolean;
  autoSaveEnabled?: boolean;
  onToggleAutoSave?: () => void;
  onClose?: () => void;
  className?: string;
}

export default function SearchResultsPanel({
  recentSearches = [],
  onSelect,
  onRemove,
  onClearAll,
  showFooter = false,
  autoSaveEnabled = true,
  onToggleAutoSave,
  onClose,
  className,
}: SearchResultsPanelProps) {
  const hasResults = recentSearches.length > 0;

  return (
    <div className={[styles.panel, className].filter(Boolean).join(" ")}>
      {hasResults ? (
        <div className={styles.results}>
          <div className={styles.resultsHead}>
            <TextButtonSmall as="span">최근 검색 결과</TextButtonSmall>
            <TextButtonSmall onClick={onClearAll}>모두 삭제</TextButtonSmall>
          </div>
          <div className={styles.list}>
            {recentSearches.map((label) => (
              <RecentSearchItem
                key={label}
                label={label}
                onSelect={() => onSelect?.(label)}
                onRemove={() => onRemove?.(label)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className={styles.empty}>
          {autoSaveEnabled ? "최근 검색이 없습니다." : "검색어 자동 저장 꺼짐"}
        </p>
      )}

      {showFooter && (
        <div className={styles.footer}>
          <TextButtonSmall onClick={onToggleAutoSave}>
            {autoSaveEnabled ? "자동 저장 끄기" : "자동 저장 켜기"}
          </TextButtonSmall>
          <TextButtonSmall onClick={onClose}>닫기</TextButtonSmall>
        </div>
      )}
    </div>
  );
}
