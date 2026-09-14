export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ screen's sample data. No API yet — same convention as
 * useHomeData/useAnnouncementsData (hook lives in the screen folder
 * until real API integration).
 */
export function useFaqData(): FaqItem[] {
  return [
    {
      id: "faq-1",
      question: "회원가입 없이도 게임을 플레이할 수 있나요?",
      answer:
        "네, 대부분의 게임은 별도 로그인 없이 바로 플레이하실 수 있습니다. 다만 플레이 기록 저장이나 즐겨찾기 기능은 로그인이 필요합니다.",
    },
    {
      id: "faq-2",
      question: "게임이 실행되지 않아요. 어떻게 해야 하나요?",
      answer:
        "Chrome, Edge 등 최신 브라우저에서 가장 안정적으로 작동합니다. 그래도 실행되지 않는다면 건의함 게시판에 게임 이름과 함께 신고해 주세요.",
    },
    {
      id: "faq-3",
      question: "제가 찾는 게임이 없어요. 요청할 수 있나요?",
      answer:
        "네, 건의함 게시판을 통해 원하시는 게임을 요청해 주시면 원본 파일 확보 여부를 확인 후 순차적으로 추가하겠습니다.",
    },
    {
      id: "faq-4",
      question: "모바일에서도 이용할 수 있나요?",
      answer:
        "일부 게임은 터치 조작을 지원하지 않아 PC 환경에서의 플레이를 권장합니다. 모바일 최적화는 순차적으로 진행 중입니다.",
    },
    {
      id: "faq-5",
      question: "후원은 어디에 사용되나요?",
      answer: "서버 운영 및 게임 보존 작업에 사용됩니다. 자세한 내용은 후원하기 게시판에서 확인하실 수 있습니다.",
    },
  ];
}
