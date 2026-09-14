import type { Notice } from "../types/notice";

const GENERIC_BODY: Notice["body"] = [{ type: "text", text: "안내드립니다. 자세한 내용은 추후 업데이트될 예정입니다." }];

/**
 * Sample notices, shared by the Announcements list and the Notice detail
 * screen so both resolve the same ids (see the comment on the Notice
 * type). Order here is display order — pinned notices first, then the
 * rest — and doubles as prev/next order on the detail screen.
 *
 * "사이트 이용안내 및 주의사항" is the Figma detail frame's own example
 * post (node 26:1011/241:3630) — it wasn't in the announcements list
 * frame, so adding it here also adds a third pinned row to that list.
 *
 * Pinned notices are NOT paginated — useAnnouncementsData always returns
 * the full pinned list regardless of page, only the regular notices
 * below are sliced per page (see PAGE_SIZE there). 12 regular notices
 * here fill exactly 3 pages of 4, matching the list frame's pagination
 * (‹ 1 2 3 ›).
 */
export const NOTICES: Notice[] = [
  {
    id: "notice-guide",
    title: "사이트 이용안내 및 주의사항",
    date: "2026 . 10 . 20",
    pinned: true,
    author: "관리자",
    body: [
      { type: "text", text: "사이트를 이용하시기 전 아래 안내 사항을 꼭 확인해 주세요." },
      { type: "text", text: "■ 저작권 안내" },
      {
        type: "text",
        text: "본 사이트에서 제공하는 모든 플래시 콘텐츠는 보존 목적으로만 운영됩니다. 상업적 이용은 금지되어 있습니다.",
      },
      { type: "text", text: "■ 이용 수칙" },
      {
        type: "list",
        items: [
          "타인을 비방하거나 불쾌감을 주는 댓글은 삭제될 수 있습니다.",
          "스팸 또는 광고성 글은 즉시 삭제 및 계정 정지 처리됩니다.",
          "건의사항은 건의함 게시판을 이용해 주세요.",
        ],
      },
      { type: "text", text: "■ 서비스 이용 환경" },
      { type: "text", text: "Chrome, Edge 최신 버전에서 가장 안정적으로 작동합니다. 감사합니다." },
    ],
  },
  {
    id: "notice-pinned-1",
    title: "복구 불가능한 게임 목록",
    date: "2026 . 10 . 21",
    pinned: true,
    author: "관리자",
    body: [
      { type: "text", text: "아래 게임들은 원본 소스 유실로 복구가 불가능합니다." },
      {
        type: "list",
        items: ["좀비 서바이벌 (2009)", "우주 방어대 리턴즈 (2011)", "카드 매칭 디럭스 (2007)"],
      },
      { type: "text", text: "새로운 원본 파일 제보는 건의함 게시판으로 부탁드립니다." },
    ],
  },
  {
    id: "notice-pinned-2",
    title: "10월 복구 접수 게임 목록",
    date: "2026 . 10 . 21",
    pinned: true,
    author: "관리자",
    body: [
      { type: "text", text: "10월 중 복구 요청이 접수된 게임 목록입니다. 순차적으로 진행됩니다." },
      { type: "list", items: ["감옥탈출 리마스터", "타향만두", "탈출! 100층", "핑퐁 챔피언"] },
    ],
  },
  {
    id: "notice-1",
    title: "10월 서버 점검 안내",
    date: "2026 . 10 . 19",
    author: "관리자",
    body: [
      { type: "text", text: "안정적인 서비스 제공을 위해 아래 일정으로 서버 점검을 진행합니다." },
      { type: "text", text: "일시: 2026. 10. 22(목) 02:00 ~ 06:00" },
      { type: "text", text: "점검 시간 동안 게임 접속 및 검색 기능이 일시 중단됩니다." },
    ],
  },
  {
    id: "notice-2",
    title: "신규 게임 10종 업데이트 안내",
    date: "2026 . 10 . 18",
    author: "관리자",
    body: [
      { type: "text", text: "이달의 신작 코너에 신규 게임 10종이 추가되었습니다." },
      { type: "list", items: ["여우와 두루미", "동전 쌓기", "젤리 매치", "미로 탈출 외 6종"] },
    ],
  },
  {
    id: "notice-3",
    title: "모바일 브라우저 호환성 안내",
    date: "2026 . 10 . 15",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-4",
    title: "커뮤니티 이용 규칙 개정 안내",
    date: "2026 . 10 . 14",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-5",
    title: "플래시 플레이어 대체 기술 적용 공지",
    date: "2026 . 10 . 10",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-6",
    title: "정기 백업 일정 변경 안내",
    date: "2026 . 10 . 08",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-7",
    title: "게임 평점 시스템 오픈 안내",
    date: "2026 . 10 . 05",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-8",
    title: "추석 연휴 고객센터 운영 안내",
    date: "2026 . 10 . 02",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-9",
    title: "이용약관 개정 사전 안내",
    date: "2026 . 09 . 28",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-10",
    title: "장애 신고 접수 채널 안내",
    date: "2026 . 09 . 25",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-11",
    title: "9월 인기 게임 순위 공개",
    date: "2026 . 09 . 20",
    author: "관리자",
    body: GENERIC_BODY,
  },
  {
    id: "notice-12",
    title: "베타 테스터 모집 안내",
    date: "2026 . 09 . 15",
    author: "관리자",
    body: GENERIC_BODY,
  },
];
