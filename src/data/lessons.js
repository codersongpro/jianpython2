// 초등학교 중학교 무료 파이썬 강의 "달려라 파이썬" 1강부터 34강 순서대로 정렬된 레슨 데이터 파일입니다.
// 각 레슨은 우주 탐험 스토리텔링(Planet)과 유튜브 영상 연동, 그리고 미니게임 검증 조건들을 갖추고 있습니다.

export const lessons = [
  {
    id: 1,
    youtubeId: "KR4JF47GdFM",
    isTheoryOnly: true,
    planet: "Planet Start (시작의 행성)",
    title: "프로그래밍 언어란? 🚀",
    story: "지안 탐험가님! 우주선 '달려라 파이썬호'에 탑승하신 것을 진심으로 환영해요! 🛸\n\n우리가 우주를 여행하기 전에, 우주선의 인공지능 로봇 '파이디(Pydi)'와 의사소통할 수 있어야 해요.\n\n컴퓨터 기계와 대화하기 위해 사용하는 아주 특별한 대화 약속 기호들을 바로 **'프로그래밍 언어'**라고 한답니다.\n\n영상을 시청하며 프로그래밍 언어가 무엇인지 먼저 배워볼까요?",
    instructions: [
      "우측의 1강 동영상 강의를 시청하며 프로그래밍 언어의 역할을 이해해 봐요.",
      "영상을 다 보고 난 뒤, 아래에 파이디가 출제한 개념 퀴즈를 맞추면 완료 배지를 얻을 수 있습니다!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "컴퓨터와 대화하며 우리가 원하는 명령을 내리기 위해 사용하는 특별한 대화 약속(언어)을 무엇이라고 부를까요?",
      options: ["프로그래밍 언어", "우주 외계어"],
      answer: "프로그래밍 언어",
      feedback: "딩동댕! 컴퓨터는 사람이 이해하는 글자를 읽지 못해서, 오직 프로그래밍 언어로 쓴 코드를 읽고 일을 한답니다. 🌟"
    }
  },
  {
    id: 2,
    youtubeId: "2MlLZ_RNPaI",
    isTheoryOnly: true,
    planet: "Planet Process (과정의 행성)",
    title: "마법을 부리는 과정 ⚙️",
    story: "우리가 머릿속으로 '우주선을 움직여야지!' 하고 상상한 생각을 실제 동작하는 컴퓨터 코드로 완성하기까지의 단계별 과정을 알아봐요.\n\n문제를 생각하고, 코드로 받아 적고, 최종 실행하여 결과를 얻는 것이 마법의 한 사이클이랍니다!",
    instructions: [
      "우측의 2강 튜토리얼 영상을 통해 프로그래밍이 완성되는 과정을 관찰하세요.",
      "파이디의 퀴즈 문제를 풀고 이번 정거장을 통과해 보세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "우리가 해결하고 싶은 아이디어를 컴퓨터 언어로 직접 컴퓨터에 타자로 타이핑하여 명령서를 적어주는 행동을 무엇이라고 부를까요?",
      options: ["코딩(Coding)", "블록 조립"],
      answer: "코딩(Coding)",
      feedback: "정답! 생각을 컴퓨터 언어로 번역해서 명령어로 적는 모든 과정을 '코딩'이라고 합니다! ⭐"
    }
  },
  {
    id: 3,
    youtubeId: "nJgAwvEtuM4",
    isTheoryOnly: true,
    planet: "Planet Python (파이썬 행성)",
    title: "파이썬은 어떤 언어인가요? 🐍",
    story: "우리가 배울 프로그래밍 언어의 이름은 바로 **'파이썬 (Python)'**이에요!\n\n파이썬은 문법이 사람의 대화와 아주 비슷하고 간결해서 초등학생부터 대학생, 그리고 현업 인공지능 과학자들까지 전 세계에서 가장 널리 쓰이는 마법 도구랍니다.",
    instructions: [
      "3강 영상을 보고 파이썬 언어가 가진 신기한 능력들을 구경해 보세요.",
      "퀴즈 문제를 풀고 우주선 시동 준비 단계를 마칩니다!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "우리가 공부하고 있는 언어로, 글자가 직관적이라 배우기 쉽고 전 세계적으로 가장 인기 많은 이 언어의 이름은 무엇인가요?",
      options: ["파이썬 (Python)", "뱀 코딩 (Snake)"],
      answer: "파이썬 (Python)",
      feedback: "정답입니다! 파이썬은 뱀이라는 뜻도 있어서 귀여운 비단뱀 마크를 사용한답니다. 🐍"
    }
  },
  {
    id: 4,
    youtubeId: "9wXh-eZpcAw",
    isTheoryOnly: true,
    planet: "Planet Install (설치 행성)",
    title: "컴퓨터에 파이썬 설치하기 💻",
    story: "나중에 사용자님의 진짜 컴퓨터나 노트북에서 파이썬 코딩을 하려면, 파이썬 홈페이지에서 설치 파일을 받아 설치해야 해요.\n\n미리 영상을 통해 설치 과정을 배워두면 나중에 혼자서도 척척 설치할 수 있게 될 거예요!",
    instructions: [
      "파이썬 공식 사이트에서 파이썬을 안전하게 내려받는 순서를 구경하세요.",
      "퀴즈를 가볍게 통과하여 다음 행성으로 비행을 지속하세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "윈도우나 맥 컴퓨터에 파이썬 프로그램을 무료로 안전하게 다운로드할 수 있는 파이썬의 공식 인터넷 홈페이지 주소는 어디일까요?",
      options: ["python.org", "naver.com"],
      answer: "python.org",
      feedback: "딩동댕! 공식 도메인인 python.org를 통해 누구나 무료로 정식 파이썬 프로그램을 설치할 수 있습니다! 🚀"
    }
  },
  {
    id: 5,
    youtubeId: "lf-jaEF0Dhs",
    isTheoryOnly: true,
    planet: "Planet IDLE 1 (연습창 행성 1)",
    title: "파이썬 기본 도구 IDLE 소개 🛠️",
    story: "파이썬을 설치하면 기본적으로 함께 들어오는 코딩 에디터 도구가 있어요. 이름은 **IDLE**이라고 해요.\n\nIDLE을 실행하면 맨 처음에 한 줄씩 치고 엔터를 칠 때마다 즉석에서 대답을 해주는 '대화형 쉘(Shell)' 연습장이 열린답니다. 사용법을 관람해봐요!",
    instructions: [
      "IDLE 대화창에 코드를 쳐서 바로바로 결과를 피드백받는 신기한 작동 원리를 배워보세요.",
      "퀴즈를 풀어 레벨을 완료하세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "파이썬 코드를 쳐보고 바로 반응을 볼 수 있도록 제공되는 기본 코딩 연습 환경의 이름은 무엇인가요?",
      options: ["IDLE", "스크래치"],
      answer: "IDLE",
      feedback: "훌륭해요! IDLE은 파이썬과 늘 함께 다니는 찰떡궁합 기본 코딩 에디터랍니다! 🛠️"
    }
  },
  {
    id: 6,
    youtubeId: "E6e1KuYFyW8",
    isTheoryOnly: true,
    planet: "Planet IDLE 2 (연습창 행성 2)",
    title: "새 메모장을 열어 긴 주문서 적기 📜",
    story: "한 줄씩만 대화하는 것 말고, 수십 줄의 긴 마법 소스 코드를 한꺼번에 저장해 두고 실행하고 싶을 땐 IDLE의 메모장(에디터 창)을 열어야 해요.\n\nFile -> New File을 열어 나만의 파이썬 소스 코드 파일(.py)을 만드는 과정을 학습해 봐요!",
    instructions: [
      "IDLE 에디터 메모장을 켜고 코드를 통째로 작성해 실행하는 과정을 구경하세요.",
      "퀴즈를 풀고 드디어 실전 코딩 실습 단계로 진입해 봅시다!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "IDLE 에디터 창에 긴 파이썬 코드를 다 적은 후, 이 프로그램이 실제로 실행되도록 컴퓨터에 신호를 주는 키보드 버튼은 무엇인가요?",
      options: ["F5 키", "F1 키"],
      answer: "F5 키",
      feedback: "정답! 키보드 맨 위의 F5를 누르면 작성된 코드 파일이 한 번에 쭉 컴파일 및 실행됩니다! ⚙️"
    }
  },
  {
    id: 7,
    youtubeId: "h1jaHMzaCWg",
    planet: "Planet Box (변수 마법 상자 행성)",
    title: "마법 상자 만들기! 변수(Variable)",
    story: "파이썬에서는 데이터를 보관해두는 **'이름표 마법 상자(변수)'**를 만들 수 있어요. 📦\n\n상자 앞면에 stars 같은 예쁜 이름을 붙여놓고 물건을 보관해두는 것이죠.\n\n여기서 같다(=) 기호는 수학의 '똑같다'가 아니에요!\n\n**'오른쪽의 값을 왼쪽 이름표 상자에 쏙 집어넣는 마법의 전달 벨트'**랍니다!\n\n`stars = 10` 이라고 써서 stars 상자에 별 10개를 담아볼까요?",
    instructions: [
      "첫 줄에 stars = 10 이라고 적어 10을 담아둔 stars 상자를 만드세요.",
      "그 아랫줄에 print(stars) 를 적어 상자 안에 든 보석을 꺼내 보여주세요.",
      "상자 이름을 인쇄할 때는 따옴표 옷(\"\")을 적지 않아요! 상자 이름 그대로 적어야 뚜껑이 열려요."
    ],
    starterCode: "# 1. stars 이름표 상자를 만들고 숫자 10을 대입(=)해 보세요.\n# 2. 그 아랫줄에 stars 상자를 열어 화면에 출력(print)해 보세요.\n",
    hints: {
      "NameError": "상자를 먼저 만든 다음에 열어야 해요! stars = 10 을 print(stars)보다 윗줄에 적었는지 위치를 보세요."
    },
    validation: (code, stdout) => {
      const trimmed = stdout ? stdout.trim() : "";
      return trimmed.includes("10") && code.includes("stars");
    },
    quiz: {
      question: "파이썬의 대입 기호인 같다(=) 마법 벨트가 작동하여 물건을 집어넣는 방향은 어느 쪽인가요?",
      options: ["오른쪽 값을 왼쪽 상자에 담는다.", "왼쪽 값을 오른쪽 상자에 담는다."],
      answer: "오른쪽 값을 왼쪽 상자에 담는다.",
      feedback: "딩동댕! '상자이름 = 보석' 형태로 써서 오른쪽의 선물을 왼쪽 이름의 상자에 보관한답니다. 📦"
    },
    miniGame: {
      type: "code-defense",
      title: "우주 백신 디펜스!",
      description: "기어오는 외계인 바이러스 데이터 중 숫자(정수) 바이러스만 골라 [숫자 대포]를 발사하여 물리치세요!",
      enemies: [
        { label: "10", type: "number" },
        { label: '"안녕"', type: "string" },
        { label: "500", type: "number" },
        { label: '"로봇"', type: "string" },
        { label: "77", type: "number" }
      ]
    }
  },
  {
    id: 8,
    youtubeId: "-GAttuheYhk",
    planet: "Planet Type (글자와 숫자 행성)",
    title: "이름표 만들기! 글자와 숫자",
    story: "파이썬 나라에는 **'글자(문자열)'**와 **'숫자'**가 살고 있어요.\n\n글자는 꼭 큰따옴표(\"\") 옷을 입고 다니지만, 숫자는 옷 없이 날씬하게 다녀요!\n\n옷을 입은 글자 \"30\"은 낱말이라 계산이 안 되지만, 그냥 숫자 30은 수학 계산을 할 수 있답니다.\n\n파이디의 몸무게인 **숫자 30**과 이름인 **글자 '파이디'**를 출력해볼까요?",
    instructions: [
      "첫 번째 줄에는 따옴표가 없는 숫자만 넣어 print(30) 을 적어봐요.",
      "두 번째 줄에는 따옴표 옷을 입혀서 print(\"파이디\") 를 적어봐요.",
      "숫자 30은 옷 없이 그냥 적고, 파이디 이름엔 따옴표 옷을 꼭 씌워주세요!"
    ],
    starterCode: "# 1. 첫 번째 줄에 숫자 30을 출력해 보세요.\n# 2. 두 번째 줄에 글자 \"파이디\"를 출력해 보세요.\n",
    hints: {
      "TypeError": "숫자와 글자는 섞어서 출력하면 파이썬이 헷갈려해요. 둘을 섞어 쓰진 않았는지 봐요!",
      "SyntaxError": "따옴표가 글자의 앞이나 뒤 중 한쪽에만 붙어 있는지 체크해보세요!"
    },
    validation: (code, stdout) => {
      const trimmed = stdout ? stdout.trim() : "";
      return trimmed.includes("30") && trimmed.includes("파이디");
    },
    quiz: {
      question: "큰따옴표 옷을 입지 않는 '숫자'는 글자와 무엇이 다를까요?",
      options: ["수학 계산(+ , -)을 시킬 수 있어요.", "화면에 파랗게 빛나서 예뻐요."],
      answer: "수학 계산(+ , -)을 시킬 수 있어요.",
      feedback: "정답! 따옴표를 입지 않은 순수 숫자는 파이썬이 수학 계산을 시켜서 결과를 낼 수 있답니다. ⭐"
    },
    miniGame: {
      type: "balloon-pop",
      title: "글자 풍선 소환 작전",
      description: "귀여운 마법사 로봇 파이디의 이름 'pydi'를 순서대로 터치해 소환해 주세요!",
      word: "pydi",
      balloons: ["p", "y", "d", "i"]
    }
  },
  {
    id: 9,
    youtubeId: "NZ8s1yx5kyg",
    planet: "Planet Hello (안녕 행성)",
    title: "입력과 출력! input()과 print() 💬",
    story: "지안 탐험가님! 🚀\n\n지안이가 키보드로 직접 우주선에 글자를 써 보내고(입력), 우주선이 그 글자를 화면에 그대로 대답해 주는(출력) 신기한 마법을 배워 보아요.\n\n사용자에게 글자를 키보드로 입력받는 마법 명령어는 바로 **input()** 이랍니다!\n\n받은 글자를 `name` 이라는 이름 상자에 쏙 집어넣고, 그걸 `print(name)`으로 다시 소리 내어 출력해 볼까요?",
    instructions: [
      "name = input() 이라고 적어 키보드로 입력받은 글자를 name 상자에 대입(=)하세요.",
      "그 아랫줄에 print(name) 이라고 적어 상자에 든 이름을 화면에 출력해 보세요!",
      "다 적었으면 오른쪽 아래 [주문 외우기 (실행)] 버튼을 눌러보세요!"
    ],
    starterCode: "# 1. input() 마법을 써서 키보드로 입력받은 글자를 name 상자에 대입(=)해 보세요.\n# 2. name 상자에 들어간 글자를 print()로 화면에 출력해 보세요.\n",
    hints: {
      "NameError": "앗! 혹시 name 상자나 input, print 철자가 대소문자나 오타가 났는지 확인해 보세요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().length > 0 && code.includes("input") && code.includes("name"),
    quiz: {
      question: "사용자에게 키보드로 어떤 단어나 글을 입력받기 위해 사용하는 파이썬 마법 명령어는 무엇인가요?",
      options: ["input()", "print()"],
      answer: "input()",
      feedback: "딩동댕! input()을 사용하면 사용자가 키보드로 타자를 치기 전까지 컴퓨터가 조용히 기다리며 대답을 귀 기울여 들어요! 👂"
    },
    miniGame: {
      type: "balloon-pop",
      title: "스펠링 풍선 터트리기!",
      description: "하늘에 둥실둥실 떠오르는 글자 풍선들을 마우스로 클릭해 톡! 터트려 순서대로 단어를 완성해보세요!",
      word: "print",
      balloons: ["p", "r", "i", "n", "t"]
    }
  },
  {
    id: 10,
    youtubeId: "5sXKgcSgH6o",
    planet: "Planet Math (별 계산 행성)",
    title: "숫자의 두 얼굴! 정수(int)와 실수(float) 🧮",
    story: "파이썬 나라에는 숫자가 두 종류로 나뉘어 살고 있어요! 🧮\n\n- **정수(int)**: 소수점이 없는 깨끗한 숫자(예: 5, 10, -2)예요.\n- **실수(float)**: 소수점이 졸졸 따라다니는 소수 숫자(예: 1.5, 3.14, -0.5)예요.\n\n정수 상자와 실수 상자를 더하면 결과는 소수점이 있는 실수가 된답니다. 정수 5와 실수 1.5를 더해 볼까요?",
    instructions: [
      "정수 상자 a = 5 를 첫 줄에 선언해 보세요.",
      "실수 상자 b = 1.5 를 그 아랫줄에 선언해 보세요.",
      "마지막 줄에 print(a + b) 를 작성해 두 숫자를 더한 결과를 확인해 보세요!"
    ],
    starterCode: "# 1. 정수 변수 a에 5를 대입해 보세요.\n# 2. 실수 변수 b에 1.5를 대입해 보세요.\n# 3. a와 b를 더한 값을 print()로 출력해 보세요.\n",
    hints: {
      "NameError": "변수 a와 b를 올바르게 선언하고 호출했는지 스펠링을 살펴보세요.",
      "SyntaxError": "등호(=) 기호 주변에 오타가 생기지 않았는지 점검해 보세요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("6.5") && code.includes("a =") && code.includes("b ="),
    quiz: {
      question: "소수점이 있는 소수 숫자(예: 3.14)를 뜻하는 파이썬의 숫자 자료형 명칭은 무엇인가요?",
      options: ["실수 (float)", "정수 (int)"],
      answer: "실수 (float)",
      feedback: "딩동댕! 소수점이 있는 소수는 떠돌이 소수점이라는 의미의 부동소수점, 즉 `float`형이라고 부른답니다! 🌟"
    },
    miniGame: {
      type: "balloon-pop",
      title: "수식 계산 풍선 터트리기!",
      description: "더하기 계산 결과가 12가 되는 맛있는 수식 풍선을 터트려 우주선을 충전하세요!",
      word: "12",
      balloons: ["5+7", "10-2", "9-4"]
    }
  },
  {
    id: 11,
    youtubeId: "JdlCwvVeUCc",
    planet: "Planet Speaker (우주 확성기 행성)",
    title: "우주 스피커! 글자 상자 더하기",
    story: "이름표 마법 상자에는 숫자뿐만 아니라 따옴표 옷을 입은 글자도 담아둘 수 있어요.\n\n더하기(+) 기호를 글자 상자들 사이에 쓰면, 글자 조각들을 풀칠하듯 길게 이어붙일 수 있답니다!\n\n예를 들어 `\"안녕\" + \"지안\"` 이라고 적으면 `\"안녕지안\"`이 돼요.\n\n`name` 상자에 지안이 이름을 넣고 인사말 글자와 보석을 결합해 큰 목소리로 말해봐요!",
    instructions: [
      "name = \"지안\" 이라고 적어 글자가 보관된 name 상자를 준비하세요.",
      "그 아래 print(\"안녕 \" + name) 을 적어 안녕이라는 인사말과 상자 값을 이어붙여 인쇄해보세요!"
    ],
    starterCode: "# 1. name 상자를 만들고 글자 \"지안\"을 담아보세요.\n# 2. 그 아랫줄에 \"안녕 \" 글자와 name 상자를 더해서 인쇄해보세요.\n",
    hints: {
      "NameError": "name 변수 상자의 글자를 만들 때 철자가 맞는지 확인해보고, 큰따옴표가 잘 감싸고 있는지 봐요!",
      "TypeError": "글자 상자와 숫자 상자를 바로 더하면 파이썬이 덧셈인지 풀칠인지 알 수 없어 고장 나요! 꼭 글자끼리 더해주세요."
    },
    validation: (code, stdout) => {
      const clean = stdout ? stdout.replace(/\s+/g, "") : "";
      return clean.includes("안녕지안") && code.includes("name");
    },
    quiz: {
      question: "글자 두 개를 앞뒤로 길게 하나로 이어붙여서 풀칠하고 싶을 때 사용하는 연산 기호는 무엇인가요?",
      options: ["더하기 ( + )", "빼기 ( - )"],
      answer: "더하기 ( + )",
      feedback: "정답! 글자와 글자 사이에 + 기호를 쓰면 두 글자가 찰떡같이 결합된 하나의 큰 글자가 돼요! ✨"
    },
    miniGame: {
      type: "code-defense",
      title: "글자 백신 대포 디펜스",
      description: "우측 침입자 중 따옴표 옷을 입은 글자(문자열) 바이러스만 골라 [글자 대포]로 파괴하세요!",
      enemies: [
        { label: '"우주선"', type: "string" },
        { label: "123", type: "number" },
        { label: '"별나라"', type: "string" },
        { label: "9", type: "number" },
        { label: '"파이디"', type: "string" }
      ]
    }
  },
  {
    id: 12,
    youtubeId: "A-rwQQGgFVM",
    planet: "Planet StrIndex (문자 인덱싱 행성)",
    title: "글자 속 보물 찾기! 문자열 인덱싱",
    story: "글자 상자 안에 들어있는 각각의 낱글자에도 방 번호가 매겨져 있답니다!\n\n그런데 컴퓨터는 방 번호를 1번이 아닌 **0번 방부터** 세는 버릇이 있어요. 이를 **'인덱스(Index)'**라고 합니다.\n\n`word = \"우주선\"` 상자에서 0번 방인 `word[0]` 을 부르면 첫 글자인 `\"우\"`가 나온답니다. 첫 글자를 꺼내볼까요?",
    instructions: [
      "이미 word = \"우주선\" 상자가 제공됩니다.",
      "print(word[0]) 을 작성하여 첫 번째 글자를 화면에 출력해 보세요!"
    ],
    starterCode: "word = \"우주선\"\n# 아래에 word 변수에서 첫 번째 글자(인덱스 0)를 출력해 보세요.\n",
    hints: {
      "IndexError": "글자 수보다 큰 번호를 지정하면 컴퓨터가 당황해요! 0번을 써주세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("우") && code.includes("[0]"),
    quiz: {
      question: "`word = \"hello\"` 가 있을 때, 세 번째 알파벳인 'l'을 꺼내려면 몇 번 방 인덱스를 써야 할까요?",
      options: ["2", "3"],
      answer: "2",
      feedback: "딩동댕! 0부터 시작하므로 첫 번째 h는 0, 두 번째 e는 1, 세 번째 l은 2가 됩니다! 🔑"
    },
    miniGame: {
      type: "balloon-pop",
      title: "인덱스 매칭 풍선",
      description: "word = 'pydi' 일 때, 첫 글자 'p'를 추출하는 올바른 코드 풍선을 터트리세요!",
      word: "p",
      balloons: ["word[0]", "word[1]", "word[2]"]
    }
  },
  {
    id: 13,
    youtubeId: "Fy2E8WCuOyA",
    planet: "Planet Truth (참과 거짓 행성)",
    title: "참과 거짓! True와 False",
    story: "파이썬 나라의 로봇들은 아주 정직해서 어떤 질문을 받으면 참(**True**) 혹은 거짓(**False**)으로만 대답해요. ⚖️\n\n크기를 비교할 때 크다(`>`), 작다(`<`) 기호를 써서 파이썬에게 질문을 던질 수 있답니다.\n\n10이 5보다 큰지 파이썬에게 질문을 던지고 대답을 들어볼까요?",
    instructions: [
      "print(10 > 5) 를 적어서 실행해보세요.",
      "화면에 파이썬이 진실을 판단해 준 영어 True 가 예쁘게 찍히는지 확인해봐요!",
      "참고로 파이썬에서 True와 False는 첫 글자가 항상 대문자랍니다!"
    ],
    starterCode: "# 10이 5보다 큰지 크다 기호(>)를 사용해 파이썬에게 물어보고 출력(print)해봐요!\n",
    hints: {
      "NameError": "True와 False는 파이썬에서 예약해둔 특수 단어예요. 철자 대소문자를 틀리면 알 수 없는 이름 에러가 나요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("True"),
    quiz: {
      question: "파이썬 기계에게 크기 질문을 던져 그 질문이 사실(맞음)일 때 얻는 대답 단어는 무엇인가요?",
      options: ["True", "False"],
      answer: "True",
      feedback: "정답! 참을 뜻하는 영어 단어인 True를 출력하여 맞다고 응답해 준답니다. ⚖️"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "참과 거짓 리듬 댄스!",
      description: "리듬 판정선 위치에 노드가 정렬될 때, 비교 기식 식에 맞게 [O] 또는 [X] 버튼을 리듬에 맞춰 클릭하세요!",
      beats: [
        { expr: "10 > 5", expect: "O" },
        { expr: "3 > 8", expect: "X" },
        { expr: "5 == 5", expect: "O" }
      ]
    }
  },
  {
    id: 14,
    youtubeId: "RyqGzKsnk20",
    planet: "Planet Logic (논리 결합 행성)",
    title: "그리고와 또는! and와 or",
    story: "여러 개의 참과 거짓 질문들을 풀칠하듯 하나로 엮을 수 있어요! 🧭\n\n- **and(그리고)**: 양쪽 질문이 **모두 참**일 때만 결과가 True가 돼요.\n- **or(또는)**: 양쪽 질문 중 **하나라도 참**이면 결과가 True가 돼요.\n\n`True and False` 의 연산 결과를 출력해 볼까요?",
    instructions: [
      "첫째 줄에 print(True and True) 를 적으세요.",
      "둘째 줄에 print(True and False) 를 적으세요.",
      "and 연산자의 참/거짓 판단 결과를 직접 눈으로 확인해 보세요!"
    ],
    starterCode: "# 1. True and True 를 출력해 보세요.\n# 2. True and False 를 출력해 보세요.\n",
    hints: {
      "NameError": "True 와 False 는 첫 글자를 반드시 대문자로 적어야 해요!"
    },
    validation: (code, stdout) => stdout && stdout.includes("True") && stdout.includes("False") && code.includes("and"),
    quiz: {
      question: "두 조건 중 어느 하나만이라도 만족(참)하면 최종 판단을 참(True)으로 내리는 파이썬 기호 단어는 무엇인가요?",
      options: ["or", "and"],
      answer: "or",
      feedback: "정답! `or`은 둘 중 하나만 만족해도 조건문을 통과할 수 있게 돕는 유연한 도구예요! ⚖️"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "논리 결합 리듬 비트",
      description: "and와 or 조건식의 판단 결과가 참(O)/거짓(X)인지 판정에 맞춰 리듬을 연주하세요!",
      beats: [
        { expr: "True and False == False", expect: "O" },
        { expr: "True or False == False", expect: "X" },
        { expr: "False or False == False", expect: "O" }
      ]
    }
  },
  {
    id: 15,
    youtubeId: "x_2zV6CH7vM",
    planet: "Planet Basket (바구니 행성)",
    title: "보물 모아두기! 리스트(list)",
    story: "마법 상자에는 하나의 값만 담을 수 있었지만, **'리스트 바구니'**를 쓰면 여러 개의 보물을 차곡차곡 모아둘 수 있어요! 🧺\n\n리스트는 납작한 대괄호 **`[ ]`**를 쓰고, 보물들을 쉼표(,)로 나열해요.\n\n`fruits = [\"사과\", \"바나나\", \"체리\"]` 처럼 과일을 잔뜩 담은 fruits 바구니를 만들고 출력해봐요!",
    instructions: [
      "첫 줄에 fruits = [\"사과\", \"바나나\", \"체리\"] 라고 적어 바구니를 만드세요.",
      "다음 줄에 print(fruits) 를 적어 바구니 전체를 출력해보세요!"
    ],
    starterCode: "# 1. fruits 변수에 사과, 바나나, 체리가 든 리스트를 만드세요.\n# 2. fruits 상자를 화면에 출력해 보세요.\n",
    hints: {
      "SyntaxError": "대괄호 [ ] 기호가 바르게 쓰였는지, 쉼표(,) 위치와 따옴표 위치를 확인해 봐요!"
    },
    validation: (code, stdout) => stdout && stdout.includes("사과") && stdout.includes("바나나") && code.includes("fruits"),
    quiz: {
      question: "파이썬에서 여러 항목의 보물 데이터를 한꺼번에 담기 위해 쓰는 바구니(자료 구조)의 이름은 무엇인가요?",
      options: ["리스트(list)", "변수(variable)"],
      answer: "리스트(list)",
      feedback: "정답! 리스트를 이용하면 수십 개, 수백 개의 데이터도 하나의 상자 바구니에 담아 보관할 수 있습니다! 🧺"
    },
    miniGame: {
      type: "code-defense",
      title: "리스트 바구니 디펜스",
      description: "침공 바이러스 데이터 중 대괄호 [ ] 로 묶인 [리스트 자료형]만 골라 대포로 맞춰 물리치세요!",
      enemies: [
        { label: "[1, 2, 3]", type: "string" },
        { label: '"사과"', type: "number" },
        { label: "['A', 'B']", type: "string" },
        { label: "100", type: "number" }
      ]
    }
  },
  {
    id: 16,
    youtubeId: "A6U3zcmb8xU",
    isTheoryOnly: true,
    planet: "Planet Basket Exam (바구니 연습 행성)",
    title: "리스트 기초 연습문제 풀이 📝",
    story: "리스트의 선언법과 기본적인 개념을 제대로 이해했는지 자가 테스트해보는 연습문제 시간이에요.\n\n강의 영상을 보고 아래 퀴즈를 맞춰 완료해보세요!",
    instructions: [
      "우측의 16강 연습문제 설명 영상을 시청하세요.",
      "문제를 잘 복습한 뒤, 퀴즈를 풀어 다음 관문으로 넘어가세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "리스트를 선언할 때 여러 보물들을 감싸고 나열하기 위해 사용하는 괄호 기호는 무엇인가요?",
      options: ["대괄호 [ ]", "중괄호 { }"],
      answer: "대괄호 [ ]",
      feedback: "딩동댕! 대괄호 `[ ]`를 사용하고 항목들을 쉼표(,)로 연결하여 리스트를 정의합니다! 🧺"
    }
  },
  {
    id: 17,
    youtubeId: "Aw5Xoj36w0U",
    planet: "Planet Index (보물 찾기 행성)",
    title: "0번 방의 비밀! 리스트 인덱싱",
    story: "바구니에 담긴 보물들은 방 번호가 매겨져 있어요. 🔑\n\n그런데 컴퓨터 나라는 신기하게 1번 방이 아니라 **0번 방부터** 숫자를 세요!\n\n`fruits = [\"사과\", \"바나나\", \"체리\"]` 가 있으면 첫 번째 과일인 사과는 `fruits[0]` 방에 살고 있어요. 바구니의 0번 방을 열어서 사과를 꺼내볼까요?",
    instructions: [
      "이미 fruits 리스트가 준비되어 있습니다.",
      "print(fruits[0]) 을 적어 첫 번째 과일을 출력해 보세요."
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# 아래에 fruits 리스트에서 첫 번째 원소(인덱스 0)를 출력해 보세요.\n",
    hints: {
      "IndexError": "바구니에 든 물건 수보다 큰 인덱스 번호를 적으면 컴퓨터가 당황해요! 0번을 정확히 적었는지 보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("사과") && code.includes("[0]"),
    quiz: {
      question: "리스트의 세 번째 아이템을 가리키는 방 번호(인덱스) 수치는 무엇일까요?",
      options: ["2", "3"],
      answer: "2",
      feedback: "정답! 0번부터 시작하기 때문에 첫 번째는 0, 두 번째는 1, 세 번째는 2가 된답니다! 🔑"
    },
    miniGame: {
      type: "balloon-pop",
      title: "방 번호 풍선 맞추기",
      description: "리스트 fruits = ['apple', 'banana', 'cherry'] 에서 'banana'를 꺼내기 위한 올바른 코드 풍선을 터트리세요!",
      word: "banana",
      balloons: ["fruits[1]", "fruits[0]", "fruits[2]"]
    }
  },
  {
    id: 18,
    youtubeId: "cbjwdDFOF6c",
    planet: "Planet Append (바구니 채우기 행성)",
    title: "바구니에 새 보물 넣기! append()",
    story: "이미 만들어진 바구니에 새로운 보물을 더 담고 싶을 땐 **.append()** 라는 마법을 써요. 🧺✨\n\n바구니 이름 뒤에 마침표(.)를 찍고 `fruits.append(\"체리\")` 라고 쓰면 바구니 맨 끝에 체리가 쏙 들어가요.\n\n원래 사과와 바나나만 들어있던 바구니에 '체리'를 추가해 볼까요?",
    instructions: [
      "이미 fruits = [\"사과\", \"바나나\"] 상자가 있습니다.",
      "fruits.append(\"체리\") 라고 적어 리스트 뒤에 체리를 추가해 보세요.",
      "마지막 줄에 print(fruits) 를 적어 세 개의 과일이 다 들어갔는지 확인하세요!"
    ],
    starterCode: "fruits = [\"사과\", \"바나나\"]\n# 1. fruits 리스트 맨 뒤에 \"체리\"를 추가(append)해 보세요.\n# 2. fruits 리스트의 전체 내용을 출력(print)해 보세요.\n",
    hints: {
      "AttributeError": "append를 쓸 때 점(.)을 빠뜨리지 않았는지, spelling에 오타가 없는지 보세요."
    },
    validation: (code, stdout) => stdout && stdout.includes("체리") && code.includes("append("),
    quiz: {
      question: "리스트 맨 끝에 새로운 항목을 추가하는 마법의 명령어 이름은 무엇인가요?",
      options: ["append", "add"],
      answer: "append",
      feedback: "정답! 덧붙인다는 뜻의 단어인 `append`를 사용하여 리스트 끝에 아이템을 쏙 추가합니다! 🧺"
    },
    miniGame: {
      type: "balloon-pop",
      title: "추가 마법 스펠링 풍선",
      description: "리스트에 요소를 추가해주는 명령어 'append' 철자 풍선을 순서대로 톡 터트려 보세요!",
      word: "append",
      balloons: ["a", "p", "p", "e", "n", "d"]
    }
  },
  {
    id: 19,
    youtubeId: "-TDVnVE1MTg",
    isTheoryOnly: true,
    planet: "Planet Append Exam (채우기 연습 행성)",
    title: "리스트 심화 연습문제 풀이 🧺",
    story: "리스트를 자유자재로 다루기 위해 필요한 메서드들과 리스트 조작법의 심화 연습문제를 해결하는 시간입니다.\n\n강의 영상을 시청한 뒤 아래 퀴즈에 통과해 보세요!",
    instructions: [
      "우측의 19강 리스트 심화 문제 해설 동영상을 봅니다.",
      "퀴즈를 풀어 마칩니다!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "이미 생성된 리스트 변수 fruits의 길이나 담긴 데이터 총 개수를 알아낼 때 사용하는 내장 함수는 무엇인가요?",
      options: ["len()", "print()"],
      answer: "len()",
      feedback: "정답! `len(리스트)`를 사용하면 리스트의 전체 길이를 알려줍니다. 📐"
    }
  },
  {
    id: 20,
    youtubeId: "UYiWSNT0TV8",
    planet: "Planet Dict (짝꿍 매칭 행성)",
    title: "비밀번호 사전 만들기! 딕셔너리(dict)",
    story: "안녕하세요! 오늘은 짝꿍 단어들이 모여 있는 **'요술 사전(dict)'** 행성에 왔어요. 📖\n\n국어사전을 찾아보면 '단어'와 그 단어의 '뜻풀이'가 붙어있지요?\n\n파이썬 사전에서도 이 단어를 **'키(Key)'**, 뜻풀이를 **'값(Value)'**이라고 불러요.\n\n딕셔너리 요술 사전은 꼬불꼬불 예쁜 **중괄호 `{ }`**로 묶어준답니다!\n\n`profile = {\"이름\": \"지안\", \"나이\": 10}` 상자에서 `\"이름\"` 단어를 부르면, 짝꿍인 `\"지안\"`이 뿅 튀어나오는 신기한 사전을 직접 만들어 볼까요?",
    instructions: [
      "첫 줄에 profile = {\"이름\": \"지안\", \"나이\": 10} 이라고 적어 사전을 만드세요.",
      "다음 줄에 print(profile[\"이름\"]) 을 적어 지안이 이름을 사전에서 꺼내 출력해보세요!",
      "중괄호 `{ }` 와 쉼표(,), 콜론(:)이 알맞게 예쁜 쌍을 이루고 있는지 확인하세요!"
    ],
    starterCode: "# 1. profile 이름표 사전에 {\"이름\": \"지안\", \"나이\": 10} 딕셔너리를 담으세요.\n# 2. 그 아래에 profile[\"이름\"]을 꺼내 출력(print)해 보세요.\n",
    hints: {
      "KeyError": "앗! 혹시 사전에 등록되지 않은 단어 이름을 썼는지 살펴보세요. '이름' 또는 '나이'라고 정확히 적었나요?",
      "SyntaxError": "중괄호 { } 와 따옴표, 콜론(:) 기호가 알맞은 쌍을 이루고 있는지 확인하세요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("지안") && code.includes("profile"),
    quiz: {
      question: "딕셔너리 짝꿍 사전 상자를 만들 때 감싸주는 괄호 기호는 무엇인가요?",
      options: ["중괄호 ( { } )", "대괄호 ( [ ] )"],
      answer: "중괄호 ( { } )",
      feedback: "정답! 리스트는 대괄호 `[ ]`를 쓰고, 딕셔너리는 중괄호 `{ }`를 사용해서 짝꿍 데이터를 표시한답니다! 📖"
    },
    miniGame: {
      type: "code-defense",
      title: "딕셔너리 사전 요격 방어",
      description: "바이러스 데이터 중 중괄호 { } 로 감싸진 [딕셔너리 형식]만 골라 대포로 파괴하세요!",
      enemies: [
        { label: '{"이름": "지안"}', type: "string" },
        { label: '[1, 2, 3]', type: "number" },
        { label: '{"나이": 10}', type: "string" },
        { label: '"파이썬"', type: "number" }
      ]
    }
  },
  {
    id: 21,
    youtubeId: "GEOhLyW5uuo",
    isTheoryOnly: true,
    planet: "Planet Dict Exam (사전 연습 행성)",
    title: "딕셔너리 연습문제 풀이 📖",
    story: "키와 값이 짝궁을 이루는 딕셔너리 사전 자료구조의 핵심 연습문제를 다뤄봅시다!\n\n해설 영상을 시청하고, 퀴즈 관문을 통과하세요.",
    instructions: [
      "우측의 21강 딕셔너리 연습문제 해설을 봅니다.",
      "퀴즈를 맞춰 완료해보세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "딕셔너리 자료형에서 키(Key)와 매치되는 실제 뜻풀이 결과 데이터를 무엇이라고 부를까요?",
      options: ["값 (Value)", "상자 (Box)"],
      answer: "값 (Value)",
      feedback: "정답! 딕셔너리는 항상 '키(Key): 값(Value)'이 1:1로 쌍을 이루어 저장됩니다. 📖"
    }
  },
  {
    id: 22,
    youtubeId: "iVtlLTq3fto",
    planet: "Planet Gate (우주 관문 행성)",
    title: "장애물이 나타났다! if 문",
    story: "만약(if) 우주선 앞에 장애물이 가까이 오면, 경로를 꺾어 피해야 해요! 🚧\n\n조건에 따라 행동을 바꾸는 마법을 바로 **if 문**이라고 불러요.\n\n`if 조건식:` 구문을 적고 그 바로 밑줄은 꼭 키보드 Tab키를 눌러 **'안쪽 방으로 밀어 써야(들여쓰기)'** 해요.\n\n그래야 조건방이 열렸을 때 방 안에 있는 행동(`print`)을 실행해준답니다!",
    instructions: [
      "distance = 3 상자가 준비되어 있습니다.",
      "if distance < 5: 조건문 아랫줄에 들여쓰기(Tab)를 한 뒤 print(\"삐삐!\") 를 채워보세요.",
      "거리가 5보다 작으므로(3), 조건 방이 열려 '삐삐!' 경보음이 성공적으로 인쇄됩니다!"
    ],
    starterCode: "distance = 3\n# 아래에 distance가 5보다 작으면 \"삐삐!\"를 출력하는 if 문을 완성해 보세요!\nif distance < 5:\n    \n",
    hints: {
      "IndentationError": "들여쓰기(줄 맞춤) 에러예요! if 밑에 있는 행동 코드는 꼭 안쪽으로 밀어 적어주세요.",
      "SyntaxError": "if 문 조건 뒤에 마법 관문 기호인 콜론(:)을 빠뜨렸는지 살펴보세요!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("삐삐!") && code.includes("if"),
    quiz: {
      question: "if 문 바로 아랫줄 코드는 어떤 키를 사용해서 수직 시작 위치를 안쪽으로 밀어 정렬해야(들여쓰기) 할까요?",
      options: ["Tab 키", "Enter 키"],
      answer: "Tab 키",
      feedback: "훌륭해요! Tab 키(또는 스페이스바 4번)로 밀어 적어야 'if 조건 방 안의 내용'으로 인정해줘요! 🚧"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "만약에(if) 회피 비트",
      description: "조건식이 참(O)인지 거짓(X)인지 흐르는 판정에 따라 리듬 버튼을 클릭해 관문을 회피하세요!",
      beats: [
        { expr: "distance < 5 (distance = 3 일때)", expect: "O" },
        { expr: "distance > 10 (distance = 3 일때)", expect: "X" },
        { expr: "distance == 3 (distance = 3 일때)", expect: "O" }
      ]
    }
  },
  {
    id: 23,
    youtubeId: "MWhp8_oimKM",
    planet: "Planet Passport (우주 검사소 행성)",
    title: "두 갈래 길! if-else 문",
    story: "만약(if) 에너지가 가득하면 출발하고, 그렇지 않으면(else) 충전을 해야 해요! 🛂\n\n조건이 맞을 때와 안 맞을 때 각각 다른 행동을 하도록 지시하는 것이 **if-else** 마법이에요.\n\n조건이 참이면 첫 번째 if 방이 실행되고, 참이 아니면 아래 else 방이 무조건 작동해요.\n\n에너지 수치가 80일 때 출발 관문을 통과시켜 볼까요?",
    instructions: [
      "조건이 만족되면 \"출발!\"을 인쇄하고,",
      "만족되지 않는 나머지 경우(else:)에 속하면 \"충전 필요\"를 인쇄하도록 코드를 완성해봐요.",
      "else: 뒤에도 꼭 콜론(:)을 적고 그 밑줄에는 들여쓰기를 잊지 마세요!"
    ],
    starterCode: "energy = 80\n# 에너지가 50 이상이면 \"출발!\", 아니면 \"충전 필요\"를 인쇄하는 if-else 구문을 작성하세요.\nif energy >= 50:\n    \nelse:\n    \n",
    hints: {
      "SyntaxError": "else 뒤에 콜론(:)이 없거나, if와 else 단어의 시작 줄 위치가 수직으로 일치하지 않는지 확인해보세요!",
      "IndentationError": "else 밑의 print문도 Tab 키를 눌러 들여쓰기가 되었는지 보세요."
    },
    validation: (code, stdout) => {
      const clean = stdout ? stdout.trim() : "";
      return clean.includes("출발!") && code.includes("else");
    },
    quiz: {
      question: "조건이 충족되지 않는 '나머지 반대 상황'의 행동을 열어주기 위해 사용하는 파이썬 짝꿍 명령어 단어는 무엇인가요?",
      options: ["else", "if"],
      answer: "else",
      feedback: "정답! if 조건이 아닐 때 작동할 방을 else: 기호 아래 들여쓰기로 작성한답니다. 🛂"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "더블 패스포트 리듬 비트",
      description: "energy = 80 일 때 각 조건식이 맞는지 판단하세요!",
      beats: [
        { expr: "energy >= 50", expect: "O" },
        { expr: "energy < 50", expect: "X" },
        { expr: "energy == 80", expect: "O" }
      ]
    }
  },
  {
    id: 24,
    youtubeId: "9oH3IyG6DAI",
    isTheoryOnly: true,
    planet: "Planet Gate Exam (관문 연습 행성)",
    title: "조건문 연습문제 풀이 🚧",
    story: "조건문(`if`, `else`, `elif`)의 복합 구조와 여러 예외를 올바르게 처리해 보는 조건문 종합 연습문제예요.\n\n풀이 영상을 시청한 뒤 퀴즈 관문을 무사히 건너가 보세요!",
    instructions: [
      "24강 조건문 연습문제 설명 동영상을 봅니다.",
      "퀴즈 문제를 풀고 마침표를 찍으세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "if 문 뒤에 조건이 여러 개일 때 '만약 ~가 아니라, 또 다른 조건이라면'의 의미로 사용하는 파이썬 약칭 키워드는 무엇일까요?",
      options: ["elif", "else if"],
      answer: "elif",
      feedback: "딩동댕! 파이썬은 다른 언어의 else if를 줄인 `elif` 키워드를 사용해 여러 조건을 순서대로 검사합니다! ⭐"
    }
  },
  {
    id: 25,
    youtubeId: "s3zytXUNgfo",
    planet: "Planet While (반복 회전 행성)",
    title: "티켓이 있는 동안 타기! while 문",
    story: "회전목마 탈 티켓이 있는 동안(`티켓 > 0`) 계속 뱅글뱅글 도는 마법이 **while 문**이에요! 🎠\n\n조건이 참(True)인 동안에는 멈추지 않고 계속 아래 방 코드를 실행해요.\n\n대신 회전목마를 탈 때마다 티켓을 하나씩 줄여야 해요(`count = count + 1` 등으로 횟수를 세기).\n\n그렇지 않으면 멈추지 않는 감옥에 갇히니 조심해요! count가 3이 될 때까지 돌아볼까요?",
    instructions: [
      "while count <= 3: 의 다음 줄(들여쓰기 공간)에 print(count) 와 count = count + 1 을 차례대로 적으세요.",
      "1, 2, 3이 순서대로 찍히고 반복이 끝나는지 확인하세요!"
    ],
    starterCode: "count = 1\n# 아래에 count가 3 이하인 동안 돌며 숫자를 출력하고, count를 1씩 늘리는 while 문을 완성해 보세요.\nwhile count <= 3:\n    \n",
    hints: {
      "SyntaxError": "while 문 조건 끝에도 관문을 열어주는 콜론(:)이 꼭 붙어야 해요!",
      "IndentationError": "while 아래의 print문과 count = count + 1 식도 들여쓰기(Tab) 줄을 꼭 맞춰주세요."
    },
    validation: (code, stdout) => stdout && stdout.includes("1") && stdout.includes("2") && stdout.includes("3") && code.includes("while"),
    quiz: {
      question: "while 문에서 값을 1씩 늘리는 코드 `count = count + 1`을 적지 않아 조건이 항상 True가 되어 멈추지 않는 현상을 무엇이라 부를까요?",
      options: ["무한 루프(Infinite Loop)", "나누기 에러"],
      answer: "무한 루프(Infinite Loop)",
      feedback: "딩동댕! 조건이 영원히 거짓(False)이 되지 못해 프로그램이 영원히 뱅글뱅글 도는 상황을 무한 루프라고 해요. 탈출 장치를 꼭 만들어야 한답니다! 🌀"
    },
    miniGame: {
      type: "rhythm-beat",
      title: "while 무한 루프 탈출 비트",
      description: "변수 n이 5일 때, 아래 조건이 참(O)인지 거짓(X)인지 구분하여 무한 루프를 멈추는 비트를 쳐 보세요!",
      beats: [
        { expr: "n < 10 (n = 5)", expect: "O" },
        { expr: "n > 10 (n = 5)", expect: "X" },
        { expr: "n == 5 (n = 5)", expect: "O" }
      ]
    }
  },
  {
    id: 26,
    youtubeId: "tSD24uVvwIQ",
    planet: "Planet Break (비상 탈출 행성)",
    title: "어지러워! 멈춰! break 문",
    story: "회전목마를 타고 뱅글뱅글 돌다가 머리가 어지러우면 즉시 멈추고 내려야 해요! 🚨\n\n반복문을 강제로 멈추고 밖으로 탈출하는 비상 멈춤 버튼이 바로 **break** 예요.\n\n무한 루프 `while True` 속에서 돌다가, 숫자가 3이 되는 순간 `break` 버튼을 눌러 탈출해 볼까요?",
    instructions: [
      "if count == 3: 아랫줄(들여쓰기된 공간)에 비상 탈출 명령어인 break 를 적으세요.",
      "숫자가 3까지만 찍히고 프로그램이 멈추는지 확인하세요!"
    ],
    starterCode: "count = 1\nwhile True:\n    print(count)\n    if count == 3:\n        \n    count = count + 1\n",
    hints: {
      "IndentationError": "break 문도 if 문 아래의 행동이므로 Tab 키를 눌러 올바르게 안으로 밀어 넣어야 작동합니다!"
    },
    validation: (code, stdout) => stdout && stdout.includes("3") && !stdout.includes("4") && code.includes("break"),
    quiz: {
      question: "반복문(while, for) 안에서 실행을 멈추고 탈출(Break)하기 위해 사용하는 파이썬 예약어는 무엇인가요?",
      options: ["break", "exit"],
      answer: "break",
      feedback: "정답! 부순다는 뜻의 영어 단어 `break`를 쓰면 루프를 와장창 부수고 탈출한답니다! 💥"
    },
    miniGame: {
      type: "balloon-pop",
      title: "탈출 장치 완성 풍선",
      description: "비상 탈출을 의미하는 단어 'break' 스펠링 풍선을 찾아 순서대로 톡 터트려 보세요!",
      word: "break",
      balloons: ["b", "r", "e", "a", "k"]
    }
  },
  {
    id: 27,
    youtubeId: "X0U-00O2kG0",
    isTheoryOnly: true,
    planet: "Planet Loop Exam (반복 연습 행성)",
    title: "while 반복문 연습문제 풀이 🎠",
    story: "조건이 충족되는 동안 끝없이 동작하는 while 반복문의 코딩 문제 풀이를 학습해 봐요!\n\n동영상을 시청하고 퀴즈 관문을 풀어 통과하세요.",
    instructions: [
      "우측의 27강 while 반복문 해설 동영상을 봅니다.",
      "퀴즈 문제를 풀어 완료해 주세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "while 문을 실행할 때 조건 판단 부분이 항상 참(True)이어서 반복문이 끝나지 않는 상태를 무엇이라고 부르나요?",
      options: ["무한 루프", "순회 반복"],
      answer: "무한 루프",
      feedback: "정답! 탈출 조건이 없거나 조건이 늘 참이면 프로그램이 종료되지 않는 무한 루프 상태에 빠집니다! 🌀"
    }
  },
  {
    id: 28,
    youtubeId: "H0VfBU_ql80",
    planet: "Planet Galaxy (은하수 행성)",
    title: "별 그리기 대작전! for 반복문",
    story: "똑같은 행동을 여러 번 반복해서 그리고 싶을 때는 **for** 반복 톱니 장치 마법을 부려요. 🌀\n\n`for i in range(5):` 라고 적으면 아래 방에 있는 일을 컴퓨터가 정확히 5번 반복해 줘요.\n\n이 톱니바퀴를 돌려 예쁜 별(★)을 5개 연속으로 찍어 예쁜 은하수를 수놓아봐요!",
    instructions: [
      "for i in range(5): 아래 줄에 들여쓰기(Tab)를 하고 print(\"★\") 을 적어주세요.",
      "파이썬 톱니가 5바퀴 돌아가 별을 5번 연속 인쇄하는 마술을 확인해봐요!"
    ],
    starterCode: "# 아래에 for 문을 완성해서 별(★)을 5번 연속 출력해보세요!\nfor i in range(5):\n    \n",
    hints: {
      "IndentationError": "for 문도 if 문처럼 바로 아랫줄은 무조건 들여쓰기(Tab)를 해서 방을 만들어야 해요!",
      "NameError": "for나 range 단어 스펠링을 틀리지 않았는지 눈을 크게 뜨고 살펴보세요!"
    },
    validation: (code, stdout) => {
      const starCount = stdout ? (stdout.match(new RegExp("★", "g")) || []).length : 0;
      return starCount >= 5 && code.includes("for");
    },
    quiz: {
      question: "for i in range(5): 구문을 완성해 실행하면 아래 들여쓰기된 코드는 몇 번 실행될까요?",
      options: ["5번", "10번"],
      answer: "5번",
      feedback: "정답! range 괄호 안의 숫자는 반복 횟수를 통제하는 마법의 제어 수치와도 같아요! 🌀"
    },
    miniGame: {
      type: "balloon-pop",
      title: "반복문 별 풍선 터트리기",
      description: "for 문이 3번 반복되어 예쁜 별 3개(★★★)를 채울 수 있도록, 별 풍선 3개를 톡! 터트려 완성하세요!",
      word: "★★★",
      balloons: ["★", "★", "★"]
    }
  },
  {
    id: 29,
    youtubeId: "eK3hFX9VYCU",
    planet: "Planet Loop List (바구니 훑기 행성)",
    title: "상자 물건 하나씩 열기! for와 리스트",
    story: "바구니에 담긴 장난감들을 하나씩 다 꺼내서 구경하고 싶을 때가 있죠? 🌀🧺\n\n`for fruit in fruits:` 라고 쓰면, fruits 바구니에서 첫 번째 것부터 하나씩 꺼내어 `fruit` 임시 상자에 담아 보여줘요. 바구니에 담긴 과일들을 전부 꺼내서 구경해 볼까요?",
    instructions: [
      "for fruit in fruits: 의 아랫줄 들여쓰기(Tab) 공간에 print(fruit) 를 적으세요.",
      "과일 이름이 사과, 바나나, 체리 순으로 한 줄씩 알아서 연속 인쇄되는 광경을 확인해 보세요!"
    ],
    starterCode: "fruits = [\"사과\", \"바나나\", \"체리\"]\n# fruits 리스트의 모든 아이템들을 하나씩 꺼내 출력하는 반복문을 완성하세요.\nfor fruit in fruits:\n    \n",
    hints: {
      "IndentationError": "for 문 밑의 행동 코드이므로 꼭 Tab 키로 줄을 맞춰 넣었는지 봐요!"
    },
    validation: (code, stdout) => stdout && stdout.includes("사과") && stdout.includes("바나나") && stdout.includes("체리") && code.includes("in"),
    quiz: {
      question: "바구니 fruits에서 꺼낸 각각의 과일 이름이 순서대로 담기는 '임시 보관함' 상자의 이름은 무엇이었나요?",
      options: ["fruit", "fruits"],
      answer: "fruit",
      feedback: "정답! `for 임시상자 in 전체바구니:` 형태로 쓰여서 임시 상자인 `fruit`에 한 놈씩 번갈아 담기게 된답니다! 🌀"
    },
    miniGame: {
      type: "code-defense",
      title: "리스트 순회 연산 대포",
      description: "리스트 [1, 2, 3] 의 값을 2배씩 튀겨 출력하는 `for x in [1, 2, 3]:` 루프에서 x의 값이 맞게 출력된 바이러스만 파괴하세요!",
      enemies: [
        { label: "2", type: "string" },
        { label: "4", type: "string" },
        { label: "6", type: "string" },
        { label: "9", type: "number" }
      ]
    }
  },
  {
    id: 30,
    youtubeId: "ANpK1q77N2k",
    isTheoryOnly: true,
    planet: "Planet Gugu Exam (구구단 연습 행성)",
    title: "for 반복문 구구단 연습문제 🌀",
    story: "for 문을 중첩하여 사용하거나 구구단을 뿜어내는 정밀한 코드를 설계해 보는 연습문제 시간이에요.\n\n영상을 시청하며 반복문의 매력을 더 깊게 느껴 보세요!",
    instructions: [
      "우측의 30강 구구단 출력 해설 동영상을 봅니다.",
      "개념 확인 퀴즈를 맞추어 레벨을 완수하세요!"
    ],
    starterCode: "",
    validation: () => true,
    quiz: {
      question: "파이썬에서 `range(2, 5)`를 호출하여 만들어 내는 반복 숫자의 올바른 범위 나열은 무엇인가요?",
      options: ["2, 3, 4", "2, 3, 4, 5"],
      answer: "2, 3, 4",
      feedback: "정답! 끝값인 5는 포함하지 않고 그 직전인 4까지만 범위를 생성합니다! ⚙️"
    }
  },
  {
    id: 31,
    youtubeId: "arF4y8w838o",
    planet: "Planet Function (마법 주문서 행성)",
    title: "마법 자판기 만들기! 함수(def)",
    story: "매번 같은 코드를 길게 적기 힘들 때, **'마법 주문 버튼(함수)'**을 미리 조립해둘 수 있어요! 🤖\n\n주문을 정의(Define)한다는 뜻에서 **def** 라는 단어를 써서 자판기를 만들어요.\n\n`def hello():` 처럼 적고, 그 아래에 들여쓰기를 한 뒤 실행할 일을 적어두면 끝이에요.\n\n그 다음엔 `hello()` 라고 이름만 부르면 알아서 척척 실행돼요. 나만의 주문을 만들어 볼까요?",
    instructions: [
      "첫 줄에 def hello(): 를 적으세요.",
      "다음 줄에 들여쓰기 후 print(\"안녕!\") 을 적어 함수 내부 행동을 등록하세요.",
      "마지막 줄에는 들여쓰기 없이 hello() 를 적어 마법 주문을 실제로 소리 내어 작동시켜 보세요!"
    ],
    starterCode: "# 1. hello 함수를 선언(def)하고 그 안에서 \"안녕!\"을 인쇄하도록 만드세요.\n# 2. 맨 아랫줄에 hello()를 호출해 함수를 실행시켜 보세요.\n",
    hints: {
      "SyntaxError": "def hello(): 끝에 마법 콜론(:)을 꼭 적어주었는지 보고, 호출할 때 hello() 괄호를 닫았는지 보세요.",
      "IndentationError": "함수 내부에 보관될 명령들은 무조건 들여쓰기(Tab)를 해서 방 안에 넣어주어야 합니다!"
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("안녕!") && code.includes("def hello"),
    quiz: {
      question: "파이썬에서 새로운 나만의 마법 함수(주문)를 정의하여 만들기 시작할 때 적어주는 예약어 단어는 무엇인가요?",
      options: ["def", "function"],
      answer: "def",
      feedback: "훌륭해요! `def`는 'Define(정의하다)'의 약자로, 컴퓨터에게 '이제부터 새로운 명령어를 알려줄게!'라고 선언하는 표식입니다. 📜"
    },
    miniGame: {
      type: "balloon-pop",
      title: "함수 정의 마법 풍선",
      description: "함수를 선언할 때 사용하는 특수 기워드 'def' 스펠링 풍선을 찾아 터트려 주세요!",
      word: "def",
      balloons: ["d", "e", "f"]
    }
  },
  {
    id: 32,
    youtubeId: "YbgAa4DKqr8",
    planet: "Planet Param (매개 변수 행성)",
    title: "믹서기에 딸기 넣기! 매개변수",
    story: "주문 버튼을 누를 때 괄호 안에 재료를 던져줄 수 있어요! 🍓🥤\n\n이 괄호 안의 재료 상자를 **'매개변수'**라고 해요.\n\n요술 믹서기에 바나나를 넣으면 바나나 쥬스가, 딸기를 넣으면 딸기 쥬스가 나오는 원리와 같아요!\n\n`def greeting(name):` 으로 name 상자를 준비하고, `greeting(\"지안\")`을 불러 실행해 볼까요?",
    instructions: [
      "def greeting(name): 아래 줄 빈칸에 print(\"안녕 \" + name) 을 들여쓰기 해서 완성해 보세요.",
      "맨 아래에 greeting(\"지안\") 이 호출되면서 '안녕 지안'이 출력되는지 확인하세요!"
    ],
    starterCode: "def greeting(name):\n    # name 상자를 더해서 인사말을 출력하도록 아래 코드를 완성해보세요.\n    \n\ngreeting(\"지안\")\n",
    hints: {
      "NameError": "greeting 함수 내부에서 name 변수의 스펠링을 바르게 입력했는지 살펴보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("안녕 지안") && code.includes("def greeting"),
    quiz: {
      question: "`def add(a, b):` 라는 함수가 선언되었을 때, 이 함수가 작동하기 위해 받아들이는 전달 재료(매개변수)는 총 몇 개일까요?",
      options: ["2개 (a 와 b)", "1개 (ab)"],
      answer: "2개 (a 와 b)",
      feedback: "정답! 쉼표로 분리되어 `a`와 `b`라는 두 개의 매개변수 상자를 준비한 것이랍니다. 🧪"
    },
    miniGame: {
      type: "code-defense",
      title: "매개변수 재료 공급 디펜스",
      description: "함수 호출문 중 재료(매개변수)의 개수가 올바르게 짝지어진 것만 골라 대포로 요격시키세요!",
      enemies: [
        { label: "greeting('지안')", type: "string" },
        { label: "add(5, 10)", type: "string" },
        { label: "hello()", type: "number" }
      ]
    }
  },
  {
    id: 33,
    youtubeId: "Hs5gIwSdjWY",
    planet: "Planet Scope (비밀과 공용 행성)",
    title: "나만의 비밀 상자! 지역변수와 전역변수",
    story: "안녕하세요! 오늘은 함수 나라의 **'비밀 변수 상자(지역변수)'**와 **'공용 변수 상자(전역변수)'**를 알아볼 거예요! 🕵️\n\n함수 밖에서 만든 전역 상자는 우주선 거실에 둔 상자처럼 언제 어디서든 꺼내어 볼 수 있어요.\n\n하지만 함수 안에서 정의한 상자는 방이 끝나면 사라지는 '지역변수'예요.\n\n`unlocked`라는 전역변수 마법 신호를 만들고, 함수 내에서 전역 마법 신호를 꺼내 호출해볼까요?",
    instructions: [
      "unlocked = True 라고 전역 상자를 만드세요.",
      "def open_gate(): 함수 내부에 print(unlocked)를 들여쓰기하여 전역변수를 출력해 보세요."
    ],
    starterCode: "unlocked = True\ndef open_gate():\n    # 여기에 전역변수 unlocked를 출력하도록 완성해 보세요.\n    \n\nopen_gate()\n",
    hints: {
      "NameError": "unlocked 변수 상자의 글자를 정확하게 적어주었는지 대소문자를 살펴보세요."
    },
    validation: (code, stdout) => stdout && stdout.trim().includes("True") && code.includes("unlocked"),
    quiz: {
      question: "함수 외부 전체 공간에 선언되어 함수 안과 밖 모두에서 꺼내 쓸 수 있는 공용 변수를 무엇이라고 부를까요?",
      options: ["전역변수", "지역변수"],
      answer: "전역변수",
      feedback: "정답! 전체 구역(Global)에서 공용으로 쓰인다고 하여 '전역변수'라고 부른답니다. 🌍"
    },
    miniGame: {
      type: "code-defense",
      title: "지역/전역 백신 대포",
      description: "함수 안에서만 사용되는 '지역 변수' 바이러스만 골라 요격해 방어하세요!",
      enemies: [
        { label: "inside_box", type: "string" },
        { label: "outside_box", type: "number" },
        { label: "local_temp", type: "string" }
      ]
    }
  },
  {
    id: 34,
    youtubeId: "kNUmrq0kvRI",
    planet: "Planet Graduation (우주 졸업식)",
    title: "우주 대탐험 완성! 함수 종합 연습문제 🎓",
    story: "지안 탐험가님! 정말 축하해요! 드디어 마지막 34번째 졸업식장에 도착했어요! 🎓🎉🚀\n\n마지막 수료 시험은 숫자를 넘겨받아 짝수인지 홀수인지 감지해 알려주는 마법 믹서기 함수 **is_even(num)**을 완성하는 것이에요.\n\n만약 입력받은 `num`이 짝수(`num % 2 == 0`)이면 **True**를 돌려주고(return), 그렇지 않으면 **False**를 주인에게 돌려주도록 설계해 봐요!\n\n돌려주는 단어는 **return** 임을 꼭 기억하세요. 수료를 완수하고 졸업 배지를 받아가세요!",
    instructions: [
      "def is_even(num): 함수 안의 첫 번째 if 방에 return True 를 채워 넣으세요.",
      "반대 경우인 else: 방 안에는 return False 를 채워 넣으세요.",
      "들여쓰기 높낮이가 if와 else 구문에 수직으로 맞는지 확인해 보세요!"
    ],
    starterCode: "def is_even(num):\n    # 입력받은 num이 짝수이면 True를 돌려주고, 아니면 False를 돌려주는 함수를 완성하세요.\n    if num % 2 == 0:\n        \n    else:\n        \n\n# 아래 함수 호출 테스트는 지우지 마세요!\nprint(is_even(8))\nprint(is_even(9))\n",
    hints: {
      "IndentationError": "return 문은 if나 else보다 한 단계 더 들어가 들여쓰기(Tab)되어야 합니다! 줄 맞춤을 주의하세요.",
      "SyntaxError": "콜론(:) 기호가 삭제되지 않았는지 살펴보고, return 소문자를 확인하세요!"
    },
    validation: (code, stdout) => stdout && stdout.includes("True") && stdout.includes("False") && code.includes("def is_even") && code.includes("return"),
    quiz: {
      question: "함수가 마법 연산을 마친 뒤, 자신을 불러준 소스 코드 자리로 결과값을 쏙 배달해 주기 위해 사용하는 예약어는 무엇인가요?",
      options: ["return", "print"],
      answer: "return",
      feedback: "정답입니다! return을 사용하면 함수가 계산을 끝낸 후 값을 가지고 호출했던 자리로 돌아갑니다. 수고하셨습니다! 🎉🎓"
    },
    miniGame: {
      type: "balloon-pop",
      title: "결과 반환 스펠링 풍선",
      description: "함수가 끝난 후 결과물을 밖으로 돌려보내는 명령어 'return' 스펠링 풍선을 찾아 터트려 활성화하세요!",
      word: "return",
      balloons: ["r", "e", "t", "u", "r", "n"]
    }
  }
];
