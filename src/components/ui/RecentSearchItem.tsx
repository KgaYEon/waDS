import styles from "./RecentSearchItem.module.css";
import { IconIcon as IconInfo } from "../icons";

export interface RecentSearchItemProps {
  label: string;
  onSelect?: () => void;
  onRemove?: () => void;
}

export default function RecentSearchItem({ label, onSelect, onRemove }: RecentSearchItemProps) {
  return (
    <div className={styles.row}>
      <button type="button" className={styles.label} onClick={onSelect}>
        {label}
      </button>
      <button
        type="button"
        className={styles.iconButton}
        onClick={onRemove}
        aria-label="검색어 삭제"
      >
        <IconInfo size={24} className={styles.icon} />
      </button>
    </div>
  );
}
