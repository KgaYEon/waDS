import { useState } from "react";
import styles from "./FilterScreen.module.css";
import Filter from "../../components/ui/Filter";
import IconChip from "../../components/ui/IconChip";
import GameCard from "../../components/ui/GameCard";
import { useFilterOptions, useFilteredGames } from "./useFilterData";
import type { FilterKey, FilterSelection } from "./useFilterData";

/**
 * Figma frames "UI/game filter" (node 91:3211) and "1440/game filter"
 * (node 307:2346). The frames' own Header/Footer are intentionally NOT
 * reproduced — this screen renders inside Layout, same as every other
 * screen.
 *
 * This screen doesn't use Container/Grid/GridColumn — its sidebar +
 * content split doesn't map onto a centered 12-column reading column
 * the way the board screens do, and it wasn't asked for this time.
 * Layout values below are this screen's own measured literals (like
 * Header's documented exception), not a new pattern.
 *
 * Filter options are derived from the real games.ts catalog (not the
 * Figma mock's example option text, which doesn't match real data at
 * all for sites — see chat notes).
 */
export default function FilterScreen() {
  const options = useFilterOptions();
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [selection, setSelection] = useState<FilterSelection>({
    types: [],
    sites: [],
    genres: [],
    series: [],
  });

  const results = useFilteredGames(selection);

  const toggleOpen = (key: FilterKey) => {
    setOpenFilter((current) => (current === key ? null : key));
  };

  const removeChip = (key: FilterKey, value: string) => {
    setSelection((prev) => ({ ...prev, [key]: prev[key].filter((v) => v !== value) }));
  };

  const resetAll = () => setSelection({ types: [], sites: [], genres: [], series: [] });

  const activeChips: Array<{ key: FilterKey; value: string; label: string }> = [
    ...selection.types.map((value) => ({ key: "types" as const, value, label: value })),
    ...selection.sites.map((value) => ({ key: "sites" as const, value, label: value })),
    ...selection.genres.map((value) => ({ key: "genres" as const, value, label: value })),
    ...selection.series.map((value) => ({ key: "series" as const, value, label: value })),
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>필터 검색</h1>
            <p className={styles.subtitle}>필터를 통해 원하는 내용을 검색해보세요</p>
          </div>
          {activeChips.length > 0 && (
            <div className={styles.filterSet}>
              <button type="button" className={styles.resetButton} onClick={resetAll}>
                필터 초기화
              </button>
              <div className={styles.chips}>
                {activeChips.map((chip) => (
                  <IconChip
                    key={`${chip.key}-${chip.value}`}
                    label={chip.label}
                    onClick={() => removeChip(chip.key, chip.value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <Filter
            label="종류 별 필터링"
            options={options.types}
            open={openFilter === "types"}
            onToggleOpen={() => toggleOpen("types")}
            selected={selection.types}
            onChange={(next) => setSelection((prev) => ({ ...prev, types: next }))}
          />
          <Filter
            label="사이트 별 필터링"
            options={options.sites}
            open={openFilter === "sites"}
            onToggleOpen={() => toggleOpen("sites")}
            selected={selection.sites}
            onChange={(next) => setSelection((prev) => ({ ...prev, sites: next }))}
          />
          <Filter
            label="장르 별 필터링"
            options={options.genres}
            open={openFilter === "genres"}
            onToggleOpen={() => toggleOpen("genres")}
            selected={selection.genres}
            onChange={(next) => setSelection((prev) => ({ ...prev, genres: next }))}
            maxVisible={5}
            moreLabel="장르 더보기"
          />
          <Filter
            label="시리즈 별 필터링"
            options={options.series}
            open={openFilter === "series"}
            onToggleOpen={() => toggleOpen("series")}
            selected={selection.series}
            onChange={(next) => setSelection((prev) => ({ ...prev, series: next }))}
            maxVisible={5}
            moreLabel="시리즈 더보기"
          />
        </aside>

        <div className={styles.content}>
          {results.length > 0 ? (
            <div className={styles.grid}>
              {results.map((game) => (
                <GameCard
                  key={game.id}
                  imageUrl={game.imageFile}
                  imageAlt={game.title}
                  title={game.title}
                  category={game.genre}
                />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>조건에 맞는 게임이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

