import { Fragment } from "react";
import styles from "./SeriesBandSection.module.css";

/**
 * New section, Figma node 562:2298 — no equivalent existed before this
 * rework. Purely a visual "browse by series" band for now: SeriesScreen
 * has no series-filtering query yet (see Header.tsx's own comment on its
 * placeholder routes), so these avatars are decorative, not links —
 * flagged in the write-up rather than wiring a filter that doesn't exist.
 * Thumbnails are the pre-cropped 72x72 assets already in
 * public/images/main/1920/.
 *
 * No Container of its own — Home.tsx wraps every body section (this one
 * included) in the shared Container/Grid/GridColumn(span=10, start=2),
 * same as WeeklyPickSection/RecommendedGamesSection.
 */
const SERIES_ITEMS = [
  { id: "shu", label: "슈게임", image: "/images/main/1920/shu.png" },
  { id: "kiniwini", label: "키니위니", image: "/images/main/1920/kiniwini.png" },
  { id: "shin", label: "짱구 교실", image: "/images/main/1920/shin.png" },
  { id: "pani", label: "파니팡", image: "/images/main/1920/pani.png" },
  { id: "pororo", label: "뽀로로교실", image: "/images/main/1920/pororo.png" },
  { id: "jola", label: "졸라맨 시리즈", image: "/images/main/1920/jola.png" },
  { id: "yuhu", label: "유후와 친구들", image: "/images/main/1920/yuhu.png" },
];

export default function SeriesBandSection() {
  return (
    <div className={styles.band}>
      {SERIES_ITEMS.map((item, i) => (
        <Fragment key={item.id}>
          {i > 0 && <span className={styles.divider} aria-hidden="true" />}
          <div className={styles.entry}>
            <img className={styles.avatar} src={item.image} alt="" />
            <span className={styles.label}>{item.label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
