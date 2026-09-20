import { useState } from "react";
import styles from "./ColorTokensScreen.module.css";
import {
  neutralPrimitives,
  primaryPrimitives,
  semanticBg,
  semanticFg,
  semanticStroke,
  type PrimitiveSwatch,
  type SemanticSwatch,
} from "./colorTokenData";
import { typographyGroups } from "./typographyTokenData";
import { spacingTokens, radiusTokens, type ScaleToken } from "./spacingTokenData";
import { iconEntries } from "./iconTokenData";
import Button, { type ButtonColor, type ButtonSize } from "../../components/ui/Button";
import Chip, { type ChipVariant, type ChipSize } from "../../components/ui/Chip";
import GameCard from "../../components/ui/GameCard";
import { GAMES } from "../../data/games";

type Tab = "primitive" | "semantic" | "typography" | "spacing" | "components" | "icons";

const TABS: { id: Tab; label: string }[] = [
  { id: "primitive", label: "원시값 팔레트" },
  { id: "semantic", label: "시맨틱 매핑" },
  { id: "typography", label: "타이포" },
  { id: "spacing", label: "스페이싱" },
  { id: "components", label: "버튼·칩·카드" },
  { id: "icons", label: "아이콘" },
];

const BUTTON_COLORS: ButtonColor[] = ["primary", "white", "border"];
const BUTTON_SIZES: ButtonSize[] = ["S", "M", "L"];
const CHIP_VARIANTS: ChipVariant[] = [
  "primary",
  "neutral-muted",
  "primary-stroke",
  "neutral-stroke",
  "ghost",
];
const CHIP_SIZES: ChipSize[] = ["S", "M", "L"];
const GAME_CARD_SAMPLES = GAMES.slice(0, 4);

const SAMPLE_TEXT = "Aa 가나다";

