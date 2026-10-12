// "달려라 파이썬" 유튜브 강의(1~34강)와 1:1로 연결된 지안이의 우주 파이썬 커리큘럼입니다.
//
// 레슨 구조
// - chapter      : 소속 단원 번호 (아래 chapters 참고)
// - goal         : 이 레슨을 마치면 할 수 있게 되는 것 (학습 목표)
// - keyPoints    : 꼭 기억할 핵심 정리
// - isTheoryOnly : 영상 + 퀴즈로만 진행하는 레슨 (1~5강)
// - starterCode  : 코드 창에 처음 들어 있는 코드
// - solution     : 모범 답안 (3번 이상 막히면 볼 수 있어요. 검증 스크립트도 이 코드로 채점 기준을 확인합니다.)
// - check        : 채점 함수. 통과면 true, 아니면 아이에게 보여줄 안내 문장을 돌려줍니다.
//                  ({ code: 주석을 뺀 코드, out: 출력 전체, lines: 출력 줄 목록 })
// - quizzes      : 개념 확인 퀴즈 (모두 맞혀야 레슨 완료)
// - challenge    : 통과 후 해 볼 수 있는 선택 도전 과제
// - scratch      : 스크래치 블록과 비교 설명
// - miniGame     : 복습 미니게임 (배지 획득용, 진도와는 별개)

export const chapters = [
  { id: 1, emoji: "🚀", title: "출발 준비", subtitle: "프로그래밍과 파이썬, 첫 주문 print()" },
  { id: 2, emoji: "📦", title: "변수와 자료형", subtitle: "값을 담고, 종류를 구분하고, 입력받기" },
  { id: 3, emoji: "⚖️", title: "참과 거짓", subtitle: "비교하고 and·or로 판단하기" },
  { id: 4, emoji: "🧺", title: "리스트와 딕셔너리", subtitle: "여러 값을 모아서 다루기" },
  { id: 5, emoji: "🚧", title: "조건문", subtitle: "if · else · elif로 갈림길 만들기" },
  { id: 6, emoji: "🌀", title: "반복문", subtitle: "while · for로 반복 작업 맡기기" },
  { id: 7, emoji: "🤖", title: "함수", subtitle: "나만의 명령어 만들기" },
];

// 스크래치 블록 색상
const SCRATCH = {
  looks: "#9966ff",
  sensing: "#5cb1d6",
  operators: "#59c059",
  variables: "#ff8c1a",
  lists: "#ff661a",
  control: "#ffab19",
  myBlocks: "#ff6680",
};

const squash = (text) => text.replace(/\s+/g, "");

