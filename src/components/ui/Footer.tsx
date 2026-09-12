import type { HTMLAttributes } from "react";
import styles from "./Footer.module.css";
import Container from "./Container";
import Grid from "./Grid";
import GridColumn from "./GridColumn";
import { IconLogo } from "./icons";

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  links?: FooterLink[];
  tagline?: string;
  copyright?: string;
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: "About" },
  { label: "FAQ" },
  { label: "Discord" },
  { label: "Instagram" },
  { label: "Contacts" },
];

export default function Footer({
  links = DEFAULT_LINKS,
  tagline = "A platform for archiving and playing classic Flash games",
  copyright = "@2026 Zeno, All rights reserved",
  className,
  ...rest
}: FooterProps) {
  return (
    <footer className={[styles.footer, className].filter(Boolean).join(" ")} {...rest}>
      <Container>
        <Grid>
          <GridColumn span={12} className={styles.inner}>
            <div className={styles.contWrap}>
              <div className={styles.head}>
                <div className={styles.brand}>
                  <IconLogo
                    className={styles.logoMark}
                    shapeColor="var(--color-neutral-300)"
                    dotColor="var(--color-neutral-400)"
                  />
                  <span className={styles.wordmark}>waflash</span>
                </div>
                <ul className={styles.navList}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a className={styles.navLink} href={link.href ?? "#"}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.tagline}>{tagline}</p>
            </div>
            <hr className={styles.divider} />
            <p className={styles.copyright}>{copyright}</p>
          </GridColumn>
        </Grid>
      </Container>
    </footer>
  );
}