function PrimitiveGrid({ swatches }: { swatches: PrimitiveSwatch[] }) {
  return (
    <div className={styles.primitiveGrid}>
      {swatches.map((s) => (
        <div className={styles.primitiveCard} key={s.cssVar}>
          <div className={styles.swatch} style={{ backgroundColor: `var(${s.cssVar})` }} />
          <div className={styles.primitiveMeta}>
            <span className={styles.primitiveStep}>{s.step}</span>
            <span className={styles.varName}>{s.cssVar}</span>
            <span className={styles.hex}>{s.hex}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SemanticList({ swatches }: { swatches: SemanticSwatch[] }) {
  return (
    <div className={styles.semanticList}>
      {swatches.map((s) => (
        <div className={styles.semanticRow} key={s.cssVar}>
          <div className={styles.semanticSwatch} style={{ backgroundColor: `var(${s.cssVar})` }} />
          <div className={styles.semanticText}>
            <span className={styles.semanticName}>{s.cssVar}</span>
            <span className={styles.semanticRef}>
              → {s.refVar} ({s.hex})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpacingList({ tokens }: { tokens: ScaleToken[] }) {
  return (
    <div className={styles.scaleList}>
      {tokens.map((t) => (
        <div className={styles.scaleRow} key={t.cssVar}>
          <div className={styles.scaleTrack}>
            <div className={styles.spacingBox} style={{ width: `var(${t.cssVar})` }} />
          </div>
          <div className={styles.scaleMeta}>
            <span className={styles.scaleName}>{t.cssVar}</span>
            <span className={styles.scaleValue}>
              {t.label} · {t.px}px
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RadiusList({ tokens }: { tokens: ScaleToken[] }) {
  return (
    <div className={styles.scaleList}>
      {tokens.map((t) => (
        <div className={styles.scaleRow} key={t.cssVar}>
          <div className={styles.scaleTrack}>
            <div className={styles.radiusBox} style={{ borderRadius: `var(${t.cssVar})` }} />
          </div>
          <div className={styles.scaleMeta}>
            <span className={styles.scaleName}>{t.cssVar}</span>
            <span className={styles.scaleValue}>
              {t.label} · {t.px}px
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Dev-only color token inspector — /debug/colors, outside Layout and
 * unrelated to any real screen. Shows tokens.css's color layer as it
 * currently stands: primitive scales as swatch grids, semantic tokens
 * as name -> primitive reference rows. Deliberately reads colors via
 * `var(--token)` (not hardcoded per-swatch hex) so this page drifts
 * visibly, not silently, if tokens.css changes without this page being
 * updated to match.
 */
export default function ColorTokensScreen() {
  const [tab, setTab] = useState<Tab>("primitive");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Color Tokens</h1>
      <p className={styles.subtitle}>
        tokens.css 컬러 레이어 확인용 개발 페이지 — 실제 서비스 화면과 무관합니다.
      </p>

      <div className={styles.tabBar} role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            data-active={tab === t.id}
            className={styles.tabButton}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "primitive" && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Neutral</h2>
            <p className={styles.sectionMeta}>--primitive-neutral-* · 11단계</p>
            <PrimitiveGrid swatches={neutralPrimitives} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Primary</h2>
            <p className={styles.sectionMeta}>--primitive-primary-* · 8단계</p>
            <PrimitiveGrid swatches={primaryPrimitives} />
          </section>
        </>
      )}

      {tab === "semantic" && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>bg</h2>
            <p className={styles.sectionMeta}>--bg-* · {semanticBg.length}개</p>
            <SemanticList swatches={semanticBg} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>fg</h2>
            <p className={styles.sectionMeta}>--fg-* · {semanticFg.length}개</p>
            <SemanticList swatches={semanticFg} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>stroke</h2>
            <p className={styles.sectionMeta}>--stroke-* · {semanticStroke.length}개</p>
            <SemanticList swatches={semanticStroke} />
          </section>
        </>
      )}

      {tab === "typography" && (
        <>
          {typographyGroups.map((group) => (
            <section className={styles.section} key={group.title}>
              <h2 className={styles.sectionTitle}>{group.title}</h2>
              <p className={styles.sectionMeta}>{group.tokens.length}개</p>
              <div className={styles.typeList}>
                {group.tokens.map((t) => (
                  <div className={styles.typeRow} key={t.cssVarBase}>
                    <span
                      className={styles.typeSample}
                      style={{
                        fontFamily: "var(--font-family-base)",
                        fontSize: `var(${t.cssVarBase}-size)`,
                        fontWeight: `var(${t.cssVarBase}-weight)`,
                        lineHeight: `var(${t.cssVarBase}-line-height)`,
                        letterSpacing: `var(${t.cssVarBase}-letter-spacing)`,
                      }}
                    >
                      {SAMPLE_TEXT}
                    </span>
                    <div className={styles.typeMeta}>
                      <span className={styles.typeName}>{t.cssVarBase}-*</span>
                      <span className={styles.typeValues}>
                        {t.size} / {t.weight} / {t.lineHeight} / {t.letterSpacing}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {tab === "spacing" && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Spacing</h2>
            <p className={styles.sectionMeta}>--spacing-* · {spacingTokens.length}단계</p>
            <SpacingList tokens={spacingTokens} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Radius</h2>
            <p className={styles.sectionMeta}>--radius-* · {radiusTokens.length}단계</p>
            <RadiusList tokens={radiusTokens} />
          </section>
        </>
      )}

      {tab === "components" && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Button</h2>
            <p className={styles.sectionMeta}>color × size, 마지막 줄은 disabled</p>
            {BUTTON_COLORS.map((color) => (
              <div className={styles.componentGroup} key={color}>
                <span className={styles.componentGroupLabel}>color=&quot;{color}&quot;</span>
                <div className={styles.componentRow}>
                  {BUTTON_SIZES.map((size) => (
                    <Button key={size} color={color} size={size}>
                      Button {size}
                    </Button>
                  ))}
                  <Button color={color} size="M" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Chip</h2>
            <p className={styles.sectionMeta}>variant × size</p>
            {CHIP_VARIANTS.map((variant) => (
              <div className={styles.componentGroup} key={variant}>
                <span className={styles.componentGroupLabel}>variant=&quot;{variant}&quot;</span>
                <div className={styles.componentRow}>
                  {CHIP_SIZES.map((size) => (
                    <Chip key={size} variant={variant} size={size}>
                      Chip {size}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>GameCard</h2>
            <p className={styles.sectionMeta}>Figma node 617:4541 · 모든 게임 카드가 공유하는 컴포넌트</p>
            <div className={styles.gameCardGrid}>
              {GAME_CARD_SAMPLES.map((game) => (
                <GameCard
                  key={game.id}
                  imageUrl={game.imageFile}
                  imageAlt={game.title}
                  title={game.title}
                  category={game.genre}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "icons" && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Icons</h2>
          <p className={styles.sectionMeta}>
            {iconEntries.length}개 · 24px / 32px 나란히 (구성 동일한지 육안 확인용)
          </p>
          <div className={styles.iconGrid}>
            {iconEntries.map(({ name, Component }) => (
              <div className={styles.iconCell} key={name}>
                <div className={styles.iconSizes}>
                  <div className={styles.iconSizeLabel}>
                    <Component size={24} />
                    <span>24</span>
                  </div>
                  <div className={styles.iconSizeLabel}>
                    <Component size={32} />
                    <span>32</span>
                  </div>
                </div>
                <span className={styles.iconName}>{name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