export const lessons = [
  // ───────────────────────── 1단원: 출발 준비 ─────────────────────────
  {
    id: 1,
    chapter: 1,
    emoji: "🌌",
    youtubeId: "KR4JF47GdFM",
    isTheoryOnly: true,
    planet: "시작의 행성",
    title: "프로그래밍 언어란?",
    goal: "컴퓨터에게 일을 시키려면 왜 프로그래밍 언어가 필요한지 말할 수 있어요.",
    story: "지안 탐험가님, 우주선 '달려라 파이썬호'에 온 걸 환영해요! 🛸\n\n우주선의 인공지능 로봇 '파이디(Pydi)'는 사람 말을 그대로 알아듣지 못해요. 컴퓨터와 약속한 특별한 말로 명령해야 하죠.\n\n이 약속된 말을 **프로그래밍 언어**라고 해요. 영상을 보며 알아볼까요?",
    keyPoints: [
      "프로그래밍 언어: 사람이 컴퓨터에게 명령을 전하기 위해 만든 약속된 언어",
      "컴퓨터는 시킨 것만, 시킨 순서대로 정확하게 해요.",
      "그래서 명령은 빠짐없이, 순서대로 적어야 해요.",
    ],
    instructions: [
      "오른쪽 1강 영상을 끝까지 시청해요.",
      "위에 나오는 파이디 퀴즈 2문제를 모두 맞히면 레슨 완료!",
    ],
    starterCode: "",
    quizzes: [
      {
        question: "컴퓨터에게 명령을 내리기 위해 사용하는 약속된 언어를 무엇이라고 할까요?",
        options: ["프로그래밍 언어", "우주 외계어", "수학 공식"],
        answer: "프로그래밍 언어",
        feedback: "딩동댕! 파이썬, 스크래치, C언어 모두 프로그래밍 언어예요. 🌟",
      },
      {
        question: "컴퓨터에게 일을 시킬 때 가장 중요한 것은 무엇일까요?",
        options: ["정확한 명령을 순서대로 빠짐없이 주기", "대충 말해도 알아서 해 주길 기다리기", "명령을 아주 빨리 말하기"],
        answer: "정확한 명령을 순서대로 빠짐없이 주기",
        feedback: "맞아요! 컴퓨터는 눈치가 없어서, 적어 준 그대로만 움직여요. 🤖",
      },
    ],
  },
  {
    id: 2,
    chapter: 1,
    emoji: "⚙️",
    youtubeId: "2MlLZ_RNPaI",
    isTheoryOnly: true,
    planet: "과정의 행성",
    title: "프로그래밍 과정",
    goal: "문제를 생각하고 → 코드로 쓰고 → 실행해서 확인하는 순서를 설명할 수 있어요.",
    story: "머릿속 생각이 실제로 움직이는 프로그램이 되기까지는 순서가 있어요.\n\n**① 무엇을 만들지 생각하기 → ② 코드로 적기(코딩) → ③ 실행하고 결과 확인하기 → ④ 틀린 곳 고치기**\n\n이 순서를 빙글빙글 반복하면서 프로그램이 완성된답니다!",
    keyPoints: [
      "코딩: 생각을 프로그래밍 언어로 적는 일",
      "실행: 적은 코드를 컴퓨터가 실제로 해 보는 것",
      "버그(bug): 프로그램 속 실수. 고치는 일을 디버깅이라고 해요.",
    ],
    instructions: [
      "오른쪽 2강 영상을 시청해요.",
      "퀴즈 2문제를 맞혀 레슨을 완료해요.",
    ],
    starterCode: "",
    quizzes: [
      {
        question: "생각한 내용을 프로그래밍 언어로 직접 적는 일을 무엇이라고 할까요?",
        options: ["코딩", "블록 쌓기", "타자 연습"],
        answer: "코딩",
        feedback: "정답! 생각을 컴퓨터 언어로 번역해 적는 일을 코딩이라고 해요. ⭐",
      },
      {
        question: "프로그램을 만드는 올바른 순서는 무엇일까요?",
        options: ["생각하기 → 코드 쓰기 → 실행·확인", "실행하기 → 생각하기 → 코드 쓰기", "코드 쓰기 → 끝"],
        answer: "생각하기 → 코드 쓰기 → 실행·확인",
        feedback: "좋아요! 실행해서 확인하고, 틀리면 고치고, 다시 실행하는 것도 잊지 마세요. 🔁",
      },
    ],
  },
  {
    id: 3,
    chapter: 1,
    emoji: "🐍",
    youtubeId: "nJgAwvEtuM4",
    isTheoryOnly: true,
    planet: "파이썬 행성",
    title: "파이썬이란?",
    goal: "파이썬이 어떤 언어이고 어디에 쓰이는지 말할 수 있어요.",
    story: "우리가 배울 프로그래밍 언어의 이름은 **파이썬(Python)**이에요! 🐍\n\n파이썬은 문장이 짧고 영어 문장처럼 읽기 쉬워서 처음 배우기 좋아요. 그런데도 인공지능, 데이터 분석, 게임, 웹사이트까지 정말 많은 곳에서 쓰이는 강력한 언어랍니다.",
    keyPoints: [
      "파이썬은 문법이 간단하고 읽기 쉬운 프로그래밍 언어예요.",
      "인공지능, 데이터 분석, 자동화, 게임 등 다양한 곳에 쓰여요.",
      "스크래치는 블록을 끼우고, 파이썬은 글자로 코드를 적어요.",
    ],
    instructions: [
      "오른쪽 3강 영상을 시청해요.",
      "퀴즈 2문제를 맞혀 레슨을 완료해요.",
    ],
    starterCode: "",
    quizzes: [
      {
        question: "우리가 배우는, 문법이 간단하고 전 세계에서 인기 많은 이 언어의 이름은?",
        options: ["파이썬 (Python)", "스네이크 (Snake)", "스크래치 (Scratch)"],
        answer: "파이썬 (Python)",
        feedback: "정답이에요! 파이썬 로고에는 뱀 두 마리가 그려져 있어요. 🐍",
      },
      {
        question: "파이썬과 스크래치의 가장 큰 차이는 무엇일까요?",
        options: ["파이썬은 글자로 코드를 적어요", "파이썬은 블록을 끼워 맞춰요", "파이썬은 그림만 그릴 수 있어요"],
        answer: "파이썬은 글자로 코드를 적어요",
        feedback: "맞아요! 스크래치 블록에 적힌 명령을 이제 글자로 직접 적는 거예요. ✍️",
      },
    ],
  },
  {
    id: 4,
    chapter: 1,
    emoji: "💻",
    youtubeId: "9wXh-eZpcAw",
    isTheoryOnly: true,
    planet: "설치 행성",
    title: "파이썬 설치하기",
    goal: "내 컴퓨터에 파이썬을 설치하는 방법을 알아요.",
    story: "이 앱에서는 설치 없이 바로 파이썬을 쓸 수 있어요. 하지만 나중에 집 컴퓨터에서 혼자 코딩하려면 파이썬을 설치해야 해요.\n\n영상을 보며 설치 순서를 미리 익혀 두면, 언제든 혼자서 척척 설치할 수 있어요! (설치는 꼭 어른과 함께 해요.)",
    keyPoints: [
      "파이썬은 공식 홈페이지 python.org 에서 무료로 받아요.",
      "윈도우에서 설치할 때는 'Add python.exe to PATH'를 체크해요.",
      "프로그램 설치는 어른과 함께 해요.",
    ],
    instructions: [
      "오른쪽 4강 영상을 시청해요.",
      "퀴즈 2문제를 맞혀 레슨을 완료해요.",
    ],
    starterCode: "",
    quizzes: [
      {
        question: "파이썬을 무료로 안전하게 내려받을 수 있는 공식 홈페이지 주소는?",
        options: ["python.org", "python-free.net", "naver.com"],
        answer: "python.org",
        feedback: "딩동댕! 프로그램은 항상 공식 홈페이지에서 받는 게 안전해요. 🔒",
      },
      {
        question: "새 프로그램을 설치할 때 지켜야 할 약속은 무엇일까요?",
        options: ["어른과 함께 공식 사이트에서 설치하기", "광고에 나온 아무 링크나 누르기", "친구가 보내 준 파일 바로 실행하기"],
        answer: "어른과 함께 공식 사이트에서 설치하기",
        feedback: "훌륭해요! 디지털 세상에서도 안전이 먼저예요. 🛡️",
      },
    ],
  },
  {
    id: 5,
    chapter: 1,
    emoji: "🛠️",
    youtubeId: "lf-jaEF0Dhs",
    isTheoryOnly: true,
    planet: "연습창 행성",
    title: "IDLE 사용하기 (1)",
    goal: "IDLE 쉘에서 한 줄씩 명령하고 바로 결과를 보는 방법을 알아요.",
    story: "파이썬을 설치하면 **IDLE**이라는 코딩 도구가 함께 들어 있어요.\n\nIDLE을 켜면 `>>>` 표시가 있는 **쉘(Shell)** 창이 열려요. 여기에 `3 + 4` 를 치고 엔터를 누르면 바로 `7` 이라고 대답해 준답니다. 한 줄씩 대화하듯 코딩하는 연습장이에요!",
    keyPoints: [
      "IDLE: 파이썬과 함께 설치되는 기본 코딩 도구",
      ">>> : '명령을 입력하세요'라는 신호(프롬프트)",
      "쉘에서는 한 줄을 입력하고 엔터를 누르면 바로 결과가 나와요.",
    ],
    instructions: [
      "오른쪽 5강 영상을 시청해요.",
      "퀴즈 2문제를 맞혀 레슨을 완료해요.",
    ],
    starterCode: "",
    quizzes: [
      {
        question: "파이썬을 설치하면 함께 들어 있는 기본 코딩 도구의 이름은?",
        options: ["IDLE", "스크래치", "엔트리"],
        answer: "IDLE",
        feedback: "정답! IDLE은 파이썬의 단짝 코딩 도구예요. 🛠️",
      },
      {
        question: "IDLE 쉘에 보이는 >>> 표시는 무슨 뜻일까요?",
        options: ["여기에 명령을 입력하세요", "프로그램이 고장 났어요", "인터넷이 끊겼어요"],
        answer: "여기에 명령을 입력하세요",
        feedback: "맞아요! >>> 뒤에 명령을 적고 엔터를 누르면 파이썬이 바로 대답해요. 💬",
      },
    ],
  },
  {
    id: 6,
    chapter: 1,
    emoji: "📜",
    youtubeId: "E6e1KuYFyW8",
    planet: "첫 주문 행성",
    title: "IDLE 사용하기 (2) · 첫 주문 print()",
    goal: "print()로 화면에 글자를 출력하는 코드를 쓰고 실행할 수 있어요.",
    story: "IDLE에서 File → New File을 열면 여러 줄짜리 코드를 저장해 두고 **F5** 키로 한 번에 실행할 수 있어요.\n\n이 앱의 **코드 창**이 바로 그 새 파일이고, **[▶ 실행]** 버튼이 F5 키예요!\n\n이제 첫 주문을 외워 봐요. 화면에 글자를 보여 주는 주문은 **print()** 예요. 글자는 꼭 따옴표(\"\")로 감싸야 해요.",
    keyPoints: [
      "print(\"글자\") : 괄호 안의 내용을 화면에 보여 줘요.",
      "글자는 반드시 따옴표 \" \" 로 감싸요.",
      "코드는 위에서 아래로 한 줄씩 차례대로 실행돼요.",
    ],
    instructions: [
      "첫 줄에 print(\"안녕, 파이썬!\") 을 적어요.",
      "둘째 줄에 print()로 나를 소개하는 문장을 하나 더 출력해요. (예: print(\"나는 지안이에요\"))",
      "[▶ 실행] 버튼을 눌러 결과 창에 두 줄이 나오는지 확인해요.",
    ],
    starterCode: "# 1. 화면에 \"안녕, 파이썬!\"을 출력해 보세요.\n# 2. 나를 소개하는 문장을 한 줄 더 출력해 보세요.\n",
    solution: "print(\"안녕, 파이썬!\")\nprint(\"나는 지안이에요\")\n",
    hints: [
      "print 는 모두 소문자로 적어요.",
      "글자 앞뒤에 따옴표가 짝을 이루는지 확인해요: print(\"안녕\")",
    ],
    check: ({ code, lines }) => {
      if ((code.match(/print\(/g) || []).length < 2) return "print()를 두 번 사용해서 두 줄을 출력해 보세요.";
      if (!lines.some((l) => l.includes("안녕"))) return "첫 줄에 \"안녕, 파이썬!\"이 출력되어야 해요.";
      if (lines.length < 2) return "결과 창에 두 줄 이상 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "IDLE 에디터 창에 코드를 다 적은 뒤 실행할 때 누르는 키는?",
        options: ["F5", "F1", "Esc"],
        answer: "F5",
        feedback: "정답! 이 앱에서는 [▶ 실행] 버튼이 F5 역할을 해요. ⚙️",
      },
      {
        question: "화면에 글자를 보여 주는 파이썬 명령어는 무엇일까요?",
        options: ["print()", "show()", "say()"],
        answer: "print()",
        feedback: "딩동댕! print는 '인쇄하다'라는 뜻이에요. 🖨️",
      },
    ],
    challenge: "print(\"★\" * 10) 을 실행해 보세요. 무슨 일이 일어날까요?",
    scratch: { block: "[안녕! 라고 말하기]", color: SCRATCH.looks, text: "print(\"안녕!\")은 스크래치의 [말하기] 블록과 같아요. 대신 결과는 결과 창에 나와요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "첫 주문 풍선 터트리기",
      description: "화면에 글자를 보여 주는 주문 'print' 철자 풍선을 순서대로 터트려요!",
      word: "print",
    },
  },

  // ───────────────────────── 2단원: 변수와 자료형 ─────────────────────────
  {
    id: 7,
    chapter: 2,
    emoji: "📦",
    youtubeId: "h1jaHMzaCWg",
    planet: "마법 상자 행성",
    title: "변수: 이름표 붙은 상자",
    goal: "변수를 만들어 값을 저장하고, 변수 이름으로 값을 꺼내 출력할 수 있어요.",
    story: "값을 보관하는 **이름표 붙은 상자**를 **변수**라고 해요. 📦\n\n`stars = 10` 이라고 쓰면 stars라는 상자에 10을 넣어요.\n\n여기서 `=` 는 수학의 '같다'가 아니에요! **오른쪽 값을 왼쪽 상자에 넣으라**는 뜻이에요.\n\n상자 안의 값을 보려면 `print(stars)` 처럼 따옴표 없이 이름만 적어요.",
    keyPoints: [
      "변수 = 값 : 오른쪽 값을 왼쪽 이름의 상자에 넣어요.",
      "print(stars) 는 상자 안의 값(10)을, print(\"stars\") 는 글자 stars를 출력해요.",
      "변수는 쓰기 전에 먼저 만들어야 해요.",
    ],
    instructions: [
      "첫 줄에 stars = 10 을 적어 stars 상자에 10을 넣어요.",
      "다음 줄에 print(stars) 를 적어 상자 안의 값을 출력해요.",
      "상자 이름에는 따옴표를 붙이지 않아요!",
    ],
    starterCode: "# 1. stars 상자를 만들고 10을 넣어 보세요.\n# 2. stars 상자 안의 값을 출력해 보세요.\n",
    solution: "stars = 10\nprint(stars)\n",
    hints: [
      "stars = 10 이 print(stars) 보다 위에 있어야 해요.",
      "print(\"stars\") 처럼 따옴표를 붙이면 글자 stars가 그대로 나와요.",
    ],
    check: ({ code, lines }) => {
      if (!/stars\s*=\s*10\b/.test(code)) return "stars = 10 으로 상자를 먼저 만들어 주세요.";
      if (!/print\(\s*stars\s*\)/.test(code)) return "print(stars) 로 상자 안의 값을 꺼내 보세요. 따옴표 없이 적어요!";
      if (!lines.includes("10")) return "결과 창에 10이 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "stars = 10 에서 = 기호는 어떤 뜻일까요?",
        options: ["오른쪽 값을 왼쪽 상자에 넣어요", "왼쪽과 오른쪽이 같은지 물어봐요", "왼쪽 값을 오른쪽에 넣어요"],
        answer: "오른쪽 값을 왼쪽 상자에 넣어요",
        feedback: "딩동댕! 파이썬의 = 는 '넣기(대입)'예요. 같은지 물을 때는 == 를 써요. 📦",
      },
      {
        question: "stars = 10 다음에 print(\"stars\") 를 실행하면 무엇이 나올까요?",
        options: ["stars", "10", "에러"],
        answer: "stars",
        feedback: "정답! 따옴표가 있으면 상자가 아니라 글자 그대로 출력돼요. 🔍",
      },
    ],
    challenge: "stars = stars + 5 를 추가하고 다시 출력해 보세요. 상자 안의 값이 어떻게 바뀌나요?",
    scratch: { block: "[stars ▾ 을(를) 10 로 정하기]", color: SCRATCH.variables, text: "stars = 10 은 주황색 [변수 정하기] 블록과 같아요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "상자 열기 풍선",
      description: "stars = 10 다음에 print(stars) 를 실행하면 무엇이 나올까요? 정답 풍선을 터트려요!",
      prompt: "print(stars) 의 결과",
      answer: "10",
      distractors: ["stars", "\"stars\"", "0"],
    },
  },
  {
    id: 8,
    chapter: 2,
    emoji: "🏷️",
    youtubeId: "-GAttuheYhk",
    planet: "글자와 숫자 행성",
    title: "자료형: 글자와 숫자",
    goal: "숫자와 글자(문자열)를 구분하고 type()으로 자료형을 확인할 수 있어요.",
    story: "파이썬 나라에는 **숫자**와 **글자(문자열)**가 살고 있어요.\n\n글자는 따옴표 옷을 입고(`\"파이디\"`), 숫자는 옷 없이 다녀요(`30`).\n\n그래서 `\"30\"` 은 계산할 수 없는 글자이고, `30` 은 계산할 수 있는 숫자예요!\n\n`type()` 마법을 쓰면 값이 어떤 종류인지 알려 줘요.",
    keyPoints: [
      "숫자: 30, 3.14 처럼 따옴표 없이 써요. 계산할 수 있어요.",
      "문자열(str): \"파이디\" 처럼 따옴표로 감싸요.",
      "\"30\" 은 숫자처럼 보여도 글자예요!",
      "type(값) : 값의 종류를 알려 줘요. (int, float, str …)",
    ],
    instructions: [
      "print(30) 을 적어 숫자 30을 출력해요.",
      "print(\"파이디\") 를 적어 글자 파이디를 출력해요.",
      "print(type(30)) 과 print(type(\"파이디\")) 로 두 값의 종류를 확인해요.",
    ],
    starterCode: "# 1. 숫자 30을 출력해 보세요.\n# 2. 글자 \"파이디\"를 출력해 보세요.\n# 3. type()으로 30과 \"파이디\"의 종류를 출력해 보세요.\n",
    solution: "print(30)\nprint(\"파이디\")\nprint(type(30))\nprint(type(\"파이디\"))\n",
    hints: [
      "숫자에는 따옴표를 붙이지 않아요: print(30)",
      "type 결과도 보려면 print로 감싸요: print(type(30))",
    ],
    check: ({ code, lines, out }) => {
      if (!lines.includes("30")) return "숫자 30을 출력해 보세요: print(30)";
      if (!lines.includes("파이디")) return "글자 파이디를 따옴표로 감싸 출력해 보세요: print(\"파이디\")";
      if (!code.includes("type(")) return "type()으로 값의 종류도 확인해 보세요.";
      if (!out.includes("<class 'int'>") || !out.includes("<class 'str'>")) return "type(30) 과 type(\"파이디\") 의 결과를 모두 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "따옴표가 없는 숫자 30과 글자 \"30\"의 차이는 무엇일까요?",
        options: ["숫자 30은 계산할 수 있어요", "둘은 완전히 똑같아요", "글자 \"30\"만 계산할 수 있어요"],
        answer: "숫자 30은 계산할 수 있어요",
        feedback: "정답! 따옴표를 입으면 글자가 되어서 계산 대신 이어 붙이기만 할 수 있어요. ⭐",
      },
      {
        question: "type(\"안녕\") 의 결과로 나오는 자료형 이름은?",
        options: ["str", "int", "float"],
        answer: "str",
        feedback: "딩동댕! str은 string(문자열)의 줄임말이에요. 🏷️",
      },
    ],
    challenge: "print(\"30\" + \"5\") 와 print(30 + 5) 를 각각 실행해 보세요. 결과가 왜 다를까요?",
    scratch: { block: "[30 라고 말하기] / [파이디 라고 말하기]", color: SCRATCH.looks, text: "스크래치에서는 숫자와 글자를 구분하지 않았지만, 파이썬은 따옴표로 둘을 구분해요!" },
    miniGame: {
      type: "code-defense",
      title: "숫자·글자 분류 디펜스",
      description: "다가오는 값이 숫자면 [숫자 대포], 따옴표를 입은 글자면 [글자 대포]를 쏘세요! \"77\"처럼 숫자 모양 글자도 조심!",
      cannons: [
        { id: "number", label: "🧮 숫자 대포" },
        { id: "string", label: "💬 글자 대포" },
      ],
      enemies: [
        { label: "10", type: "number" },
        { label: "\"안녕\"", type: "string" },
        { label: "3.14", type: "number" },
        { label: "\"77\"", type: "string" },
        { label: "500", type: "number" },
      ],
    },
  },
  {
    id: 9,
    chapter: 2,
    emoji: "💬",
    youtubeId: "NZ8s1yx5kyg",
    planet: "안녕 행성",
    title: "입력과 출력: input()과 print()",
    goal: "input()으로 키보드 입력을 받아 변수에 저장하고 print()로 출력할 수 있어요.",
    story: "이번에는 우주선과 대화해 봐요! 💬\n\n**input()** 은 키보드로 입력을 받는 주문이에요. 실행하면 입력 창이 뜨고, 지안이가 적은 글자를 돌려줘요.\n\n`name = input(\"이름이 뭐예요? \")` 처럼 쓰면 질문을 보여 주고, 대답을 name 상자에 넣어요.",
    keyPoints: [
      "input(\"질문\") : 질문을 보여 주고 키보드 입력을 받아요.",
      "입력받은 값은 변수에 넣어 두고 쓸 수 있어요.",
      "input()으로 받은 값은 숫자를 적어도 항상 글자(str)예요.",
    ],
    instructions: [
      "name = input(\"이름이 뭐예요? \") 을 적어 입력을 name 상자에 넣어요.",
      "print(\"반가워요,\", name) 을 적어 인사해요.",
      "실행하면 입력 창이 떠요. 이름을 적고 [확인]을 눌러요!",
    ],
    starterCode: "# 1. input()으로 이름을 입력받아 name 상자에 넣어 보세요.\n# 2. print()로 name에게 인사해 보세요.\n",
    solution: "name = input(\"이름이 뭐예요? \")\nprint(\"반가워요,\", name)\n",
    sampleInputs: ["지안"],
    hints: [
      "input 결과를 담으려면 name = input() 처럼 = 를 써요.",
      "print(\"반가워요,\", name) 처럼 쉼표로 글자와 변수를 함께 출력할 수 있어요.",
    ],
    check: ({ code, lines }) => {
      if (!/\w+\s*=\s*input\(/.test(code)) return "name = input() 처럼 입력받은 값을 상자에 넣어 주세요.";
      if (!code.includes("print(")) return "print()로 입력받은 이름을 출력해 보세요.";
      if (lines.length < 2) return "입력한 이름이 들어간 인사말이 출력되어야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "키보드로 입력을 받는 파이썬 명령어는 무엇일까요?",
        options: ["input()", "print()", "type()"],
        answer: "input()",
        feedback: "딩동댕! input()은 사용자가 입력할 때까지 기다렸다가 그 값을 돌려줘요. 👂",
      },
      {
        question: "age = input() 에 10을 입력하면 age 상자에 든 값의 종류는?",
        options: ["글자(str) \"10\"", "숫자(int) 10", "아무것도 안 들어가요"],
        answer: "글자(str) \"10\"",
        feedback: "정답! input()은 항상 글자를 돌려줘요. 숫자로 쓰려면 int()로 바꿔야 해요. 🔢",
      },
    ],
    challenge: "age = int(input(\"몇 살이에요? \")) 로 나이를 받아서 print(age + 1) 로 내년 나이를 출력해 보세요.",
    scratch: { block: "[이름이 뭐예요? 라고 묻고 기다리기] → (대답)", color: SCRATCH.sensing, text: "input(\"이름이 뭐예요? \")는 하늘색 [묻고 기다리기] 블록과 (대답) 블록을 합친 것과 같아요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "입력 주문 풍선",
      description: "키보드 입력을 받는 주문 'input' 철자 풍선을 순서대로 터트려요!",
      word: "input",
    },
  },
  {
    id: 10,
    chapter: 2,
    emoji: "🧮",
    youtubeId: "5sXKgcSgH6o",
    planet: "별 계산 행성",
    title: "숫자 자료형: int와 float",
    goal: "정수(int)와 실수(float)를 구분하고 사칙연산을 할 수 있어요.",
    story: "숫자에도 두 종류가 있어요! 🧮\n\n- **정수(int)** : 소수점이 없는 수 (5, 10, -2)\n- **실수(float)** : 소수점이 있는 수 (1.5, 3.14)\n\n정수와 실수를 계산하면 결과는 실수가 돼요. 그리고 나누기(`/`) 결과는 항상 실수예요!",
    keyPoints: [
      "int(정수): 5, -2 / float(실수): 1.5, 3.14",
      "더하기 +, 빼기 -, 곱하기 *, 나누기 /",
      "5 + 1.5 → 6.5 (정수 + 실수 = 실수)",
      "10 / 2 → 5.0 (나누기 결과는 항상 실수)",
    ],
    instructions: [
      "a = 5 와 b = 1.5 를 각각 한 줄씩 적어요.",
      "print(a + b) 로 두 수를 더한 결과를 출력해요.",
      "print(a * 2) 로 a에 2를 곱한 결과도 출력해요.",
    ],
    starterCode: "# 1. 정수 5를 a에, 실수 1.5를 b에 넣어 보세요.\n# 2. a + b 를 출력해 보세요.\n# 3. a * 2 를 출력해 보세요.\n",
    solution: "a = 5\nb = 1.5\nprint(a + b)\nprint(a * 2)\n",
    hints: [
      "곱하기 기호는 x가 아니라 별표 * 예요.",
      "a = 5 와 b = 1.5 가 print보다 먼저 있어야 해요.",
    ],
    check: ({ code, lines }) => {
      if (!/a\s*=\s*5\b/.test(code) || !/b\s*=\s*1\.5\b/.test(code)) return "a = 5 와 b = 1.5 를 먼저 만들어 주세요.";
      if (!lines.includes("6.5")) return "print(a + b) 결과로 6.5가 나와야 해요.";
      if (!lines.includes("10")) return "print(a * 2) 결과로 10이 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "3.14 처럼 소수점이 있는 숫자의 자료형 이름은?",
        options: ["float (실수)", "int (정수)", "str (문자열)"],
        answer: "float (실수)",
        feedback: "딩동댕! float는 '떠다니는 소수점'에서 온 이름이에요. 🌟",
      },
      {
        question: "print(10 / 2) 를 실행하면 무엇이 나올까요?",
        options: ["5.0", "5", "10/2"],
        answer: "5.0",
        feedback: "정답! 파이썬에서 / 나누기 결과는 항상 실수(float)예요. ➗",
      },
    ],
    challenge: "print(7 // 2) 와 print(7 % 2) 를 실행해 보세요. // 는 몫, % 는 나머지를 구해요!",
    scratch: { block: "[(5) + (1.5)]", color: SCRATCH.operators, text: "a + b 는 초록색 [더하기] 연산 블록과 같아요. 곱하기는 *, 나누기는 / 로 적어요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "계산 결과 풍선",
      description: "a = 5, b = 1.5 일 때 print(a + b) 의 결과가 적힌 풍선을 터트려요!",
      prompt: "a + b 의 결과",
      answer: "6.5",
      distractors: ["6", "51.5", "7.5"],
    },
  },
  {
    id: 11,
    chapter: 2,
    emoji: "📢",
    youtubeId: "JdlCwvVeUCc",
    planet: "우주 확성기 행성",
    title: "문자열(str) 다루기",
    goal: "문자열을 + 로 이어 붙이고 * 로 반복할 수 있어요.",
    story: "글자(문자열)끼리 **+** 를 쓰면 풀로 붙이듯 이어져요.\n\n`\"안녕 \" + \"지안\"` → `\"안녕 지안\"`\n\n글자에 숫자를 **\\*** 로 곱하면 그만큼 반복돼요.\n\n`\"★\" * 3` → `\"★★★\"`\n\n확성기로 지안이에게 인사해 볼까요?",
    keyPoints: [
      "문자열 + 문자열 : 이어 붙이기",
      "문자열 * 숫자 : 반복하기",
      "띄어쓰기도 글자예요. \"안녕 \" 처럼 따옴표 안에 공백을 넣어요.",
      "문자열 + 숫자는 에러! (\"나이\" + 10 ✗)",
    ],
    instructions: [
      "name = \"지안\" 을 적어 name 상자를 만들어요.",
      "print(\"안녕 \" + name) 으로 인사말을 이어 붙여 출력해요.",
      "print(\"★\" * 5) 로 별을 5개 출력해요.",
    ],
    starterCode: "# 1. name 상자에 \"지안\"을 넣어 보세요.\n# 2. \"안녕 \"과 name을 + 로 이어 붙여 출력해 보세요.\n# 3. \"★\"을 * 로 5번 반복해 출력해 보세요.\n",
    solution: "name = \"지안\"\nprint(\"안녕 \" + name)\nprint(\"★\" * 5)\n",
    hints: [
      "\"안녕 \" 처럼 따옴표 안 끝에 공백을 넣으면 띄어쓰기가 생겨요.",
      "곱하기는 * 기호예요: \"★\" * 5",
    ],
    check: ({ code, lines }) => {
      if (!/name\s*=\s*["']지안["']/.test(code)) return "name = \"지안\" 으로 상자를 먼저 만들어 주세요.";
      if (!/\+\s*name|name\s*\+/.test(code)) return "+ 기호로 인사말과 name을 이어 붙여 보세요.";
      if (!lines.some((l) => l.includes("안녕") && l.includes("지안"))) return "\"안녕 지안\"처럼 인사말이 출력되어야 해요.";
      if (!lines.includes("★★★★★")) return "\"★\" * 5 로 별 5개를 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "print(\"우주\" + \"선\") 의 결과는?",
        options: ["우주선", "우주 선", "에러"],
        answer: "우주선",
        feedback: "정답! + 는 글자를 빈틈없이 이어 붙여요. 띄어쓰기를 원하면 공백을 직접 넣어요. ✨",
      },
      {
        question: "print(\"하\" * 3) 의 결과는?",
        options: ["하하하", "하3", "3하"],
        answer: "하하하",
        feedback: "딩동댕! 글자 * 숫자는 그 글자를 숫자만큼 반복해요. 😆",
      },
    ],
    challenge: "age = 10 일 때 print(\"나는 \" + str(age) + \"살\") 을 실행해 보세요. str()은 숫자를 글자로 바꿔 줘요.",
    scratch: { block: "[(안녕 ) 와(과) (지안) 결합하기]", color: SCRATCH.operators, text: "\"안녕 \" + name 은 초록색 [결합하기] 연산 블록과 같아요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "글자 붙이기 풍선",
      description: "print(\"안녕\" + \"지안\") 의 결과가 적힌 풍선을 터트려요! 띄어쓰기를 잘 봐요.",
      prompt: "\"안녕\" + \"지안\" 의 결과",
      answer: "안녕지안",
      distractors: ["안녕 지안", "지안안녕", "에러"],
    },
  },
  {
    id: 12,
    chapter: 2,
    emoji: "🔑",
    youtubeId: "A-rwQQGgFVM",
    planet: "방 번호 행성",
    title: "인덱스: 글자의 방 번호",
    goal: "인덱스(0부터 시작)로 문자열의 원하는 글자를 꺼낼 수 있어요.",
    story: "문자열 속 글자마다 **방 번호(인덱스)**가 있어요.\n\n그런데 컴퓨터는 **0번부터** 세요!\n\n`word = \"우주선\"` 이면 `word[0]` 은 \"우\", `word[1]` 은 \"주\", `word[2]` 는 \"선\" 이에요.\n\n`word[-1]` 처럼 음수를 쓰면 뒤에서부터 셀 수 있어요.",
    keyPoints: [
      "인덱스는 0부터 시작해요. 첫 글자 = [0]",
      "글자 수가 3개면 마지막 인덱스는 2예요.",
      "[-1] 은 맨 마지막 글자예요.",
      "없는 번호를 쓰면 IndexError가 나요.",
    ],
    instructions: [
      "word = \"우주선\" 이 이미 준비되어 있어요.",
      "print(word[0]) 으로 첫 글자를 출력해요.",
      "print(word[-1]) 로 마지막 글자를 출력해요.",
    ],
    starterCode: "word = \"우주선\"\n# 1. word의 첫 번째 글자(인덱스 0)를 출력해 보세요.\n# 2. word의 마지막 글자(인덱스 -1)를 출력해 보세요.\n",
    solution: "word = \"우주선\"\nprint(word[0])\nprint(word[-1])\n",
    hints: [
      "대괄호 [ ] 안에 방 번호를 적어요: word[0]",
      "첫 글자는 1번이 아니라 0번이에요!",
    ],
    check: ({ code, lines }) => {
      if (!code.includes("word[0]")) return "word[0] 으로 첫 글자를 꺼내 보세요.";
      if (!lines.includes("우")) return "첫 글자 \"우\"가 출력되어야 해요.";
      if (!lines.includes("선")) return "마지막 글자 \"선\"도 출력해 보세요. word[-1] 또는 word[2]를 써요.";
      return true;
    },
    quizzes: [
      {
        question: "word = \"hello\" 에서 세 번째 글자 'l'의 인덱스는?",
        options: ["2", "3", "1"],
        answer: "2",
        feedback: "딩동댕! h=0, e=1, l=2 예요. 0부터 세는 것 잊지 마요! 🔑",
      },
      {
        question: "word = \"pydi\" 일 때 word[-1] 의 값은?",
        options: ["i", "p", "에러"],
        answer: "i",
        feedback: "정답! -1은 맨 뒤 글자를 가리켜요. 🔙",
      },
    ],
    challenge: "len(word) 를 출력해 보세요. 글자 수를 알려 줘요!",
    scratch: { block: "[(우주선) 의 (1) 번째 글자]", color: SCRATCH.operators, text: "스크래치는 1번부터 세지만, 파이썬 word[0]은 0번부터 세요. 이게 가장 큰 차이예요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "방 번호 풍선",
      description: "word = \"pydi\" 일 때, 첫 글자 'p'를 꺼내는 코드 풍선을 터트려요!",
      prompt: "'p' 를 꺼내는 코드",
      answer: "word[0]",
      distractors: ["word[1]", "word[4]", "word[p]"],
    },
  },

  // ───────────────────────── 3단원: 참과 거짓 ─────────────────────────
  {
    id: 13,
    chapter: 3,
    emoji: "⚖️",
    youtubeId: "Fy2E8WCuOyA",
    planet: "참과 거짓 행성",
    title: "bool (1): 비교 연산",
    goal: "비교 연산자로 두 값을 비교하고 결과가 True/False(bool)임을 알아요.",
    story: "파이썬은 질문을 받으면 **True(참)** 또는 **False(거짓)** 로만 대답해요. ⚖️\n\n이렇게 참·거짓을 나타내는 자료형을 **bool(불)** 이라고 해요.\n\n`>`, `<`, `>=`, `<=`, `==`(같다), `!=`(다르다) 같은 **비교 연산자**로 질문할 수 있어요.",
    keyPoints: [
      "비교 결과는 True 또는 False (bool 자료형)",
      "== 는 같은지 비교, = 는 상자에 넣기 (헷갈리지 않기!)",
      "!= 는 '다르다', >= 는 '크거나 같다'",
      "True, False 는 첫 글자가 대문자예요.",
    ],
    instructions: [
      "print(10 > 5) 를 적어 실행해요. → True",
      "print(3 == 4) 를 적어 실행해요. → False",
      "print(7 != 7) 도 직접 예상한 뒤 실행해 확인해요.",
    ],
    starterCode: "# 1. 10이 5보다 큰지 출력해 보세요.\n# 2. 3과 4가 같은지 == 로 출력해 보세요.\n# 3. 7과 7이 다른지 != 로 출력해 보세요.\n",
    solution: "print(10 > 5)\nprint(3 == 4)\nprint(7 != 7)\n",
    hints: [
      "같은지 비교할 때는 = 를 두 번! == 예요.",
      "다른지 비교할 때는 != 예요.",
    ],
    check: ({ code, lines }) => {
      if (!code.includes(">")) return "print(10 > 5) 처럼 크기를 비교해 보세요.";
      if (!code.includes("==")) return "== 로 두 값이 같은지 비교해 보세요.";
      if (!code.includes("!=")) return "!= 로 두 값이 다른지 비교해 보세요.";
      if (!lines.includes("True") || !lines.includes("False")) return "결과에 True와 False가 모두 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "두 값이 같은지 비교할 때 쓰는 기호는?",
        options: ["==", "=", "=>"],
        answer: "==",
        feedback: "정답! = 하나는 '넣기', == 두 개는 '같은지 비교'예요. ⚖️",
      },
      {
        question: "print(5 >= 5) 의 결과는?",
        options: ["True", "False", "5"],
        answer: "True",
        feedback: "딩동댕! >= 는 '크거나 같다'라서 5와 5는 True예요. ✅",
      },
    ],
    challenge: "print(type(True)) 를 실행해 보세요. 어떤 자료형 이름이 나오나요?",
    scratch: { block: "<(10) > (5)>", color: SCRATCH.operators, text: "10 > 5 는 육각형 모양의 초록색 비교 블록과 같아요. 결과는 참/거짓이에요!" },
    miniGame: {
      type: "rhythm-beat",
      title: "참과 거짓 리듬 댄스",
      description: "식이 참이면 O(True), 거짓이면 X(False)! 노트가 판정선에 올 때 눌러요.",
      beats: [
        { expr: "10 > 5", expect: "O" },
        { expr: "3 > 8", expect: "X" },
        { expr: "5 == 5", expect: "O" },
        { expr: "7 != 7", expect: "X" },
      ],
    },
  },
  {
    id: 14,
    chapter: 3,
    emoji: "🧭",
    youtubeId: "RyqGzKsnk20",
    planet: "논리 결합 행성",
    title: "bool (2): and · or · not",
    goal: "and, or, not 으로 여러 조건을 합친 결과를 예측할 수 있어요.",
    story: "여러 질문을 하나로 묶을 수 있어요! 🧭\n\n- **and(그리고)** : 둘 다 True여야 True\n- **or(또는)** : 하나라도 True면 True\n- **not(반대)** : True ↔ False 뒤집기\n\n예: '숙제를 했고(and) 9시 전이면 게임 가능!'",
    keyPoints: [
      "A and B : 둘 다 참일 때만 True",
      "A or B : 하나라도 참이면 True",
      "not A : 참과 거짓을 뒤집어요.",
      "헷갈리면 괄호로 묶어요: (3 > 1) and (2 > 5)",
    ],
    instructions: [
      "print(True and False) 를 적어요.",
      "print(True or False) 를 적어요.",
      "print(not True) 를 적고, 실행 전에 결과를 먼저 예상해 봐요!",
    ],
    starterCode: "# 1. True and False 를 출력해 보세요.\n# 2. True or False 를 출력해 보세요.\n# 3. not True 를 출력해 보세요.\n",
    solution: "print(True and False)\nprint(True or False)\nprint(not True)\n",
    hints: [
      "True, False 는 첫 글자를 대문자로 적어요.",
      "and, or, not 은 모두 소문자예요.",
    ],
    check: ({ code, lines }) => {
      if (!/\band\b/.test(code)) return "and 를 사용해 보세요.";
      if (!/\bor\b/.test(code)) return "or 를 사용해 보세요.";
      if (!/\bnot\b/.test(code)) return "not 을 사용해 보세요.";
      if (lines.join(",") !== "False,True,False") return "세 줄의 결과가 False, True, False 순서로 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "두 조건 중 하나만 참이어도 True가 되는 것은?",
        options: ["or", "and", "not"],
        answer: "or",
        feedback: "정답! or는 '또는'이라서 하나만 맞아도 통과예요. 🚪",
      },
      {
        question: "(3 > 1) and (2 > 5) 의 결과는?",
        options: ["False", "True", "에러"],
        answer: "False",
        feedback: "딩동댕! 2 > 5 가 거짓이라서 and 전체가 False예요. 🧭",
      },
    ],
    challenge: "age = 10 일 때 print(age >= 8 and age <= 13) 은 무엇이 나올까요?",
    scratch: { block: "<< > 그리고 < >>  /  << > 또는 < >>", color: SCRATCH.operators, text: "and는 [그리고], or는 [또는], not은 [~이(가) 아니다] 블록과 같아요!" },
    miniGame: {
      type: "rhythm-beat",
      title: "논리 결합 리듬 비트",
      description: "and · or · not 식의 결과가 True면 O, False면 X를 눌러요!",
      beats: [
        { expr: "True and False", expect: "X" },
        { expr: "True or False", expect: "O" },
        { expr: "not False", expect: "O" },
        { expr: "(3 > 1) and (2 > 5)", expect: "X" },
      ],
    },
  },

  // ───────────────────────── 4단원: 리스트와 딕셔너리 ─────────────────────────
  {
    id: 15,
    chapter: 4,
    emoji: "🧺",
    youtubeId: "x_2zV6CH7vM",
    planet: "바구니 행성",
    title: "리스트 (1): 여러 값 모으기",
    goal: "대괄호 [ ]로 리스트를 만들어 여러 값을 한꺼번에 저장할 수 있어요.",
    story: "변수 상자에는 값을 하나만 담을 수 있었죠? **리스트**는 여러 값을 차례로 담는 바구니예요. 🧺\n\n대괄호 **[ ]** 안에 값을 쉼표(,)로 나열해요.\n\n`fruits = [\"사과\", \"바나나\", \"체리\"]`\n\n숫자, 글자 무엇이든 담을 수 있어요.",
    keyPoints: [
      "리스트: [값1, 값2, 값3] 처럼 대괄호와 쉼표로 만들어요.",
      "담긴 순서가 그대로 유지돼요.",
      "빈 리스트는 [] 예요.",
    ],
    instructions: [
      "fruits = [\"사과\", \"바나나\", \"체리\"] 를 적어 바구니를 만들어요.",
      "print(fruits) 로 바구니 전체를 출력해요.",
    ],
    starterCode: "# 1. 사과, 바나나, 체리가 든 fruits 리스트를 만들어 보세요.\n# 2. fruits 를 출력해 보세요.\n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nprint(fruits)\n",
    hints: [
      "리스트는 대괄호 [ ] 를 써요. 소괄호 ( ) 가 아니에요!",
      "값과 값 사이에 쉼표(,)를 넣어요.",
    ],
    check: ({ out }) => {
      if (!out.includes("['사과', '바나나', '체리']")) return "['사과', '바나나', '체리'] 가 출력되어야 해요. 순서와 철자를 확인해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "여러 값을 순서대로 한꺼번에 담는 파이썬 자료형은?",
        options: ["리스트(list)", "정수(int)", "불(bool)"],
        answer: "리스트(list)",
        feedback: "정답! 리스트 하나에 값을 수백 개도 담을 수 있어요. 🧺",
      },
      {
        question: "리스트를 만들 때 쓰는 괄호는?",
        options: ["대괄호 [ ]", "중괄호 { }", "소괄호 ( )"],
        answer: "대괄호 [ ]",
        feedback: "딩동댕! 리스트는 대괄호 [ ] 예요. 📐",
      },
    ],
    challenge: "숫자 리스트 numbers = [1, 2, 3] 도 만들어 출력해 보세요.",
    scratch: { block: "[fruits 리스트 만들기]", color: SCRATCH.lists, text: "fruits = [...] 는 스크래치 변수 메뉴의 [리스트 만들기]와 같아요!" },
    miniGame: {
      type: "code-defense",
      title: "리스트 감별 디펜스",
      description: "다가오는 값이 리스트면 [리스트 대포], 리스트가 아니면 [다른 값 대포]를 쏘세요!",
      cannons: [
        { id: "list", label: "🧺 리스트 대포" },
        { id: "other", label: "🔹 다른 값 대포" },
      ],
      enemies: [
        { label: "[1, 2, 3]", type: "list" },
        { label: "\"사과\"", type: "other" },
        { label: "['A', 'B']", type: "list" },
        { label: "100", type: "other" },
        { label: "[]", type: "list" },
      ],
    },
  },
  {
    id: 16,
    chapter: 4,
    emoji: "🎒",
    youtubeId: "A6U3zcmb8xU",
    planet: "바구니 연습 행성",
    title: "리스트 (1) 연습문제",
    goal: "숫자 리스트와 글자 리스트를 직접 만들어 출력할 수 있어요.",
    story: "우주 탐사에 가져갈 가방을 싸 볼까요? 🎒\n\n이번에는 지안이가 직접 리스트를 설계하는 연습 시간이에요. 막히면 [📺 영상] 버튼으로 16강 풀이를 보고 와도 좋아요!",
    keyPoints: [
      "리스트 안에는 숫자도, 글자도 담을 수 있어요.",
      "글자에는 따옴표, 숫자에는 따옴표 없이!",
    ],
    instructions: [
      "numbers = [1, 2, 3, 4, 5] 숫자 리스트를 만들어 출력해요.",
      "bag 이라는 이름으로 우주 가방에 넣을 물건 3개가 든 리스트를 만들어요. (예: [\"물\", \"망원경\", \"간식\"])",
      "print(bag) 으로 가방을 출력해요.",
    ],
    starterCode: "# 1. 1부터 5까지 든 numbers 리스트를 만들고 출력해 보세요.\n\n# 2. 물건 3개가 든 bag 리스트를 만들고 출력해 보세요.\n",
    solution: "numbers = [1, 2, 3, 4, 5]\nprint(numbers)\n\nbag = [\"물\", \"망원경\", \"간식\"]\nprint(bag)\n",
    hints: [
      "숫자 리스트: [1, 2, 3, 4, 5]",
      "글자 리스트: [\"물\", \"망원경\", \"간식\"] 처럼 하나하나 따옴표로 감싸요.",
    ],
    check: ({ code, lines }) => {
      if (!lines.includes("[1, 2, 3, 4, 5]")) return "numbers 리스트 [1, 2, 3, 4, 5] 를 출력해 보세요.";
      if (!/bag\s*=\s*\[/.test(code)) return "bag = [ ... ] 로 가방 리스트를 만들어 보세요.";
      const bagLine = lines.find((l) => /^\['[^']*'(, '[^']*'){2,}\]$/.test(l));
      if (!bagLine) return "따옴표로 감싼 물건 3개 이상이 든 bag 리스트를 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "다음 중 올바르게 만든 리스트는?",
        options: ["[\"물\", \"간식\", \"책\"]", "[\"물\" \"간식\" \"책\"]", "(\"물\", \"간식\", \"책\")"],
        answer: "[\"물\", \"간식\", \"책\"]",
        feedback: "정답! 대괄호와 쉼표가 모두 있어야 리스트예요. 🎒",
      },
      {
        question: "아무것도 들어 있지 않은 빈 리스트는?",
        options: ["[]", "[0]", "\"\""],
        answer: "[]",
        feedback: "딩동댕! [] 는 빈 바구니예요. 나중에 물건을 채울 수 있어요. 🧺",
      },
    ],
    challenge: "섞인 리스트 mix = [\"지안\", 10, True] 를 만들어 출력해 보세요. 종류가 달라도 함께 담을 수 있어요!",
    scratch: { block: "[bag 리스트 만들기]", color: SCRATCH.lists, text: "스크래치에서 리스트를 만들고 항목을 하나씩 추가하던 일을, 파이썬은 한 줄로 해요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "리스트 철자 풍선",
      description: "여러 값을 담는 바구니 'list' 철자 풍선을 순서대로 터트려요!",
      word: "list",
    },
  },
  {
    id: 17,
    chapter: 4,
    emoji: "🔢",
    youtubeId: "Aw5Xoj36w0U",
    planet: "보물 찾기 행성",
    title: "리스트 (2): 인덱스로 꺼내기·바꾸기",
    goal: "인덱스로 리스트의 값을 꺼내고 바꿀 수 있어요.",
    story: "바구니 속 보물에도 방 번호가 있어요. 문자열처럼 **0번부터** 세요! 🔑\n\n`fruits[0]` → \"사과\", `fruits[2]` → \"체리\"\n\n방 번호로 값을 **바꿀** 수도 있어요.\n\n`fruits[1] = \"포도\"` → 바나나가 포도로!",
    keyPoints: [
      "리스트[번호] 로 값을 꺼내요. 첫 번째는 [0]",
      "리스트[번호] = 새 값 으로 값을 바꿔요.",
      "[-1] 은 마지막 값이에요.",
    ],
    instructions: [
      "print(fruits[0]) 으로 첫 번째 과일을 출력해요.",
      "fruits[1] = \"포도\" 로 두 번째 과일을 바꿔요.",
      "print(fruits) 로 바뀐 바구니를 확인해요.",
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# 1. 첫 번째 과일(인덱스 0)을 출력해 보세요.\n# 2. 두 번째 과일(인덱스 1)을 \"포도\"로 바꿔 보세요.\n# 3. fruits 전체를 출력해 보세요.\n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nprint(fruits[0])\nfruits[1] = \"포도\"\nprint(fruits)\n",
    hints: [
      "두 번째 과일의 인덱스는 1이에요.",
      "바꿀 때도 = 를 써요: fruits[1] = \"포도\"",
    ],
    check: ({ lines }) => {
      if (!lines.includes("사과")) return "print(fruits[0]) 으로 첫 번째 과일 사과를 출력해 보세요.";
      if (!lines.includes("['사과', '포도', '체리']")) return "fruits[1] = \"포도\" 로 바꾼 뒤 print(fruits) 를 해 보세요. ['사과', '포도', '체리'] 가 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "리스트의 세 번째 값을 가리키는 인덱스는?",
        options: ["2", "3", "0"],
        answer: "2",
        feedback: "정답! 0, 1, 2 순서라서 세 번째는 2예요. 🔑",
      },
      {
        question: "nums = [5, 6, 7] 에서 nums[0] = 9 를 실행하면 nums 는?",
        options: ["[9, 6, 7]", "[5, 6, 7, 9]", "[9, 5, 6, 7]"],
        answer: "[9, 6, 7]",
        feedback: "딩동댕! 0번 방의 값 5가 9로 바뀌었어요. 🔄",
      },
    ],
    challenge: "print(fruits[-1]) 은 무엇을 출력할까요? 예상하고 실행해 보세요.",
    scratch: { block: "[fruits 리스트의 (1) 번째 항목]", color: SCRATCH.lists, text: "스크래치는 1번째부터, 파이썬은 [0]부터! 값 바꾸기는 [~번째 항목을 ~으로 바꾸기] 블록과 같아요." },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "방 번호 풍선 맞히기",
      description: "fruits = [\"apple\", \"banana\", \"cherry\"] 에서 \"banana\"를 꺼내는 코드 풍선을 터트려요!",
      prompt: "\"banana\" 를 꺼내는 코드",
      answer: "fruits[1]",
      distractors: ["fruits[0]", "fruits[2]", "fruits[3]"],
    },
  },
  {
    id: 18,
    chapter: 4,
    emoji: "➕",
    youtubeId: "cbjwdDFOF6c",
    planet: "바구니 채우기 행성",
    title: "리스트 (3): append와 len",
    goal: "append()로 리스트에 값을 추가하고 len()으로 개수를 셀 수 있어요.",
    story: "바구니에 새 보물을 더 넣고 싶을 땐 **.append()** 를 써요. ✨\n\n`fruits.append(\"체리\")` → 맨 뒤에 체리 추가!\n\n바구니에 몇 개가 들었는지 궁금하면 **len()** 으로 세요.\n\n`len(fruits)` → 3",
    keyPoints: [
      "리스트.append(값) : 맨 뒤에 값을 추가해요.",
      "len(리스트) : 들어 있는 값의 개수를 알려 줘요.",
      "append 앞의 점(.)을 빠뜨리지 않기!",
    ],
    instructions: [
      "fruits.append(\"체리\") 로 체리를 추가해요.",
      "print(fruits) 로 바구니를 출력해요.",
      "print(len(fruits)) 로 과일 개수를 출력해요.",
    ],
    starterCode: "fruits = [\"사과\", \"바나나\"]\n# 1. fruits 맨 뒤에 \"체리\"를 추가해 보세요.\n# 2. fruits 를 출력해 보세요.\n# 3. fruits 에 든 과일 개수를 출력해 보세요.\n",
    solution: "fruits = [\"사과\", \"바나나\"]\nfruits.append(\"체리\")\nprint(fruits)\nprint(len(fruits))\n",
    hints: [
      "fruits.append(\"체리\") — 리스트 이름, 점, append, 괄호 순서예요.",
      "개수를 보려면 print(len(fruits)) 처럼 print로 감싸요.",
    ],
    check: ({ code, lines }) => {
      if (!code.includes(".append(")) return "fruits.append(\"체리\") 로 체리를 추가해 보세요.";
      if (!lines.includes("['사과', '바나나', '체리']")) return "체리를 추가한 뒤 print(fruits) 를 해 보세요.";
      if (!code.includes("len(") || !lines.includes("3")) return "print(len(fruits)) 로 개수 3을 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "리스트 맨 끝에 새 값을 추가하는 명령은?",
        options: ["append", "add", "push"],
        answer: "append",
        feedback: "정답! append는 '덧붙이다'라는 뜻이에요. 🧺",
      },
      {
        question: "len([10, 20, 30, 40]) 의 결과는?",
        options: ["4", "40", "3"],
        answer: "4",
        feedback: "딩동댕! len은 값의 개수를 세요. 📏",
      },
    ],
    challenge: "fruits.remove(\"사과\") 를 실행한 뒤 fruits 를 출력해 보세요. 무엇이 사라졌나요?",
    scratch: { block: "[체리 을(를) fruits 에 추가하기] / [fruits 의 길이]", color: SCRATCH.lists, text: "append는 [리스트에 추가하기], len은 [리스트의 길이] 블록과 같아요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "추가 주문 풍선",
      description: "리스트에 값을 추가하는 주문 'append' 철자 풍선을 순서대로 터트려요!",
      word: "append",
    },
  },
  {
    id: 19,
    chapter: 4,
    emoji: "📊",
    youtubeId: "-TDVnVE1MTg",
    planet: "채우기 연습 행성",
    title: "리스트 (3) 연습문제",
    goal: "append, len, 인덱스를 함께 써서 리스트를 다룰 수 있어요.",
    story: "지안이의 우주 퀴즈 점수표가 있어요. 📊\n\n오늘 받은 새 점수를 추가하고, 점수가 몇 개인지, 마지막 점수는 무엇인지 확인해 봐요. 막히면 [📺 영상]에서 19강 풀이를 참고해요!",
    keyPoints: [
      "append → 추가, len → 개수, [-1] → 마지막 값",
      "여러 기능을 순서대로 조합하면 원하는 결과를 만들 수 있어요.",
    ],
    instructions: [
      "scores 리스트에 append()로 100을 추가해요.",
      "print(scores) 로 전체 점수를 출력해요.",
      "print(len(scores)) 로 점수 개수를 출력해요.",
      "print(scores[-1]) 로 마지막 점수를 출력해요.",
    ],
    starterCode: "scores = [90, 85, 70]\n# 1. scores 에 100을 추가해 보세요.\n# 2. scores 전체를 출력해 보세요.\n# 3. 점수 개수를 출력해 보세요.\n# 4. 마지막 점수를 출력해 보세요.\n",
    solution: "scores = [90, 85, 70]\nscores.append(100)\nprint(scores)\nprint(len(scores))\nprint(scores[-1])\n",
    hints: [
      "숫자를 추가할 때는 따옴표 없이: scores.append(100)",
      "마지막 값은 scores[-1] 또는 scores[3] 이에요.",
    ],
    check: ({ code, lines }) => {
      if (!code.includes(".append(")) return "scores.append(100) 으로 점수를 추가해 보세요.";
      if (!lines.includes("[90, 85, 70, 100]")) return "100을 추가한 뒤 print(scores) 를 해 보세요. [90, 85, 70, 100] 이 나와야 해요.";
      if (!code.includes("len(") || !lines.includes("4")) return "print(len(scores)) 로 개수 4를 출력해 보세요.";
      if (lines[lines.length - 1] !== "100") return "마지막 줄에 print(scores[-1]) 로 마지막 점수 100을 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "nums = [3, 6, 9] 에 nums.append(12) 를 하면 len(nums) 는?",
        options: ["4", "3", "12"],
        answer: "4",
        feedback: "정답! 값이 하나 늘어서 4개가 되었어요. 📏",
      },
      {
        question: "리스트의 마지막 값을 꺼내는 가장 편한 방법은?",
        options: ["리스트[-1]", "리스트[0]", "리스트[last]"],
        answer: "리스트[-1]",
        feedback: "딩동댕! 길이를 몰라도 [-1]이면 항상 마지막 값이에요. 🔙",
      },
    ],
    challenge: "print(sum(scores)) 와 print(max(scores)) 를 실행해 보세요. 합계와 최고 점수를 알려 줘요!",
    scratch: { block: "[scores 의 길이] / [scores 리스트의 (길이) 번째 항목]", color: SCRATCH.lists, text: "스크래치에서 마지막 항목을 꺼내려면 길이를 써야 했지만, 파이썬은 [-1] 한 번이면 돼요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "개수 세기 풍선",
      description: "len([3, 6, 9, 12]) 의 결과가 적힌 풍선을 터트려요!",
      prompt: "len([3, 6, 9, 12]) 의 결과",
      answer: "4",
      distractors: ["3", "12", "30"],
    },
  },
  {
    id: 20,
    chapter: 4,
    emoji: "📖",
    youtubeId: "UYiWSNT0TV8",
    planet: "짝꿍 사전 행성",
    title: "딕셔너리(dict): 키와 값",
    goal: "키와 값을 짝지은 딕셔너리를 만들고, 키로 값을 꺼낼 수 있어요.",
    story: "국어사전은 '단어'와 '뜻'이 짝을 이루죠? 📖\n\n파이썬 **딕셔너리**도 **키(key)** 와 **값(value)** 을 짝지어 저장해요. 중괄호 **{ }** 를 쓰고, 키와 값 사이에 콜론(:)을 넣어요.\n\n`profile = {\"이름\": \"지안\", \"나이\": 10}`\n\n`profile[\"이름\"]` 으로 \"지안\"을 꺼낼 수 있어요. 리스트는 번호로, 딕셔너리는 키로 찾아요!",
    keyPoints: [
      "딕셔너리: {키: 값, 키: 값} 형태, 중괄호 { } 사용",
      "딕셔너리[키] 로 값을 꺼내요.",
      "리스트는 번호(인덱스)로, 딕셔너리는 키로 찾아요.",
    ],
    instructions: [
      "profile = {\"이름\": \"지안\", \"나이\": 10} 을 적어요.",
      "print(profile[\"이름\"]) 으로 이름을 출력해요.",
      "print(profile[\"나이\"]) 로 나이를 출력해요.",
    ],
    starterCode: "# 1. 이름과 나이가 든 profile 딕셔너리를 만들어 보세요.\n# 2. profile 에서 \"이름\"을 꺼내 출력해 보세요.\n# 3. profile 에서 \"나이\"를 꺼내 출력해 보세요.\n",
    solution: "profile = {\"이름\": \"지안\", \"나이\": 10}\nprint(profile[\"이름\"])\nprint(profile[\"나이\"])\n",
    hints: [
      "키와 값 사이에는 콜론(:), 짝과 짝 사이에는 쉼표(,)를 넣어요.",
      "키를 꺼낼 때도 따옴표를 써요: profile[\"이름\"]",
    ],
    check: ({ code, lines }) => {
      if (!/profile\s*=\s*\{/.test(code)) return "profile = { ... } 로 딕셔너리를 만들어 보세요.";
      if (!/profile\[\s*["']이름["']\s*\]/.test(code)) return "profile[\"이름\"] 으로 값을 꺼내 보세요.";
      if (!lines.includes("지안")) return "이름 지안이 출력되어야 해요.";
      if (!lines.includes("10")) return "profile[\"나이\"] 로 나이 10도 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "딕셔너리를 만들 때 쓰는 괄호는?",
        options: ["중괄호 { }", "대괄호 [ ]", "소괄호 ( )"],
        answer: "중괄호 { }",
        feedback: "정답! 리스트는 [ ], 딕셔너리는 { } 예요. 📖",
      },
      {
        question: "pet = {\"이름\": \"콩이\"} 에서 \"콩이\"를 꺼내는 코드는?",
        options: ["pet[\"이름\"]", "pet[0]", "pet[\"콩이\"]"],
        answer: "pet[\"이름\"]",
        feedback: "딩동댕! 딕셔너리는 번호가 아니라 키로 찾아요. 🔑",
      },
    ],
    challenge: "profile[\"꿈\"] = \"우주비행사\" 를 추가한 뒤 print(profile) 을 해 보세요.",
    miniGame: {
      type: "code-defense",
      title: "딕셔너리 감별 디펜스",
      description: "다가오는 값이 딕셔너리면 [사전 대포], 아니면 [다른 값 대포]를 쏘세요!",
      cannons: [
        { id: "dict", label: "📖 사전 대포" },
        { id: "other", label: "🔹 다른 값 대포" },
      ],
      enemies: [
        { label: "{\"이름\": \"지안\"}", type: "dict" },
        { label: "[1, 2, 3]", type: "other" },
        { label: "{\"나이\": 10}", type: "dict" },
        { label: "\"파이썬\"", type: "other" },
        { label: "{}", type: "dict" },
      ],
    },
  },
  {
    id: 21,
    chapter: 4,
    emoji: "🐶",
    youtubeId: "GEOhLyW5uuo",
    planet: "사전 연습 행성",
    title: "딕셔너리 연습문제",
    goal: "딕셔너리의 값을 꺼내고, 새 키를 추가하고, 값을 바꿀 수 있어요.",
    story: "우주선에 함께 탄 강아지 콩이의 정보 카드를 정리해 봐요. 🐶\n\n딕셔너리에 새 정보를 추가하거나 값을 바꿀 때는 `사전[키] = 값` 을 써요. 키가 없으면 새로 생기고, 있으면 값이 바뀌어요!",
    keyPoints: [
      "사전[새 키] = 값 → 새 짝 추가",
      "사전[있는 키] = 값 → 값 바꾸기",
      "없는 키를 꺼내면 KeyError가 나요.",
    ],
    instructions: [
      "print(pet[\"나이\"]) 로 콩이의 나이를 출력해요.",
      "pet[\"종류\"] = \"강아지\" 로 새 정보를 추가해요.",
      "pet[\"나이\"] = 4 로 나이를 한 살 올려요.",
      "print(pet) 로 정보 카드 전체를 출력해요.",
    ],
    starterCode: "pet = {\"이름\": \"콩이\", \"나이\": 3}\n# 1. 콩이의 나이를 출력해 보세요.\n# 2. \"종류\" 키에 \"강아지\"를 추가해 보세요.\n# 3. \"나이\"를 4로 바꿔 보세요.\n# 4. pet 전체를 출력해 보세요.\n",
    solution: "pet = {\"이름\": \"콩이\", \"나이\": 3}\nprint(pet[\"나이\"])\npet[\"종류\"] = \"강아지\"\npet[\"나이\"] = 4\nprint(pet)\n",
    hints: [
      "추가와 바꾸기는 모양이 같아요: pet[\"키\"] = 값",
      "숫자 값에는 따옴표를 붙이지 않아요: pet[\"나이\"] = 4",
    ],
    check: ({ lines, out }) => {
      if (!lines.includes("3")) return "먼저 print(pet[\"나이\"]) 로 나이 3을 출력해 보세요.";
      if (!out.includes("'종류': '강아지'")) return "pet[\"종류\"] = \"강아지\" 로 새 정보를 추가하고 pet 을 출력해 보세요.";
      if (!out.includes("'나이': 4")) return "pet[\"나이\"] = 4 로 나이를 바꿔 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "딕셔너리에서 키(key)와 짝을 이루는 데이터를 무엇이라고 할까요?",
        options: ["값 (value)", "인덱스 (index)", "상자 (box)"],
        answer: "값 (value)",
        feedback: "정답! 딕셔너리는 '키: 값' 짝으로 저장돼요. 📖",
      },
      {
        question: "d = {\"a\": 1} 에서 d[\"a\"] = 5 를 실행하면?",
        options: ["{\"a\": 5}", "{\"a\": 1, \"a\": 5}", "에러"],
        answer: "{\"a\": 5}",
        feedback: "딩동댕! 같은 키가 이미 있으면 값이 바뀌어요. 키는 겹치지 않아요. 🔄",
      },
    ],
    challenge: "print(pet.keys()) 와 print(pet.values()) 를 실행해 보세요.",
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "사전 찾기 풍선",
      description: "pet = {\"이름\": \"콩이\", \"나이\": 3} 에서 \"콩이\"를 꺼내는 코드 풍선을 터트려요!",
      prompt: "\"콩이\" 를 꺼내는 코드",
      answer: "pet[\"이름\"]",
      distractors: ["pet[0]", "pet[\"콩이\"]", "pet[이름]"],
    },
  },

  // ───────────────────────── 5단원: 조건문 ─────────────────────────
  {
    id: 22,
    chapter: 5,
    emoji: "🚧",
    youtubeId: "iVtlLTq3fto",
    planet: "우주 관문 행성",
    title: "if 조건문 (1)",
    goal: "if 문으로 조건이 참일 때만 실행되는 코드를 만들 수 있어요.",
    story: "만약(if) 우주선 앞에 장애물이 가까우면 경보를 울려야 해요! 🚧\n\n`if 조건:` 다음 줄을 **들여 쓰면(스페이스 4칸 또는 Tab)** 그 줄은 조건이 참일 때만 실행돼요.\n\n```\nif distance < 5:\n    print(\"삐삐!\")\n```\n\n콜론(:)과 들여쓰기, 두 가지를 꼭 기억해요!",
    keyPoints: [
      "if 조건: → 조건이 True일 때만 들여 쓴 코드가 실행돼요.",
      "if 줄 끝에는 콜론(:)을 꼭 붙여요.",
      "if 안의 코드는 스페이스 4칸(또는 Tab)만큼 들여 써요.",
    ],
    instructions: [
      "distance = 3 이 준비되어 있어요.",
      "if distance < 5: 아래 들여 쓴 칸에 print(\"삐삐!\") 를 적어요.",
      "실행해서 경보가 울리는지 확인한 뒤, distance 를 10으로 바꿔 다시 실행해 봐요.",
    ],
    starterCode: "distance = 3\n# distance가 5보다 작으면 \"삐삐!\"를 출력하도록 완성해 보세요.\nif distance < 5:\n    \n",
    solution: "distance = 3\nif distance < 5:\n    print(\"삐삐!\")\n",
    hints: [
      "print 앞에 스페이스 4칸이 있어야 if 안의 코드가 돼요.",
      "코드 창에서 Tab 키를 누르면 스페이스 4칸이 들어가요.",
    ],
    check: ({ code, lines }) => {
      if (!/if\s+.+:/.test(code)) return "if 조건: 형태로 조건문을 만들어 주세요.";
      if (!/\n[ \t]+print\(/.test(code)) return "print 를 if 아래에 들여 써서 넣어 주세요.";
      if (!lines.includes("삐삐!")) return "distance = 3 일 때 \"삐삐!\"가 출력되어야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "if 조건 아래에서 실행될 코드는 어떻게 적어야 할까요?",
        options: ["스페이스 4칸(또는 Tab)만큼 들여 쓴다", "if와 같은 줄 맨 앞에 맞춘다", "괄호 ( ) 로 감싼다"],
        answer: "스페이스 4칸(또는 Tab)만큼 들여 쓴다",
        feedback: "훌륭해요! 들여쓰기가 '이 코드는 if 방 안에 있어요'라는 표시예요. 🚧",
      },
      {
        question: "distance = 10 일 때 if distance < 5: 아래의 print는?",
        options: ["실행되지 않아요", "실행돼요", "에러가 나요"],
        answer: "실행되지 않아요",
        feedback: "정답! 10 < 5 는 False라서 if 방 문이 열리지 않아요. 🔒",
      },
    ],
    challenge: "if 아래에 두 번째 들여 쓴 줄 print(\"속도를 줄여요!\") 를 추가해 보세요. 둘 다 조건이 참일 때만 나와요.",
    scratch: { block: "[만약 <distance < 5> (이)라면]", color: SCRATCH.control, text: "if 문은 노란색 [만약 ~(이)라면] 블록과 같아요. 블록 안쪽 = 들여 쓴 코드예요!" },
    miniGame: {
      type: "rhythm-beat",
      title: "if 관문 리듬 비트",
      description: "distance = 3 일 때 각 조건이 참이면 O, 거짓이면 X!",
      beats: [
        { expr: "distance < 5", context: "distance = 3", expect: "O" },
        { expr: "distance > 10", context: "distance = 3", expect: "X" },
        { expr: "distance == 3", context: "distance = 3", expect: "O" },
        { expr: "distance >= 4", context: "distance = 3", expect: "X" },
      ],
    },
  },
  {
    id: 23,
    chapter: 5,
    emoji: "🛂",
    youtubeId: "MWhp8_oimKM",
    planet: "우주 검사소 행성",
    title: "if 조건문 (2): else",
    goal: "if-else로 조건이 참일 때와 거짓일 때 다른 코드를 실행할 수 있어요.",
    story: "에너지가 충분하면 출발하고, **그렇지 않으면(else)** 충전해야 해요! 🛂\n\n```\nif energy >= 50:\n    print(\"출발!\")\nelse:\n    print(\"충전 필요\")\n```\n\n둘 중 **딱 한쪽만** 실행돼요. else 뒤에도 콜론(:)을 붙이고, if와 else는 같은 줄에 맞춰 써요.",
    keyPoints: [
      "if 조건이 True → if 방, False → else 방이 실행돼요.",
      "else 에는 조건을 적지 않아요. else: 만!",
      "if 와 else 는 시작 위치(들여쓰기)를 똑같이 맞춰요.",
    ],
    instructions: [
      "if 방에 print(\"출발!\") 을 들여 써요.",
      "else 방에 print(\"충전 필요\") 를 들여 써요.",
      "energy 를 30으로 바꿔서도 실행해 보고 결과를 비교해요.",
    ],
    starterCode: "energy = 80\n# 에너지가 50 이상이면 \"출발!\", 아니면 \"충전 필요\"를 출력하도록 완성해 보세요.\nif energy >= 50:\n    \nelse:\n    \n",
    solution: "energy = 80\nif energy >= 50:\n    print(\"출발!\")\nelse:\n    print(\"충전 필요\")\n",
    hints: [
      "if 아래와 else 아래 모두 스페이스 4칸 들여쓰기!",
      "else 뒤에는 조건 없이 콜론만: else:",
    ],
    check: ({ code, lines }) => {
      if (!/else\s*:/.test(code)) return "else: 를 사용해 반대 경우를 만들어 주세요.";
      if (!code.includes("충전 필요")) return "else 방에 print(\"충전 필요\") 를 넣어 주세요.";
      if (lines.includes("충전 필요")) return "energy 가 50 이상이면 \"출발!\"만 나와야 해요. 조건과 energy 값을 확인해 보세요.";
      if (!lines.includes("출발!")) return "energy = 80 일 때 \"출발!\"이 출력되어야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "if 조건이 거짓일 때 실행할 코드를 넣는 곳은?",
        options: ["else", "if", "print"],
        answer: "else",
        feedback: "정답! else는 '그렇지 않으면'이라는 뜻이에요. 🛂",
      },
      {
        question: "if-else 에서 if 방과 else 방은 몇 개가 실행될까요?",
        options: ["둘 중 하나만", "둘 다", "하나도 안 돼요"],
        answer: "둘 중 하나만",
        feedback: "딩동댕! 갈림길처럼 한쪽 길만 선택돼요. 🛤️",
      },
    ],
    challenge: "energy = int(input(\"에너지는? \")) 로 바꿔서 여러 숫자를 넣어 보세요.",
    scratch: { block: "[만약 <energy ≥ 50> (이)라면 / 아니면]", color: SCRATCH.control, text: "if-else 는 [만약 ~(이)라면 / 아니면] 블록과 같아요!" },
    miniGame: {
      type: "rhythm-beat",
      title: "두 갈래 리듬 비트",
      description: "energy = 80 일 때 각 조건이 참이면 O, 거짓이면 X!",
      beats: [
        { expr: "energy >= 50", context: "energy = 80", expect: "O" },
        { expr: "energy < 50", context: "energy = 80", expect: "X" },
        { expr: "energy == 80", context: "energy = 80", expect: "O" },
        { expr: "energy != 80", context: "energy = 80", expect: "X" },
      ],
    },
  },
  {
    id: 24,
    chapter: 5,
    emoji: "🏅",
    youtubeId: "9oH3IyG6DAI",
    planet: "관문 연습 행성",
    title: "if 조건문 연습문제: elif",
    goal: "elif로 세 갈래 이상의 조건을 순서대로 검사할 수 있어요.",
    story: "우주 경주 점수에 따라 메달을 나눠 줘요! 🏅\n\n- 90점 이상 → 금메달\n- 70점 이상 → 은메달\n- 그 밖 → 동메달\n\n갈림길이 세 개 이상이면 **elif**(else if의 줄임말)를 써요. 위에서부터 차례로 검사하다가 처음 참인 곳 **하나만** 실행돼요.",
    keyPoints: [
      "if → elif → elif … → else 순서로 써요.",
      "위에서부터 검사해서 처음 True인 방 하나만 실행돼요.",
      "그래서 큰 기준(90)을 먼저 검사해요.",
    ],
    instructions: [
      "if score >= 90: 아래 elif score >= 70: 을 추가하고 \"은메달\"을 출력해요.",
      "else: 를 추가하고 \"동메달\"을 출력해요.",
      "score = 85 이니 은메달이 나와야 해요. 95, 50 으로도 바꿔 실행해 봐요!",
    ],
    starterCode: "score = 85\nif score >= 90:\n    print(\"금메달\")\n# 아래에 elif 와 else 를 완성해 보세요.\n",
    solution: "score = 85\nif score >= 90:\n    print(\"금메달\")\nelif score >= 70:\n    print(\"은메달\")\nelse:\n    print(\"동메달\")\n",
    hints: [
      "elif 도 끝에 콜론(:)이 필요해요: elif score >= 70:",
      "elif 와 else 는 if 와 같은 위치(맨 앞)에서 시작해요.",
    ],
    check: ({ code, lines }) => {
      if (!/elif\s+.+:/.test(code)) return "elif score >= 70: 을 추가해 보세요.";
      if (!/else\s*:/.test(code) || !code.includes("동메달")) return "else: 아래에 print(\"동메달\") 을 추가해 보세요.";
      if (lines.join(",") !== "은메달") return "score = 85 일 때 \"은메달\" 한 줄만 출력되어야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "if 다음에 '아니면, 또 다른 조건이라면'을 뜻하는 파이썬 키워드는?",
        options: ["elif", "else if", "elseif"],
        answer: "elif",
        feedback: "딩동댕! 파이썬은 else if 를 줄여서 elif 라고 써요. ⭐",
      },
      {
        question: "score = 95 일 때 위 메달 코드는 무엇을 출력할까요?",
        options: ["금메달", "금메달, 은메달", "은메달"],
        answer: "금메달",
        feedback: "정답! 처음 참인 if 하나만 실행되고 나머지는 건너뛰어요. 🥇",
      },
    ],
    challenge: "score = int(input(\"점수는? \")) 로 입력받아 메달을 알려 주는 프로그램으로 바꿔 보세요.",
    scratch: { block: "[만약 ~ 라면 / 아니면 [만약 ~ 라면 / 아니면]]", color: SCRATCH.control, text: "스크래치에서 [만약/아니면] 블록을 겹겹이 넣던 것을 파이썬은 elif 로 깔끔하게 써요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "메달 예측 풍선",
      description: "score = 85 일 때 메달 코드가 출력하는 값의 풍선을 터트려요!",
      prompt: "score = 85 의 결과",
      answer: "은메달",
      distractors: ["금메달", "동메달", "메달없음"],
    },
  },

  // ───────────────────────── 6단원: 반복문 ─────────────────────────
  {
    id: 25,
    chapter: 6,
    emoji: "🎠",
    youtubeId: "s3zytXUNgfo",
    planet: "회전목마 행성",
    title: "while 반복문 (1)",
    goal: "while 문으로 조건이 참인 동안 코드를 반복할 수 있어요.",
    story: "회전목마는 음악이 나오는 **동안(while)** 계속 돌아요. 🎠\n\n`while 조건:` 은 조건이 True인 동안 들여 쓴 코드를 계속 반복해요.\n\n반복할 때마다 `count = count + 1` 로 숫자를 키워 주지 않으면 조건이 영원히 True라서 **무한 루프**에 빠져요! (이 앱은 무한 루프를 자동으로 멈춰 줘요.)",
    keyPoints: [
      "while 조건: → 조건이 True인 동안 반복",
      "반복 안에서 조건을 바꾸는 코드가 꼭 있어야 해요.",
      "count = count + 1 은 count 를 1 늘려요. (count += 1 과 같아요)",
    ],
    instructions: [
      "while count <= 3: 아래에 print(count) 를 들여 써요.",
      "그 아래에 count = count + 1 을 같은 칸으로 들여 써요.",
      "1, 2, 3 이 출력되고 반복이 끝나는지 확인해요.",
    ],
    starterCode: "count = 1\n# count가 3 이하인 동안 count를 출력하고 1씩 늘리도록 완성해 보세요.\nwhile count <= 3:\n    \n",
    solution: "count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1\n",
    hints: [
      "print(count) 와 count = count + 1 둘 다 들여 써야 반복 안에 들어가요.",
      "count = count + 1 을 빠뜨리면 무한 루프가 돼요!",
    ],
    check: ({ code, lines }) => {
      if (!/while\s+.+:/.test(code)) return "while 조건: 으로 반복문을 만들어 주세요.";
      if (lines.join(",") !== "1,2,3") return "1, 2, 3 이 한 줄씩 출력되어야 해요. count 를 출력한 뒤 1 늘려 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "while 문에서 조건이 항상 True라서 끝나지 않는 현상은?",
        options: ["무한 루프", "인덱스 에러", "들여쓰기"],
        answer: "무한 루프",
        feedback: "딩동댕! 조건을 언젠가 False로 만드는 코드가 꼭 필요해요. 🌀",
      },
      {
        question: "n = 0 에서 while n < 3: 아래 n = n + 1 만 있다면 몇 번 반복할까요?",
        options: ["3번", "4번", "무한 번"],
        answer: "3번",
        feedback: "정답! n이 0, 1, 2 일 때 반복하고 3이 되면 멈춰요. 🔁",
      },
    ],
    challenge: "while 조건을 count <= 10 으로 바꾸고, print(count * 2) 로 2의 배수를 출력해 보세요.",
    scratch: { block: "[<count > 3> 까지 반복하기]", color: SCRATCH.control, text: "주의! 스크래치 [~까지 반복하기]는 조건이 참이 되면 멈추고, 파이썬 while 은 조건이 참인 동안 돌아요. 조건이 반대예요!" },
    miniGame: {
      type: "rhythm-beat",
      title: "while 조건 리듬 비트",
      description: "n = 5 일 때 while 조건이 참(반복 계속)이면 O, 거짓(반복 끝)이면 X!",
      beats: [
        { expr: "n < 10", context: "n = 5", expect: "O" },
        { expr: "n > 10", context: "n = 5", expect: "X" },
        { expr: "n == 5", context: "n = 5", expect: "O" },
        { expr: "n <= 4", context: "n = 5", expect: "X" },
      ],
    },
  },
  {
    id: 26,
    chapter: 6,
    emoji: "🚨",
    youtubeId: "tSD24uVvwIQ",
    planet: "비상 탈출 행성",
    title: "while 반복문 (2): break",
    goal: "break로 반복문을 중간에 빠져나올 수 있어요.",
    story: "회전목마를 타다가 어지러우면 바로 내려야 해요! 🚨\n\n**break** 는 반복문을 즉시 멈추고 밖으로 나가는 비상 버튼이에요.\n\n`while True:` 는 원래 영원히 도는 반복이지만, 안에 `if ...: break` 를 넣으면 원하는 순간에 탈출할 수 있어요.",
    keyPoints: [
      "break : 반복문을 즉시 빠져나가요.",
      "while True: + if 조건: break 는 자주 쓰는 모양이에요.",
      "break 도 if 안에 있으니 한 번 더 들여 써요.",
    ],
    instructions: [
      "if count == 3: 아래 들여 쓴 칸에 break 를 적어요.",
      "1, 2, 3까지만 출력되고 멈추는지 확인해요.",
    ],
    starterCode: "count = 1\nwhile True:\n    print(count)\n    if count == 3:\n        \n    count = count + 1\n",
    solution: "count = 1\nwhile True:\n    print(count)\n    if count == 3:\n        break\n    count = count + 1\n",
    hints: [
      "break 는 if 보다 한 칸 더(스페이스 8칸) 들여 써요.",
      "break 는 모두 소문자예요.",
    ],
    check: ({ code, lines }) => {
      if (!/\bbreak\b/.test(code)) return "if count == 3: 아래에 break 를 넣어 주세요.";
      if (lines.join(",") !== "1,2,3") return "1, 2, 3 까지만 출력되고 멈춰야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "반복문을 즉시 멈추고 빠져나오는 명령어는?",
        options: ["break", "exit", "stop"],
        answer: "break",
        feedback: "정답! break는 '부수다'라는 뜻이에요. 반복을 부수고 탈출! 💥",
      },
      {
        question: "break 가 실행되면 그다음에 실행되는 곳은?",
        options: ["반복문 바로 다음 코드", "반복문 맨 처음", "프로그램이 완전히 꺼져요"],
        answer: "반복문 바로 다음 코드",
        feedback: "딩동댕! 반복문 밖으로 나와서 다음 줄부터 이어서 실행돼요. 🚪",
      },
    ],
    challenge: "반복문 밖 맨 아래에 print(\"탈출 성공!\") 을 추가해 보세요. 언제 출력되나요?",
    scratch: { block: "[멈추기 (이 스크립트 ▾)]", color: SCRATCH.control, text: "break는 [멈추기] 블록과 비슷하지만, 프로그램 전체가 아니라 반복문만 빠져나와요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "탈출 버튼 풍선",
      description: "반복문을 빠져나오는 주문 'break' 철자 풍선을 순서대로 터트려요!",
      word: "break",
    },
  },
  {
    id: 27,
    chapter: 6,
    emoji: "🚀",
    youtubeId: "X0U-00O2kG0",
    planet: "카운트다운 행성",
    title: "while 반복문 연습문제",
    goal: "while 문으로 숫자를 줄여 가며 카운트다운 프로그램을 만들 수 있어요.",
    story: "드디어 우주선 발사 시간! 🚀\n\n5, 4, 3, 2, 1 을 세고 \"발사!\"를 외치는 카운트다운 프로그램을 만들어 봐요.\n\n이번에는 숫자를 **줄여** 가며 반복해요. 막히면 [📺 영상]에서 27강 풀이를 참고해요!",
    keyPoints: [
      "n = n - 1 로 숫자를 1씩 줄일 수 있어요.",
      "반복이 끝난 뒤의 코드는 들여 쓰지 않아요.",
    ],
    instructions: [
      "while n > 0: 아래에 print(n) 과 n = n - 1 을 들여 써요.",
      "반복문이 끝난 뒤(들여쓰기 없이) print(\"발사!\") 를 적어요.",
      "5 4 3 2 1 발사! 순서로 나오는지 확인해요.",
    ],
    starterCode: "n = 5\n# n이 0보다 큰 동안 n을 출력하고 1씩 줄여 보세요.\n\n# 반복이 끝나면 \"발사!\"를 출력해 보세요.\n",
    solution: "n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint(\"발사!\")\n",
    hints: [
      "while n > 0: 다음 줄부터 들여 써요.",
      "print(\"발사!\") 를 들여 쓰면 매번 발사돼요. 맨 앞에서 시작해야 해요!",
    ],
    check: ({ code, lines }) => {
      if (!/while\s+.+:/.test(code)) return "while 문으로 카운트다운을 만들어 주세요.";
      if (lines.join(",") !== "5,4,3,2,1,발사!") return "5, 4, 3, 2, 1, 발사! 가 한 줄씩 순서대로 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "while 문 조건이 항상 True라서 끝나지 않는 상태는?",
        options: ["무한 루프", "카운트다운", "들여쓰기"],
        answer: "무한 루프",
        feedback: "정답! 이번 코드에서는 n = n - 1 이 무한 루프를 막아 줘요. 🌀",
      },
      {
        question: "위 카운트다운에서 반복이 끝날 때 n 의 값은?",
        options: ["0", "1", "5"],
        answer: "0",
        feedback: "딩동댕! n이 0이 되면 n > 0 이 False라서 반복이 끝나요. 🛑",
      },
    ],
    challenge: "n = 10 에서 시작해서 2씩 줄여 보세요. (n = n - 2)",
    scratch: { block: "[<n = 0> 까지 반복하기] + [n 을(를) -1 만큼 바꾸기]", color: SCRATCH.control, text: "n = n - 1 은 스크래치의 [변수를 -1 만큼 바꾸기] 블록과 같아요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "카운트다운 풍선",
      description: "n = 3 에서 while n > 0: print(n); n = n - 1 을 실행하면 마지막으로 출력되는 숫자는?",
      prompt: "마지막으로 출력되는 숫자",
      answer: "1",
      distractors: ["0", "3", "2"],
    },
  },
  {
    id: 28,
    chapter: 6,
    emoji: "⭐",
    youtubeId: "H0VfBU_ql80",
    planet: "은하수 행성",
    title: "for 반복문 (1): range",
    goal: "for와 range()로 정해진 횟수만큼 반복할 수 있어요.",
    story: "같은 일을 **정해진 횟수만큼** 반복할 때는 **for** 가 편해요. 🌀\n\n`for i in range(5):` 는 아래 코드를 정확히 5번 반복해요. 이때 i 에는 0, 1, 2, 3, 4 가 차례로 들어가요.\n\nwhile처럼 숫자를 직접 늘릴 필요가 없어서 무한 루프 걱정도 없어요!",
    keyPoints: [
      "for i in range(5): → 5번 반복, i는 0~4",
      "range(1, 6) → 1, 2, 3, 4, 5 (끝 숫자 6은 포함 안 함)",
      "횟수가 정해져 있으면 for, 조건으로 멈추면 while",
    ],
    instructions: [
      "for i in range(5): 아래에 print(\"★\") 를 들여 써서 별 5개를 출력해요.",
      "그 아래(들여쓰기 없이) for i in range(1, 4): 를 쓰고 print(i) 를 들여 써요.",
      "1, 2, 3 이 나오는지 확인해요. (4는 안 나와요!)",
    ],
    starterCode: "# 1. 별(★)을 5번 출력해 보세요.\nfor i in range(5):\n    \n\n# 2. range(1, 4)로 1, 2, 3을 출력해 보세요.\n",
    solution: "for i in range(5):\n    print(\"★\")\n\nfor i in range(1, 4):\n    print(i)\n",
    hints: [
      "for 아래 코드는 들여 써야 반복돼요.",
      "range(1, 4) 는 4 직전인 3까지만 만들어요.",
    ],
    check: ({ code, lines }) => {
      if (!/for\s+\w+\s+in\s+range\(/.test(code)) return "for i in range(5): 로 반복문을 만들어 주세요.";
      if (lines.filter((l) => l === "★").length !== 5) return "별(★)이 한 줄에 하나씩 정확히 5개 출력되어야 해요.";
      if (lines.filter((l) => l !== "★").join(",") !== "1,2,3") return "range(1, 4) 로 1, 2, 3 을 한 줄씩 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "for i in range(5): 아래 코드는 몇 번 실행될까요?",
        options: ["5번", "4번", "6번"],
        answer: "5번",
        feedback: "정답! range(5)는 0부터 4까지 다섯 개의 숫자를 만들어요. 🌀",
      },
      {
        question: "range(2, 5) 가 만드는 숫자는?",
        options: ["2, 3, 4", "2, 3, 4, 5", "3, 4, 5"],
        answer: "2, 3, 4",
        feedback: "딩동댕! 끝 숫자 5는 포함하지 않아요. ⚙️",
      },
    ],
    challenge: "for i in range(1, 6): 아래에 print(\"★\" * i) 를 넣어 별 계단을 만들어 보세요.",
    scratch: { block: "[(5) 번 반복하기]", color: SCRATCH.control, text: "for i in range(5): 는 노란색 [5번 반복하기] 블록과 같아요. 덤으로 i 에 몇 번째인지가 들어가요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "별 반복 풍선",
      description: "for 문이 3번 반복되어 별 3개(★★★)를 만들도록 별 풍선만 3개 터트려요! 폭탄은 피해요.",
      word: "★★★",
      fakes: ["💀", "💣", "🚫"],
    },
  },
  {
    id: 29,
    chapter: 6,
    emoji: "🧺",
    youtubeId: "eK3hFX9VYCU",
    planet: "바구니 훑기 행성",
    title: "for 반복문 (2): 리스트 순회",
    goal: "for 문으로 리스트의 값을 하나씩 꺼내 처리할 수 있어요.",
    story: "바구니 속 과일을 하나씩 다 꺼내 보고 싶을 때가 있죠? 🧺\n\n`for fruit in fruits:` 라고 쓰면 fruits 에서 값을 하나씩 꺼내 **fruit** 에 넣고 반복해요.\n\n인덱스를 몰라도 처음부터 끝까지 빠짐없이 꺼낼 수 있어요!",
    keyPoints: [
      "for 변수 in 리스트: → 리스트 값을 하나씩 변수에 넣고 반복",
      "리스트 이름은 복수형(fruits), 꺼낸 하나는 단수형(fruit)으로 지으면 읽기 쉬워요.",
      "문자열도 for 로 한 글자씩 꺼낼 수 있어요.",
    ],
    instructions: [
      "for fruit in fruits: 아래에 print(fruit) 를 들여 써요.",
      "사과, 바나나, 체리가 한 줄씩 나오는지 확인해요.",
      "print(fruit + \" 냠냠\") 으로 바꿔서도 실행해 봐요!",
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# fruits 의 과일을 하나씩 꺼내 출력하도록 완성해 보세요.\nfor fruit in fruits:\n    \n",
    solution: "fruits = [\"사과\", \"바나나\", \"체리\"]\nfor fruit in fruits:\n    print(fruit)\n",
    hints: [
      "for 아래의 print 는 들여 써야 해요.",
      "꺼낸 값은 fruit(단수)에 들어 있어요. print(fruits) 가 아니라 print(fruit)!",
    ],
    check: ({ code, lines }) => {
      if (!/for\s+\w+\s+in\s+fruits\s*:/.test(code)) return "for fruit in fruits: 로 반복문을 만들어 주세요.";
      if (lines.length !== 3) return "과일이 한 줄에 하나씩, 모두 3줄로 출력되어야 해요.";
      if (!lines[0].includes("사과") || !lines[1].includes("바나나") || !lines[2].includes("체리")) return "사과, 바나나, 체리 순서로 출력되어야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "for fruit in fruits: 에서 과일이 하나씩 담기는 변수는?",
        options: ["fruit", "fruits", "for"],
        answer: "fruit",
        feedback: "정답! 바구니(fruits)에서 꺼낸 하나가 fruit 에 담겨요. 🌀",
      },
      {
        question: "for ch in \"우주\": print(ch) 의 결과는?",
        options: ["우 / 주 (두 줄)", "우주 (한 줄)", "에러"],
        answer: "우 / 주 (두 줄)",
        feedback: "딩동댕! 문자열도 한 글자씩 꺼내 반복할 수 있어요. 🔤",
      },
    ],
    challenge: "total = 0 을 만들고, for n in [10, 20, 30]: 안에서 total = total + n 을 한 뒤 print(total) 해 보세요.",
    scratch: { block: "[i 를 1 로 정하기] + [(fruits 의 길이) 번 반복하기]", color: SCRATCH.control, text: "스크래치에서 번호 변수를 따로 만들어 리스트를 훑던 일을, 파이썬 for-in 은 한 줄로 해요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "순회 결과 풍선",
      description: "for x in [1, 2, 3]: print(x * 2) 를 실행하면 마지막으로 출력되는 값은?",
      prompt: "마지막으로 출력되는 값",
      answer: "6",
      distractors: ["3", "2", "9"],
    },
  },
  {
    id: 30,
    chapter: 6,
    emoji: "🔢",
    youtubeId: "ANpK1q77N2k",
    planet: "구구단 행성",
    title: "for 반복문 연습문제: 구구단",
    goal: "for와 range로 구구단을 출력하는 프로그램을 만들 수 있어요.",
    story: "우주선 계산기를 점검할 시간이에요. 구구단 2단을 출력해 봐요! 🔢\n\n`print(dan, \"x\", i, \"=\", dan * i)` 처럼 쉼표로 여러 값을 나열하면 사이사이 띄어쓰기를 넣어 함께 출력해 줘요.\n\n막히면 [📺 영상]에서 30강 풀이를 참고해요!",
    keyPoints: [
      "range(1, 10) → 1부터 9까지",
      "print(a, b, c) → 값 사이에 공백을 넣어 출력",
      "dan 값만 바꾸면 다른 단도 바로 출력돼요.",
    ],
    instructions: [
      "for i in range(1, 10): 아래에 print(dan, \"x\", i, \"=\", dan * i) 를 들여 써요.",
      "2 x 1 = 2 부터 2 x 9 = 18 까지 나오는지 확인해요.",
      "dan = 7 로 바꿔서 7단도 출력해 봐요!",
    ],
    starterCode: "dan = 2\nfor i in range(1, 10):\n    # dan 단의 i 번째 줄을 출력해 보세요. 예) 2 x 1 = 2\n    \n",
    solution: "dan = 2\nfor i in range(1, 10):\n    print(dan, \"x\", i, \"=\", dan * i)\n",
    hints: [
      "곱하기 계산은 dan * i 예요.",
      "\"x\" 와 \"=\" 는 글자라서 따옴표로 감싸요.",
    ],
    check: ({ code, lines }) => {
      if (!/for\s+\w+\s+in\s+range\(/.test(code)) return "for i in range(1, 10): 반복문을 사용해 주세요.";
      if (lines.length !== 9) return "9줄(1부터 9까지)이 출력되어야 해요. range(1, 10) 을 확인해 보세요.";
      const dan = parseInt(squash(lines[0]).split(/[x×*]/)[0], 10);
      if (!dan) return "첫 줄이 \"2 x 1 = 2\" 처럼 나와야 해요.";
      const ok = lines.every((l, idx) => {
        const s = squash(l);
        return [`${dan}x${idx + 1}=${dan * (idx + 1)}`, `${dan}×${idx + 1}=${dan * (idx + 1)}`, `${dan}*${idx + 1}=${dan * (idx + 1)}`].includes(s);
      });
      if (!ok) return "각 줄이 \"2 x 1 = 2\" 모양이고 계산이 맞아야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "range(2, 5) 가 만드는 숫자는?",
        options: ["2, 3, 4", "2, 3, 4, 5", "1, 2, 3, 4, 5"],
        answer: "2, 3, 4",
        feedback: "정답! 끝 숫자는 포함하지 않아요. ⚙️",
      },
      {
        question: "구구단 1~9를 만들려면 range 안에 무엇을 넣어야 할까요?",
        options: ["range(1, 10)", "range(1, 9)", "range(9)"],
        answer: "range(1, 10)",
        feedback: "딩동댕! 9까지 포함하려면 끝을 10으로 적어요. 🔢",
      },
    ],
    challenge: "for 안에 for 를 넣어(중첩 반복) 2단부터 9단까지 전부 출력해 보세요.",
    scratch: { block: "[i 를 1 로 정하기] + [9 번 반복하기]", color: SCRATCH.control, text: "스크래치에서 변수와 반복 블록을 조합하던 구구단을, 파이썬은 for 두 줄로 만들어요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "pick",
      title: "range 끝 숫자 풍선",
      description: "for i in range(1, 10): 에서 i 가 마지막으로 갖는 값의 풍선을 터트려요!",
      prompt: "i 의 마지막 값",
      answer: "9",
      distractors: ["10", "1", "8"],
    },
  },

  // ───────────────────────── 7단원: 함수 ─────────────────────────
  {
    id: 31,
    chapter: 7,
    emoji: "🤖",
    youtubeId: "arF4y8w838o",
    planet: "주문서 행성",
    title: "함수 (1): def로 함수 만들기",
    goal: "def로 함수를 정의하고, 이름을 불러 실행(호출)할 수 있어요.",
    story: "자주 쓰는 명령을 묶어서 **나만의 주문**으로 만들 수 있어요. 이것을 **함수**라고 해요. 🤖\n\n```\ndef hello():\n    print(\"안녕!\")\n```\n\n**def** 로 만들기만 하면 아무 일도 안 일어나요. `hello()` 처럼 **이름을 불러야(호출)** 실행돼요!",
    keyPoints: [
      "def 함수이름(): → 함수 정의 (끝에 콜론!)",
      "함수 안의 코드는 들여 써요.",
      "함수이름() 으로 호출해야 실행돼요. 여러 번 부를 수도 있어요.",
    ],
    instructions: [
      "def hello(): 를 적고, 아래에 print(\"안녕!\") 을 들여 써요.",
      "들여쓰기 없이 hello() 를 두 번 적어 함수를 두 번 호출해요.",
      "\"안녕!\"이 두 번 나오는지 확인해요.",
    ],
    starterCode: "# 1. \"안녕!\"을 출력하는 hello 함수를 만들어 보세요.\n\n# 2. hello 함수를 두 번 호출해 보세요.\n",
    solution: "def hello():\n    print(\"안녕!\")\n\nhello()\nhello()\n",
    hints: [
      "def hello(): 끝의 콜론(:)을 잊지 마요.",
      "호출할 때는 들여쓰기 없이 맨 앞에서 hello() 라고 적어요.",
    ],
    check: ({ code, lines }) => {
      if (!/def\s+hello\s*\(\s*\)\s*:/.test(code)) return "def hello(): 로 함수를 만들어 주세요.";
      if (!/^hello\(\)/m.test(code)) return "들여쓰기 없이 hello() 를 적어 함수를 호출해 주세요.";
      if (lines.filter((l) => l === "안녕!").length !== 2) return "hello() 를 두 번 호출해서 \"안녕!\"이 두 번 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "파이썬에서 새 함수를 만들 때 맨 앞에 쓰는 키워드는?",
        options: ["def", "function", "make"],
        answer: "def",
        feedback: "훌륭해요! def는 define(정의하다)의 줄임말이에요. 📜",
      },
      {
        question: "def hello(): 로 함수를 만들기만 하고 호출하지 않으면?",
        options: ["아무것도 출력되지 않아요", "자동으로 한 번 실행돼요", "에러가 나요"],
        answer: "아무것도 출력되지 않아요",
        feedback: "정답! 함수는 이름을 불러야(hello()) 실행돼요. 📣",
      },
    ],
    challenge: "우주선 발사 순서를 출력하는 launch() 함수를 직접 만들어 호출해 보세요.",
    scratch: { block: "[정의하기 hello]", color: SCRATCH.myBlocks, text: "def hello(): 는 분홍색 [나만의 블록 만들기]와 같아요. hello() 는 그 블록을 끼워 쓰는 거예요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "함수 정의 풍선",
      description: "함수를 만드는 키워드 'def' 철자 풍선을 순서대로 터트려요!",
      word: "def",
    },
  },
  {
    id: 32,
    chapter: 7,
    emoji: "🧪",
    youtubeId: "YbgAa4DKqr8",
    planet: "매개변수 행성",
    title: "함수 (2): 매개변수",
    goal: "매개변수가 있는 함수를 만들고, 값을 넣어 호출할 수 있어요.",
    story: "믹서기에 딸기를 넣으면 딸기 주스, 바나나를 넣으면 바나나 주스가 나오죠? 🍓🥤\n\n함수 괄호 안에 **재료 상자(매개변수)** 를 만들면, 부를 때마다 다른 값을 넣을 수 있어요.\n\n```\ndef greeting(name):\n    print(\"안녕 \" + name)\n\ngreeting(\"지안\")\n```",
    keyPoints: [
      "def 함수(매개변수): → 괄호 안 이름이 재료 상자",
      "함수(값) 으로 부르면 값이 매개변수에 들어가요.",
      "매개변수가 2개면 쉼표로: def add(a, b):",
    ],
    instructions: [
      "def greeting(name): 아래에 print(\"안녕 \" + name) 을 들여 써요.",
      "greeting(\"지안\") 과 greeting(\"파이디\") 를 호출해요.",
      "두 가지 인사가 나오는지 확인해요.",
    ],
    starterCode: "def greeting(name):\n    # name 을 이용해 인사말을 출력하도록 완성해 보세요.\n    \n\ngreeting(\"지안\")\n# greeting 함수를 \"파이디\"로 한 번 더 호출해 보세요.\n",
    solution: "def greeting(name):\n    print(\"안녕 \" + name)\n\ngreeting(\"지안\")\ngreeting(\"파이디\")\n",
    hints: [
      "함수 안의 print 는 들여 써요.",
      "\"안녕 \" 끝에 공백을 넣어야 '안녕 지안'처럼 띄어져요.",
    ],
    check: ({ code, lines }) => {
      if (!/def\s+greeting\s*\(\s*name\s*\)\s*:/.test(code)) return "def greeting(name): 을 그대로 두고 안쪽을 완성해 주세요.";
      if (!lines.some((l) => l.includes("안녕") && l.includes("지안"))) return "greeting(\"지안\") 의 결과로 \"안녕 지안\"이 나와야 해요.";
      if (!lines.some((l) => l.includes("안녕") && l.includes("파이디"))) return "greeting(\"파이디\") 도 호출해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "def add(a, b): 함수가 받는 매개변수는 몇 개일까요?",
        options: ["2개 (a와 b)", "1개 (ab)", "0개"],
        answer: "2개 (a와 b)",
        feedback: "정답! 쉼표로 나뉜 a, b 두 개의 재료 상자예요. 🧪",
      },
      {
        question: "def greeting(name): 이 있을 때 greeting(\"콩이\") 를 부르면 name 에는?",
        options: ["\"콩이\"", "\"name\"", "아무것도 없어요"],
        answer: "\"콩이\"",
        feedback: "딩동댕! 호출할 때 넣은 값이 매개변수 상자에 들어가요. 📦",
      },
    ],
    challenge: "def add(a, b): print(a + b) 를 만들고 add(3, 4) 를 호출해 보세요.",
    scratch: { block: "[정의하기 greeting (name)]", color: SCRATCH.myBlocks, text: "매개변수는 나만의 블록을 만들 때 추가하는 [입력값]과 같아요!" },
    miniGame: {
      type: "code-defense",
      title: "함수 호출 검사 디펜스",
      description: "def add(a, b): 함수가 있어요. 재료 2개를 정확히 넣은 호출이면 [올바름 대포], 아니면 [틀림 대포]!",
      cannons: [
        { id: "ok", label: "✅ 올바름 대포" },
        { id: "bad", label: "❌ 틀림 대포" },
      ],
      enemies: [
        { label: "add(1, 2)", type: "ok" },
        { label: "add(5)", type: "bad" },
        { label: "add(3, 4)", type: "ok" },
        { label: "add()", type: "bad" },
        { label: "add(1, 2, 3)", type: "bad" },
      ],
    },
  },
  {
    id: 33,
    chapter: 7,
    emoji: "🕵️",
    youtubeId: "Hs5gIwSdjWY",
    planet: "비밀과 공용 행성",
    title: "함수 (3): 지역변수와 전역변수",
    goal: "함수 밖의 전역변수와 함수 안의 지역변수가 쓰이는 범위를 구분할 수 있어요.",
    story: "변수에도 쓸 수 있는 **범위**가 있어요. 🕵️\n\n- **전역변수**: 함수 **밖**에서 만든 변수. 우주선 거실처럼 어디서든 볼 수 있어요.\n- **지역변수**: 함수 **안**에서 만든 변수. 그 함수 방 안에서만 쓰고, 함수가 끝나면 사라져요.\n\n그래서 함수 밖에서 지역변수를 부르면 NameError가 나요!",
    keyPoints: [
      "전역변수: 함수 밖에서 만듦 → 함수 안·밖 어디서나 읽을 수 있어요.",
      "지역변수: 함수 안에서 만듦 → 그 함수 안에서만 쓸 수 있어요.",
      "함수 밖에서 지역변수를 쓰면 NameError!",
    ],
    instructions: [
      "open_gate 함수 안에 print(unlocked) 를 들여 써서 전역변수를 출력해요.",
      "그 아래에 print(secret) 을 들여 써서 지역변수를 출력해요.",
      "도전: 맨 아래에 들여쓰기 없이 print(secret) 을 적으면 어떤 에러가 날지 예상해 봐요.",
    ],
    starterCode: "unlocked = True  # 전역변수 (함수 밖)\n\ndef open_gate():\n    secret = \"우주 암호 1234\"  # 지역변수 (함수 안)\n    # 1. 여기에서 전역변수 unlocked 를 출력해 보세요.\n    # 2. 여기에서 지역변수 secret 을 출력해 보세요.\n\nopen_gate()\n",
    solution: "unlocked = True  # 전역변수 (함수 밖)\n\ndef open_gate():\n    secret = \"우주 암호 1234\"  # 지역변수 (함수 안)\n    print(unlocked)\n    print(secret)\n\nopen_gate()\n",
    hints: [
      "두 print 모두 secret = ... 줄과 같은 칸으로 들여 써요.",
      "open_gate() 호출은 지우지 마세요!",
    ],
    check: ({ code, lines }) => {
      if (!/^open_gate\(\)/m.test(code)) return "맨 아래 open_gate() 호출이 있어야 함수가 실행돼요.";
      if (!lines.includes("True")) return "함수 안에서 print(unlocked) 로 전역변수를 출력해 보세요.";
      if (!lines.includes("우주 암호 1234")) return "함수 안에서 print(secret) 으로 지역변수를 출력해 보세요.";
      return true;
    },
    quizzes: [
      {
        question: "함수 밖에서 만들어 함수 안과 밖 모두에서 쓸 수 있는 변수는?",
        options: ["전역변수", "지역변수", "매개변수"],
        answer: "전역변수",
        feedback: "정답! 전체(global) 영역에서 쓰여서 전역변수예요. 🌍",
      },
      {
        question: "함수 안에서 만든 secret 을 함수 밖에서 print(secret) 하면?",
        options: ["NameError가 나요", "우주 암호 1234가 나와요", "None이 나와요"],
        answer: "NameError가 나요",
        feedback: "딩동댕! 지역변수는 함수가 끝나면 사라져서 밖에서는 찾을 수 없어요. 🕵️",
      },
    ],
    challenge: "함수 밖에서 print(secret) 을 실행해 보고, 파이디의 에러 안내를 읽어 보세요.",
    scratch: { block: "[변수 만들기: ○ 모든 스프라이트에서 사용 / ○ 이 스프라이트에서만 사용]", color: SCRATCH.variables, text: "스크래치에서 변수를 만들 때 고르던 '모든 스프라이트'는 전역, '이 스프라이트에서만'은 지역과 비슷해요!" },
    miniGame: {
      type: "code-defense",
      title: "지역·전역 감별 디펜스",
      description: "변수를 만든 위치를 보고, 함수 밖이면 [전역 대포], 함수 안이면 [지역 대포]를 쏘세요!",
      cannons: [
        { id: "global", label: "🌍 전역 대포" },
        { id: "local", label: "🏠 지역 대포" },
      ],
      enemies: [
        { label: "score = 0  (함수 밖)", type: "global" },
        { label: "bonus = 5  (def 안)", type: "local" },
        { label: "name = \"지안\"  (함수 밖)", type: "global" },
        { label: "temp = 1  (def 안)", type: "local" },
      ],
    },
  },
  {
    id: 34,
    chapter: 7,
    emoji: "🎓",
    youtubeId: "kNUmrq0kvRI",
    planet: "우주 졸업식",
    title: "함수 연습문제: return",
    goal: "return으로 함수의 결과값을 돌려주고, 그 값을 출력에 활용할 수 있어요.",
    story: "지안 탐험가님, 드디어 마지막 졸업 시험이에요! 🎓🎉\n\n함수가 계산한 결과를 **돌려줄** 때는 **return** 을 써요. print는 화면에 보여 주기만 하지만, return은 값을 불러준 곳으로 **배달**해서 다른 계산에도 쓸 수 있어요.\n\n숫자가 짝수인지 알려 주는 함수 **is_even(num)** 을 완성해 졸업 배지를 받아요!",
    keyPoints: [
      "return 값 : 함수를 끝내고 값을 호출한 곳으로 돌려줘요.",
      "print는 보여 주기, return은 돌려주기",
      "num % 2 == 0 이면 짝수 (2로 나눈 나머지가 0)",
    ],
    instructions: [
      "if num % 2 == 0: 아래에 return True 를 들여 써요.",
      "else: 아래에 return False 를 들여 써요.",
      "print(is_even(8)) → True, print(is_even(9)) → False 가 나오는지 확인해요.",
    ],
    starterCode: "def is_even(num):\n    # num이 짝수이면 True, 아니면 False를 돌려주도록 완성해 보세요.\n    if num % 2 == 0:\n        \n    else:\n        \n\n# 아래 테스트 코드는 지우지 마세요!\nprint(is_even(8))\nprint(is_even(9))\n",
    solution: "def is_even(num):\n    if num % 2 == 0:\n        return True\n    else:\n        return False\n\nprint(is_even(8))\nprint(is_even(9))\n",
    hints: [
      "return 은 if/else 보다 한 칸 더 들여 써요. (스페이스 8칸)",
      "True, False 는 따옴표 없이, 첫 글자 대문자로!",
    ],
    check: ({ code, lines }) => {
      if (!/\breturn\b/.test(code)) return "return 으로 결과를 돌려주세요.";
      if (!/print\(\s*is_even\(\s*8\s*\)\s*\)/.test(code) || !/print\(\s*is_even\(\s*9\s*\)\s*\)/.test(code)) return "맨 아래 테스트 코드 print(is_even(8)), print(is_even(9)) 를 지우지 마세요.";
      if (lines.join(",") !== "True,False") return "is_even(8) 은 True, is_even(9) 는 False 가 나와야 해요.";
      return true;
    },
    quizzes: [
      {
        question: "함수가 계산한 결과값을 호출한 곳으로 돌려줄 때 쓰는 키워드는?",
        options: ["return", "print", "back"],
        answer: "return",
        feedback: "정답이에요! return 덕분에 함수의 결과를 변수에 담거나 다시 계산할 수 있어요. 🎉",
      },
      {
        question: "def double(n): return n * 2 일 때 print(double(3) + 1) 의 결과는?",
        options: ["7", "6", "31"],
        answer: "7",
        feedback: "딩동댕! double(3)이 6을 돌려주고, 6 + 1 = 7 이에요. 졸업을 축하해요! 🎓",
      },
    ],
    challenge: "리스트 [1, 2, 3, 4, 5, 6] 을 for 로 돌면서 is_even() 이 True인 숫자만 출력해 보세요. 지금까지 배운 걸 모두 쓰는 졸업 작품이에요!",
    scratch: { block: "[정의하기 is_even (num)]", color: SCRATCH.myBlocks, text: "스크래치의 나만의 블록은 값을 돌려줄 수 없지만, 파이썬 함수는 return 으로 결과를 돌려줄 수 있어요!" },
    miniGame: {
      type: "balloon-pop",
      mode: "spell",
      title: "졸업 주문 풍선",
      description: "함수의 결과를 돌려주는 주문 'return' 철자 풍선을 순서대로 터트려요!",
      word: "return",
    },
  },
];

