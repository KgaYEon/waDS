import styles from "./PageGlow.module.css";

/**
 * Promoted out of AnnouncementsScreen once the Notice detail screen
 * needed the exact same decorative background.
 */
export default function PageGlow() {
  return <div className={styles.glow} aria-hidden="true" />;
}
