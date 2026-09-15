import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LoginScreen.module.css";
import { IconLogo } from "../../components/ui/icons";
import { IconKakao, IconNaver, IconApple, IconGoogle } from "../../components/icons";
import { useAuth } from "../../hooks/useAuth";

interface SsoProvider {
  key: string;
  label: string;
  icon: ReactNode;
  buttonClassName: string;
}

/**
 * Figma frames "1920/login" (node 494:2667) and "1440/login" (node
 * 494:2869). The frame's own Header/Footer are intentionally NOT
 * reproduced — this screen renders inside Layout, same as every other
 * screen. Header shows the "로그인" chip while on this page (still
 * logged out) and switches to the avatar once one of the buttons below
 * is clicked.
 *
 * Mock auth only — no real OAuth. Every button below just calls the same
 * useAuth().login() and returns to wherever the user came from (or "/"),
 * regardless of which provider was clicked.
 */
export default function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const handleSsoClick = () => {
    login();
    navigate(from, { replace: true });
  };

  const providers: SsoProvider[] = [
    {
      key: "kakao",
      label: "카카오로 로그인",
      icon: <IconKakao size={32} />,
      buttonClassName: styles.kakao,
    },
    {
      key: "naver",
      label: "네이버로 로그인",
      icon: <IconNaver size={32} />,
      buttonClassName: styles.naver,
    },
    {
      key: "apple",
      label: "Apple로 로그인",
      icon: <IconApple size={32} />,
      buttonClassName: styles.apple,
    },
    {
      key: "google",
      label: "Google로 로그인",
      icon: <IconGoogle size={32} />,
      buttonClassName: styles.google,
    },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.headGroup}>
          <IconLogo className={styles.logo} />
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>Log IN</h1>
            <p className={styles.subtitle}>와플래시에 오신 것을 환영합니다!</p>
          </div>
        </div>

        <div className={styles.providerRow}>
          {providers.map((provider) => (
            <div key={provider.key} className={styles.providerItem}>
              <button
                type="button"
                className={`${styles.providerButton} ${provider.buttonClassName}`}
                onClick={handleSsoClick}
              >
                {provider.icon}
              </button>
              <span className={styles.providerLabel}>{provider.label}</span>
            </div>
          ))}
        </div>

        {/* No real privacy policy / terms page exists yet — left as
            inert text rather than linking it somewhere wrong, same
            treatment as other no-destination elements elsewhere (e.g.
            Donation screen's month-nav arrows). */}
        <span className={styles.privacyLink}>개인정보처리방침 및 약관 확인</span>
      </div>
    </div>
  );
}