export const getLesson = (id) => lessons.find((l) => l.id === id);
export const getChapter = (id) => chapters.find((c) => c.id === id);
export const lessonsInChapter = (chapterId) => lessons.filter((l) => l.chapter === chapterId);

// 문자열 안의 # 은 남기고, 진짜 주석(# 뒤)만 지웁니다.
export function stripComments(code) {
  return code
    .split("\n")
    .map((line) => {
      let quote = null;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (quote) {
          if (ch === "\\") i++;
          else if (ch === quote) quote = null;
        } else if (ch === "\"" || ch === "'") {
          quote = ch;
        } else if (ch === "#") {
          return line.slice(0, i).trimEnd();
        }
      }
      return line;
    })
    .join("\n");
}

// 레슨 채점: 통과면 { passed: true }, 아니면 { passed: false, message }
export function gradeLesson(lesson, code, out) {
  if (!lesson.check) return { passed: true };
  const lines = (out || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const result = lesson.check({ code: stripComments(code), out: out || "", lines });
  if (result === true) return { passed: true };
  return { passed: false, message: typeof result === "string" ? result : "통과 조건을 아직 만족하지 못했어요. 임무 지침을 다시 확인해 보세요!" };
}

// 퀵 키보드 버튼: unlockAt 레슨부터 나타납니다.
export const quickKeys = [
  { code: "print()", label: "print( )", offset: 1, unlockAt: 6 },
  { code: "\"\"", label: "\" \" 따옴표", offset: 1, unlockAt: 6 },
  { code: " = ", label: "= 넣기", offset: 0, unlockAt: 7 },
  { code: " + ", label: "+", offset: 0, unlockAt: 7 },
  { code: " * ", label: "*", offset: 0, unlockAt: 10 },
  { code: "input()", label: "input( )", offset: 1, unlockAt: 9 },
  { code: "[]", label: "[ ] 인덱스·리스트", offset: 1, unlockAt: 12 },
  { code: " == ", label: "== 같다", offset: 0, unlockAt: 13 },
  { code: " and ", label: "and", offset: 0, unlockAt: 14 },
  { code: " or ", label: "or", offset: 0, unlockAt: 14 },
  { code: ".append()", label: ".append( )", offset: 1, unlockAt: 18 },
  { code: "len()", label: "len( )", offset: 1, unlockAt: 18 },
  { code: "{}", label: "{ } 사전", offset: 1, unlockAt: 20 },
  { code: ":", label: ": 콜론", offset: 0, unlockAt: 22 },
  { code: "if ", label: "if", offset: 0, unlockAt: 22 },
  { code: "else:", label: "else:", offset: 0, unlockAt: 23 },
  { code: "elif ", label: "elif", offset: 0, unlockAt: 24 },
  { code: "while ", label: "while", offset: 0, unlockAt: 25 },
  { code: "break", label: "break", offset: 0, unlockAt: 26 },
  { code: "for i in range():", label: "for … range", offset: 2, unlockAt: 28 },
  { code: "def ", label: "def", offset: 0, unlockAt: 31 },
  { code: "return ", label: "return", offset: 0, unlockAt: 34 },
];
