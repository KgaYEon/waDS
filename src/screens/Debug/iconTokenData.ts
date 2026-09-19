import type { ComponentType, SVGProps } from "react";
import {
  IconSearch,
  IconArrowLeft,
  IconArrowRight,
  IconArrowDown,
  IconArrowUp,
  IconChevronLeftThin,
  IconReset,
  IconIcon,
  IconCheckFill,
  IconCheckEgnore,
  IconQuestion,
  IconCheckEmpty,
  IconClose,
  IconSound,
  IconSoundIg,
  IconNaver,
  IconKakao,
  IconApple,
  IconGoogle,
  IconCheck,
  IconMoon,
  IconSun,
} from "../../components/icons";

export interface IconEntry {
  name: string;
  Component: ComponentType<SVGProps<SVGSVGElement> & { size?: 24 | 32 }>;
}

/** Mirrors src/components/icons/index.ts — the 22-icon library re-measured
 * against Figma's icon frame (node 505:3473). IconProfile/IconLogo (in
 * ui/icons.tsx) aren't part of that library frame, so they're left out. */
export const iconEntries: IconEntry[] = [
  { name: "Search", Component: IconSearch },
  { name: "ArrowLeft", Component: IconArrowLeft },
  { name: "ArrowRight", Component: IconArrowRight },
  { name: "ArrowDown", Component: IconArrowDown },
  { name: "ArrowUp", Component: IconArrowUp },
  { name: "ChevronLeftThin", Component: IconChevronLeftThin },
  { name: "Reset", Component: IconReset },
  { name: "Icon", Component: IconIcon },
  { name: "CheckFill", Component: IconCheckFill },
  { name: "CheckEgnore", Component: IconCheckEgnore },
  { name: "Question", Component: IconQuestion },
  { name: "CheckEmpty", Component: IconCheckEmpty },
  { name: "Close", Component: IconClose },
  { name: "Sound", Component: IconSound },
  { name: "SoundIg", Component: IconSoundIg },
  { name: "Naver", Component: IconNaver },
  { name: "Kakao", Component: IconKakao },
  { name: "Apple", Component: IconApple },
  { name: "Google", Component: IconGoogle },
  { name: "Check", Component: IconCheck },
  { name: "Moon", Component: IconMoon },
  { name: "Sun", Component: IconSun },
];
