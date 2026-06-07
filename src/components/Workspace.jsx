import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, RefreshCw, Terminal, HelpCircle, BookOpen } from "lucide-react";
import { runPythonCode, initPyodide } from "../utils/pyodideRunner";
import { audioSynth } from "../utils/audioSynth";
import { lessons } from "../data/lessons";

export default function Workspace({ lessonId, completedLessons = [], onBack, onCompleteLesson }) {
  const isSandbox = lessonId === 0;

  const lesson = isSandbox 
    ? {
        id: 0,
        planet: "Infinity Sandbox (무한 자유 연습 행성)",
        title: "자유 코딩 연습실 🚀",
        story: "하고 싶은 파이썬 마법을 마음껏 테스트해보세요! ✨\n\n글자 쓰기, 숫자 계산, 고양이 소환 등 배우고 싶은 어떤 코드도 마음대로 입력해서 결과를 볼 수 있는 지안이만의 낙서장이에요.",
        instructions: [
          "자유롭게 마법 명령을 적고 [주문 외우기]를 눌러 실행해봐요!",
          "예: print('우주 고양이 만세!')",
          "예: print(magic.get_weather())",
          "예: magic.show_cat()"
        ],
        starterCode: "# 지안이의 자유 파이썬 연습장\nprint(\"안녕 지안! 어떤 마법을 부려볼까요?\")\n",
        hints: { default: "지안이가 적고 싶은 글자를 print() 괄호 안에 넣어서 마음껏 출력해 보세요!" }
      }
    : lessons.find((l) => l.id === lessonId);

  // 이론 전용 레슨(코딩 실습이 없는 레슨)인지 여부를 판별합니다.
  const isTheoryOnly = lesson && !!lesson.isTheoryOnly;

  const [code, setCode] = useState(lesson && lesson.starterCode ? lesson.starterCode : "");
  const [stdout, setStdout] = useState("");
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quizSolved, setQuizSolved] = useState(false);
  const [quizError, setQuizError] = useState(false);
  
  // UI & UX States
  const [showHint, setShowHint] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(true); // 첫 진입시 스토리 팝업 기본 노출
  const [hasBeenFocused, setHasBeenFocused] = useState(false); // 처음 터치할 때 커서 이동을 제어하는 상태
  const [showScratchCompareModal, setShowScratchCompareModal] = useState(false); // 스크래치 비교 사전 모달 표시 여부

  // [유튜브 연동 추가] 동영상 튜토리얼 팝업 모달 표시 여부
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const editorRef = useRef(null);

  // Initialize Pyodide
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await initPyodide();
        if (active) setPyodideLoaded(true);
      } catch (err) {
        console.error(err);
        if (active) setError("파이썬 엔진을 로드할 수 없습니다. 인터넷 상태를 확인해 주세요.");
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  // Reset states on lesson change
  useEffect(() => {
    if (lesson) {
      const isTheory = !!lesson.isTheoryOnly;
      setCode(lesson.starterCode || "");
      setStdout("");
      setError(null);
      // 이론 전용 레슨인 경우, 코딩 성공 배너를 즉시 활성화시켜서 퀴즈를 곧바로 풀 수 있도록 설정합니다.
      setIsSuccess(isTheory);
      setQuizSolved(false);
      setQuizError(false);
      setShowHint(false);
      setShowStoryModal(true); // 레슨 이동 시 마다 스토리를 다시 먼저 보여줌
      setHasBeenFocused(false); // 레슨이 바뀔 때 마다 처음 터치 상태를 리셋해요
      setShowScratchCompareModal(false); // 비교 사전 모달 상태도 초기화해요
      setShowYoutubeModal(false); // 유튜브 모달 창도 닫아줘요
    }
  }, [lessonId]);

  // 각 레벨별로 지안이가 현재 배우는 파이썬 주문이 스크래치의 어떤 블록과 1:1로 매핑되는지 보여주는 지도사전이에요!
  const scratchRelationMap = {
    1: { block: "[안녕 파이디! 라고 말하기]", color: "#4c97ff", text: "print(\"안녕 파이디\") 명령어는 스크래치에서 글자를 말하던 형태 블록과 같아요!" },
    2: { block: "[30! 말하기] / [파이디! 말하기]", color: "#4c97ff", text: "print(30)과 print(\"파이디\")는 글자와 숫자를 말해주는 형태 블록과 같아요!" },
    3: { block: "[ (5) + (7) ! 라고 말하기 ]", color: "#59c059", text: "print(5 + 7)은 초록색 더하기 연산 블록을 말하기 안에 끼워 넣은 것과 같아요!" },
    4: { block: "[ (stars) 를 (10) 으로 정하기 ]", color: "#ff8c1a", text: "stars = 10 대입문은 변수 상자를 만들어 10으로 정하는 것과 같아요!" },
    5: { block: "[ (안녕 ) 과 (name) 결합하기 ]", color: "#59c059", text: "print(\"안녕 \" + name)은 글자와 변수 상자를 하나로 이어붙이는 결합 연산 블록과 같아요!" },
    6: { block: "[ (answer) 를 (피자) 로 정하기 ]", color: "#ff8c1a", text: "answer = \"피자\"는 키보드로 입력한 대답을 변수 상자에 쏙 담아두는 것과 같아요!" },
    7: { block: "[ < (10) > (5) > ]", color: "#59c059", text: "print(10 > 5)는 두 수의 크기를 비교해서 참(True)인지 거짓(False)인지 판단하는 비교 블록과 같아요!" },
    8: { block: "[만약 < (distance) < (5) > 이라면]", color: "#ffab19", text: "if distance < 5:는 조건이 참일 때만 안쪽 방에 있는 명령을 수행하는 제어 블록과 같아요!" },
    9: { block: "[만약 < (energy) >= (50) > 이라면 / 아니면]", color: "#ffab19", text: "if-else 문은 조건이 맞을 때와 안 맞을 때 두 갈래 행동으로 나누는 제어 블록과 같아요!" },
    10: { block: "[ (5) 번 반복하기 ]", color: "#ffab19", text: "for i in range(5):는 아래 방의 명령을 정해진 횟수만큼 뱅글뱅글 돌리는 반복 블록과 같아요!" },
    11: { block: "[ (today_weather) 를 ( get_weather ) 로 정하기 ]", color: "#4a90e2", text: "today_weather = magic.get_weather()는 날씨 센서(감지) 블록의 값을 변수에 정해 담는 것과 같아요!" },
    12: { block: "[ magic.show_cat() ]", color: "#9966ff", text: "magic.show_cat()은 화면에 우주 고양이 모양 스프라이트를 소환하여 보이게 하는 형태 블록과 같아요!" },
    13: { block: "[ (5) * (3) ] / [ (10) / (2) ] 연산", color: "#59c059", text: "print(5 * 3)과 print(10 / 2)는 복제 계산을 돕는 곱하기와 나누기 연산 블록과 같아요!" },
    14: { block: "[ (10) 나누기 (3) 의 나머지 ]", color: "#59c059", text: "print(10 % 3)은 나눗셈 계산을 하고 남은 찌꺼기(나머지)만 쏙 구해주는 연산 블록과 같아요!" },
    15: { block: "[ (★) 을 (5) 번 반복해서 결합하기 ]", color: "#59c059", text: "print(\"★\" * 5)는 글자 도장을 곱한 숫자만큼 여러 번 반복해서 찍는 연산 블록과 같아요!" },
    16: { block: "[ < > 가 아니다 ]", color: "#59c059", text: "print(5 != 3)은 서로 같지 않은지(다 다른지) 판단하는 논리 부정(~가 아니다) 블록과 같아요!" },
    17: { block: "[ < > 그리고 < > ]", color: "#59c059", text: "print(True and True)는 왼쪽과 오른쪽 열쇠 구멍에 둘 다 참이어야 문을 여는 [그리고] 블록과 같아요!" },
    18: { block: "[ < > 또는 < > ]", color: "#59c059", text: "print(True or False)는 둘 중 하나만 참이어도 통과시켜 주는 [또는] 블록과 같아요!" },
    19: { block: "[만약 <> 이라면 / 아니면] 중첩", color: "#ffab19", text: "elif score >= 70:은 여러 갈래길 조건들을 차례대로 겹겹이 검사하는 중첩 제어 블록과 같아요!" },
    20: { block: "[ (fruits) 리스트 만들기 ]", color: "#ff6680", text: "fruits = [\"사과\", \"바나나\", \"체리\"]는 보물 장난감을 차곡차곡 모아두는 리스트 바구니 블록과 같아요!" },
    21: { block: "[ (fruits) 의 (1) 번째 항목 ]", color: "#ff6680", text: "fruits[0]은 바구니의 순서 방 값을 가져와요. 파이썬은 0번 방부터 센다는 점만 달라요!" },
    22: { block: "[ (fruits) 의 길이 ]", color: "#ff6680", text: "len(fruits)는 바구니 안에 선물이 총 몇 개 들었는지 자로 재서 개수를 알려주는 블록과 같아요!" },
    23: { block: "[ (사과) 을 (과일) 에 추가하기 ]", color: "#ff6680", text: "fruits.append(\"포도\")는 바구니 맨 뒤에 새 보물을 쏙 집어넣어 크기를 키우는 추가 블록과 같아요!" },
    24: { block: "[ (profile) 의 (이름) 값 가져오기 ]", color: "#ff6680", text: "profile[\"이름\"]은 단어와 뜻풀이 짝꿍이 모인 사전(딕셔너리)에서 값을 찾는 마법이에요!" },
    25: { block: "[ < > 까지 반복하기 ]", color: "#ffab19", text: "while count <= 3:은 티켓이 아직 남아있는 동안 계속 뱅글뱅글 반복하는 제어 블록과 같아요!" },
    26: { block: "[ 이 스크립트 멈추기 ]", color: "#ffab19", text: "break는 뱅글뱅글 돌던 반복 열차에서 조건을 탈출해 강제로 멈추는 탈출 블록과 같아요!" },
    27: { block: "[ (hello) 정의하기 ]", color: "#9966ff", text: "def hello():는 자주 쓰는 명령들을 모아 나만의 마법 블록을 새로 정의하는 것과 같아요!" },
    28: { block: "[ (greeting) 정의하기 (name) ]", color: "#9966ff", text: "def greeting(name):은 나만의 블록에 재료(매개변수) 투입구를 만들어 사용하는 것과 같아요!" },
    29: { block: "[ (자판기) 결과값 내보내기 ]", color: "#9966ff", text: "return a + b는 나만의 블록이 계산을 마치고 결과값(return)을 밖으로 뿅 돌려주는 것과 같아요!" },
    30: { block: "[ 이 스프라이트에서만 사용(지역변수) ]", color: "#ff8c1a", text: "함수 안의 비밀 상자(inside_box)는 그 방에서만 쓰는 스크래치 지역변수 상자 역할과 같아요!" },
    31: { block: "[ 리스트의 모든 항목 훑기 ]", color: "#ffab19", text: "for fruit in fruits:는 바구니 안에 든 모든 장난감을 하나씩 순서대로 전부 꺼내보는 반복문이에요!" },
    32: { block: "[ 종합 연산/제어 졸업 블록 ]", color: "#ffab19", text: "numbers 짝수 찾기 미션은 반복문, 조건문, 나머지 연산 블록을 총출동해 조립하는 최종 졸업 작품이에요!" }
  };

  // 스크래치를 잘하는 지안이를 위해 마련된 파이썬 문법 대조 마법 사전 데이터예요!
  const scratchCompareData = [
    {
      category: "🗣️ 화면에 보여주기 (말하기)",
      scratch: "[안녕! 라고 말하기]",
      scratchColor: "#4c97ff",
      python: "print(\"안녕!\")",
      desc: "화면에 글자나 숫자를 띄워주는 파이썬의 가장 기본 주문이에요. 글자 양쪽에 큰따옴표(\"\")를 꼭 안겨주어야 해요!"
    },
    {
      category: "🧮 수학 계산하기 (연산)",
      scratch: "[ (5) + (3) ]\n[ (5) * (3) ]\n[ (10) 나누기 (3) 의 나머지 ]",
      scratchColor: "#59c059",
      python: "5 + 3\n5 * 3\n10 % 3",
      desc: "수학 계산을 해요. 곱하기는 별표(*), 나누기는 슬래시(/)를 쓰고, 나머지는 퍼센트(%) 기호로 찌꺼기만 구해요!"
    },
    {
      category: "📦 상자에 값 담아두기 (변수)",
      scratch: "[ (점수) 를 (10) 으로 정하기 ]",
      scratchColor: "#ff8c1a",
      python: "score = 10",
      desc: "score라는 이름의 보물 상자를 만들고 그 안에 숫자 10을 담아두는 파이썬의 저장 마법이에요."
    },
    {
      category: "🧭 만약에~ 라면 (조건문)",
      scratch: "[만약 < (점수) > (90) > 이라면]\n  └─ [ A 라고 말하기 ]\n[아니면]\n  └─ [ B 라고 말하기 ]",
      scratchColor: "#ffab19",
      python: "if score > 90:\n    print(\"A\")\nelse:\n    print(\"B\")",
      desc: "조건을 검사해요. 파이썬은 조건 끝에 꼭 쌍점(:)을 적고, 조건에 맞아 실행할 문장은 줄을 맞춰 띄어쓰기(Tab) 해줘요!"
    },
    {
      category: "🌀 뱅글뱅글 반복하기 (반복문)",
      scratch: "[ (5) 번 반복하기 ]\n  └─ [ ★ 라고 말하기 ]",
      scratchColor: "#ffab19",
      python: "for i in range(5):\n    print(\"★\")",
      desc: "같은 행동을 정해진 횟수만큼 반복해요. range(5)는 기계를 5바퀴 뱅글뱅글 돌려 별을 5개 그려냅니다."
    },
    {
      category: "🧺 장난감 바구니 (리스트)",
      scratch: "[ (과일) 리스트 만들기 ]\n[ (과일) 의 (1) 번째 항목 ]",
      scratchColor: "#ff6680",
      python: "fruits = [\"사과\", \"바나나\"]\nfruits[0]",
      desc: "여러 장난감을 바구니에 모아둬요. 파이썬은 특이하게 1번이 아닌 0번 방부터 보물의 숫자를 센답니다! (0번 방의 비밀)"
    },
    {
      category: "🛠️ 나만의 블록 만들기 (함수)",
      scratch: "[ (인사하기) 정의하기 ]\n  └─ [ 안녕! 라고 말하기 ]",
      scratchColor: "#9966ff",
      python: "def greeting():\n    print(\"안녕!\")",
      desc: "def는 '정의하다(define)'에서 왔어요. 나만의 마법 명령어 블록을 새로 만드는 설계도 작성이랍니다."
    }
  ];

  // 지안이가 처음 코드창을 탭(터치)했을 때 주석 뒤쪽으로 커서를 자동으로 보내주는 마법 기능이에요!
  const handleEditorFocus = (e) => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
      const currentCode = e.target.value;
      const lines = currentCode.split("\n");
      let cursorIndex = 0;
      let i = 0;
      
      while (i < lines.length && (lines[i].trim().startsWith("#") || lines[i].trim() === "")) {
        cursorIndex += lines[i].length + 1;
        i++;
      }
      
      const targetPos = Math.min(currentCode.length, cursorIndex);
      const textarea = e.target;
      
      setTimeout(() => {
        textarea.setSelectionRange(targetPos, targetPos);
      }, 10);
    }
  };

  const handleEditorBlur = () => {
    setHasBeenFocused(false);
  };

  // Insert code helper
  const handleInsertCode = (textToInsert, cursorOffset = 0) => {
    audioSynth.playBeep(700, 0.05);
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const newVal = currentVal.substring(0, start) + textToInsert + currentVal.substring(end);
    setCode(newVal);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + textToInsert.length - cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStdout("");
    setError(null);
    audioSynth.playBeep(523.25, 0.08);

    const result = await runPythonCode(
      code,
      (text) => {
        setStdout((prev) => prev + text + "\n");
      }
    );

    setIsRunning(false);

    if (result.success) {
      if (isSandbox) {
        setIsSuccess(false);
        return;
      }

      // Check validation
      const isCorrect = lesson.validation(code, result.stdout);
      if (isCorrect) {
        if (!isSuccess) {
          audioSynth.playWin();
        }
        setIsSuccess(true);
        setError(null);
      } else {
        if (isSuccess) {
          setError(null);
        } else {
          setError("코드가 정상적으로 실행되었지만, 이 행성의 통과 조건을 만족하지 못했어요. 아래 [임무지침]에 나와있는 글자와 똑같이 나오도록 수정해볼까요?");
          audioSynth.playError();
          setIsSuccess(false);
          setQuizSolved(false);
        }
      }
    } else {
      if (isSuccess) {
        setStdout((prev) => prev + "⚠️ 파이디의 마법 에러 알림:\n" + result.error + "\n");
        setError(null);
      } else {
        setError(result.error);
        audioSynth.playError();
        setIsSuccess(false);
        setQuizSolved(false);
      }
    }
  };

  const handleResetCode = () => {
    audioSynth.playBeep(300, 0.1);
    if (window.confirm("코드를 처음 상태로 되돌릴까요?")) {
      setCode(lesson.starterCode);
      setStdout("");
      setError(null);
      setIsSuccess(false);
      setQuizSolved(false);
      setQuizError(false);
    }
  };

  const handleQuizAnswer = (option) => {
    if (option === lesson.quiz.answer) {
      audioSynth.playCoin();
      setQuizSolved(true);
      setQuizError(false);
    } else {
      audioSynth.playError();
      setQuizError(true);
      setTimeout(() => setQuizError(false), 500);
    }
  };

  const getHintText = () => {
    if (lesson && lesson.hints) {
      const hintList = Object.values(lesson.hints);
      if (hintList.length > 0) {
        return hintList.join("\n\n");
      }
    }
    return "글자 양쪽에 꼭 큰따옴표(\"\")가 들어가는지 확인해 봐요!";
  };

  if (!pyodideLoaded) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px"
      }}>
        <div className="animate-float" style={{ fontSize: "6rem" }}>🚀</div>
        <div style={{ fontSize: "2rem", color: "#00f0ff", fontWeight: "900" }} className="neon-text-cyan">
          파이디가 우주선 엔진 시동 거는 중...
        </div>
        <p style={{ color: "#a5b4fc", fontSize: "1.1rem" }}>브라우저 내 파이썬 연구소를 세팅하고 있어요. 잠시만 기다려주세요!</p>
        <div style={{
          width: "240px",
          height: "8px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            height: "100%",
            width: "50%",
            background: "linear-gradient(to right, #00f0ff, #ff007f)",
            borderRadius: "4px",
            animation: "pulse 1.5s infinite ease-in-out"
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", minHeight: "100vh" }}>
      
      {/* 1. 파이디 마법 스토리 설명 팝업 모달 */}
      {showStoryModal && !isSandbox && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.88)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 90
        }}>
          <div className="glass-panel neon-cyan-glow" style={{
            padding: "36px 40px",
            width: "90%",
            maxWidth: "640px",
            maxHeight: "85vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            textAlign: "center",
            borderWidth: "2px",
            borderColor: "rgba(0, 240, 255, 0.45)"
          }}>
            <div style={{ fontSize: "5rem" }} className="animate-float">🤖✨</div>
            
            <div>
              <span style={{ fontSize: "1rem", color: "#bd00ff", fontWeight: "bold" }}>
                LEVEL {lesson.id} • {lesson.planet}
              </span>
              <h2 style={{ fontSize: "2.4rem", color: "white", marginTop: "4px" }}>
                {lesson.title}
              </h2>
            </div>

            <div style={{
              background: "rgba(10, 11, 27, 0.5)",
              padding: "24px",
              borderRadius: "20px",
              border: "1.5px solid rgba(0, 240, 255, 0.15)",
              fontSize: "1.2rem",
              lineHeight: "1.7",
              color: "#e2e8f0",
              textAlign: "left",
              whiteSpace: "pre-wrap"
            }}>
              {lesson.story}
            </div>

            <button
              onClick={() => {
                audioSynth.playBeep(660, 0.08);
                setShowStoryModal(false);
              }}
              className="btn-cosmic btn-cyan animate-pulse-cyan"
              style={{
                padding: "16px 40px",
                fontSize: "1.3rem",
                fontWeight: "900",
                width: "100%",
                borderRadius: "30px",
                boxShadow: "0 0 25px rgba(0, 240, 255, 0.5)"
              }}
            >
              🚀 우주 모험 시작하기!
            </button>
          </div>
        </div>
      )}

      {/* 2. 스크래치 vs 파이썬 1:1 비교 사전 모달 팝업 */}
      {showScratchCompareModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.92)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 95
        }}>
          <div className="glass-panel" style={{
            padding: "36px 40px",
            width: "95%",
            maxWidth: "880px",
            maxHeight: "85vh",
            overflowY: "auto",
            borderWidth: "2.5px",
            borderColor: "rgba(189, 0, 255, 0.45)",
            boxShadow: "0 0 30px rgba(189, 0, 255, 0.25)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "2.4rem" }}>🐱⚡</span>
                <div>
                  <h3 style={{ fontSize: "2rem", color: "#e879f9", margin: 0 }}>지안이의 스크래치 vs 파이썬 마법 사전</h3>
                  <p style={{ color: "#a5b4fc", fontSize: "0.95rem", margin: "2px 0 0 0" }}>스크래치 블록 조립이 파이썬 글자 마법으로 변하는 매핑 규칙이에요!</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  audioSynth.playBeep(600, 0.08);
                  setShowScratchCompareModal(false);
                }}
                className="btn-cosmic btn-outline"
                style={{ padding: "8px 16px", fontSize: "0.95rem", color: "#ffffff", borderColor: "#cbd5e1" }}
              >
                사전 닫기
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "10px" }}>
              {scratchCompareData.map((item, idx) => (
                <div key={idx} style={{
                  background: "rgba(10, 11, 27, 0.6)",
                  border: "1.5px solid rgba(255,255,255,0.06)",
                  borderRadius: "18px",
                  padding: "18px 24px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "20px",
                  alignItems: "center"
                }}>
                  <div>
                    <strong style={{ display: "block", color: "white", fontSize: "1.1rem", marginBottom: "4px" }}>{item.category}</strong>
                    <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: "1.4", margin: 0 }}>{item.desc}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{
                      background: item.scratchColor,
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      fontFamily: "var(--font-ui)",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.25)",
                      borderLeft: "6px solid rgba(0,0,0,0.15)",
                      whiteSpace: "pre-line",
                      lineHeight: "1.4",
                      textAlign: "left",
                      width: "100%",
                      maxWidth: "200px"
                    }}>
                      {item.scratch}
                    </div>
                  </div>

                  <div style={{
                    background: "#050614",
                    border: "1px solid rgba(0,240,255,0.15)",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    fontFamily: "monospace",
                    fontSize: "1.05rem",
                    color: "var(--color-neon-cyan)",
                    boxShadow: "0 0 10px rgba(0,240,255,0.05)",
                    whiteSpace: "pre-line",
                    lineHeight: "1.4"
                  }}>
                    {item.python}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. [유튜브 연동] 유튜브 학습 영상 팝업 모달 */}
      {showYoutubeModal && !isSandbox && lesson.youtubeId && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(6, 7, 20, 0.9)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 96
        }}>
          <div className="glass-panel" style={{
            padding: "30px",
            width: "90%",
            maxWidth: "760px",
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            borderWidth: "2.5px",
            borderColor: "rgba(239, 68, 68, 0.45)",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "2rem" }}>📺🎓</span>
                <h3 style={{ fontSize: "1.8rem", color: "#f87171", margin: 0 }}>파이디의 파이썬 동영상 교실</h3>
              </div>
              <button
                onClick={() => {
                  audioSynth.playBeep(600, 0.08);
                  setShowYoutubeModal(false);
                }}
                className="btn-cosmic btn-outline"
                style={{ padding: "8px 16px", fontSize: "0.95rem", color: "#ffffff", borderColor: "#cbd5e1" }}
              >
                닫기
              </button>
            </div>

            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", alignSelf: "flex-start", margin: "4px 0" }}>
              🤖 <strong>파이디:</strong> "{lesson.title} 마법에 관한 튜토리얼 영상이에요! 영상을 보고 나면 주문을 더 쉽게 완성할 수 있어요."
            </p>

            <div style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "#000000",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={onBack} className="btn-cosmic btn-outline" style={{ padding: "10px 20px", fontSize: "1rem" }}>
            <ArrowLeft size={18} /> 지도 화면으로 돌아가기
          </button>
          
          {/* [유튜브 연동] 비디오 버튼 추가 (이론 전용 레슨이 아닐 때만 노출합니다. 이론 레슨은 본문에 비디오가 바로 표시됩니다.) */}
          {!isSandbox && lesson.youtubeId && !isTheoryOnly && (
            <button
              onClick={() => {
                audioSynth.playBeep(880, 0.08);
                setShowYoutubeModal(true);
              }}
              className="btn-cosmic"
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                borderColor: "#ef4444",
                boxShadow: "0 0 15px rgba(239, 68, 68, 0.45)",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "bold"
              }}
            >
              📺 유튜브 동영상 보기
            </button>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#bd00ff", fontSize: "1rem", fontWeight: "bold" }}>
            {isSandbox ? "FREE SPACE" : `LEVEL ${lesson.id} • ${lesson.planet}`}
          </span>
          <h2 style={{ fontSize: "2.2rem", color: "white", marginTop: "2px" }}>{lesson.title}</h2>
        </div>

        {/* Re-read Story Button */}
        {!isSandbox ? (
          <button 
            onClick={() => {
              audioSynth.playBeep(660, 0.08);
              setShowStoryModal(true);
            }} 
            className="btn-cosmic btn-outline" 
            style={{ padding: "10px 20px", fontSize: "1.05rem", color: "#00f0ff", borderColor: "#00f0ff" }}
          >
            <BookOpen size={18} /> 설명 팝업 다시보기
          </button>
        ) : (
          <div style={{ width: "160px" }} />
        )}
      </header>

      {/* Non-blocking Success Banner at the top of workspace */}
      {isSuccess && (
        <div 
          className="glass-panel neon-cyan-glow animate-pulse-cyan" 
          style={{
            background: "linear-gradient(to right, rgba(0, 240, 255, 0.18), rgba(189, 0, 255, 0.18))",
            borderColor: "rgba(0, 240, 255, 0.5)",
            padding: "20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            borderRadius: "24px"
          }}
        >
          {!quizSolved ? (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.8rem" }}>🤖❓</span>
                <strong style={{ fontSize: "1.3rem", color: "#ffd700" }}>
                  코딩 통과! 미니게임으로 출발하기 전, 파이디의 마법 퀴즈를 맞춰보세요!
                </strong>
              </div>
              
              <p style={{ color: "white", fontSize: "1.15rem", fontWeight: "bold", marginLeft: "38px" }}>
                Q. {lesson.quiz.question}
              </p>

              <div style={{
                display: "flex",
                gap: "16px",
                marginLeft: "38px",
                marginTop: "6px",
                flexWrap: "wrap",
                animation: quizError ? "shake 0.3s" : "none"
              }}>
                {lesson.quiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt)}
                    className="btn-cosmic btn-cyan"
                    style={{
                      padding: "10px 24px",
                      fontSize: "1.1rem",
                      background: "linear-gradient(135deg, #799f0c, #4b5563)",
                      border: "1.5px solid #ffd700"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizError && (
                <span style={{ color: "#ef4444", fontSize: "0.95rem", marginLeft: "38px", fontWeight: "bold" }}>
                  오답이에요! 파이디의 이야기를 천천히 떠올려보고 다시 선택해봐요!
                </span>
              )}
            </div>
          ) : (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "2.5rem" }}>🎉⭐</span>
                <div>
                  <strong style={{ fontSize: "1.4rem", color: "#00f0ff" }}>퀴즈와 미션을 모두 해결했어요! (별 연료 +1 확보)</strong>
                  <p style={{ color: "#e2e8f0", fontSize: "1.1rem", marginTop: "4px", lineHeight: "1.6" }}>
                    🤖 <strong>파이디:</strong> "지안 탐험가님 정말 최고예요! 이제 파이썬 코드 창에서 글자나 숫자를 마음대로 바꾸고 다시 실행해보며 **자유롭게 마법 연습**을 즐겨보세요! 준비가 다 되면 우측의 **미니게임 버튼**을 꾹 눌러 다음 행성으로 출발해봐요! 🚀"
                  </p>
                </div>
              </div>

              <button
                onClick={() => onCompleteLesson(lesson.id)}
                className="btn-cosmic btn-pink animate-pulse-cyan"
                style={{ padding: "16px 36px", fontSize: "1.2rem", fontWeight: "900" }}
              >
                {isTheoryOnly ? "🎖️ 학습 완료하고 대시보드로!" : "🎮 복습 미니게임 하러가기"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Workspace Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", flexGrow: 1, alignItems: "start" }}>
        
        {/* LEFT COLUMN */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Mission Checklist Panel */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", borderColor: "rgba(255, 0, 127, 0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#ff007f", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                🛸 이번 임무 임무지침
              </h3>
              
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  onClick={() => {
                    audioSynth.playBeep(800, 0.05);
                    setShowScratchCompareModal(true);
                  }}
                  className="btn-cosmic btn-outline"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.9rem",
                    height: "auto",
                    borderColor: "#bd00ff",
                    color: "#e879f9",
                    background: "rgba(189, 0, 255, 0.06)"
                  }}
                >
                  🐱 스크래치 사전
                </button>

                <button 
                  onClick={() => {
                    audioSynth.playBeep(900, 0.05);
                    setShowHint(!showHint);
                  }}
                  className={`btn-cosmic btn-outline ${showHint ? "active-hint-btn" : ""}`}
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.9rem",
                    height: "auto",
                    borderColor: showHint ? "#ffd700" : "var(--color-panel-border)",
                    color: showHint ? "#ffd700" : "#ffffff",
                    background: showHint ? "rgba(255, 215, 0, 0.08)" : "none"
                  }}
                >
                  <HelpCircle size={15} /> {showHint ? "힌트 접기" : "힌트 보기"}
                </button>
              </div>
            </div>

            {scratchRelationMap[lesson.id] && (
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1.5px dashed rgba(189, 0, 255, 0.25)",
                padding: "14px 18px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "linear-gradient(90deg, rgba(153, 102, 255, 0.05), rgba(76, 151, 255, 0.05))"
              }}>
                <div style={{
                  background: scratchRelationMap[lesson.id].color,
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  borderLeft: "5px solid rgba(0,0,0,0.15)",
                  whiteSpace: "nowrap"
                }}>
                  {scratchRelationMap[lesson.id].block}
                </div>
                <div style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: "1.4" }}>
                  🤖 <strong>파이디:</strong> "{scratchRelationMap[lesson.id].text}"
                </div>
              </div>
            )}

            <ul style={{ listStyleType: "none", display: "flex", flexDirection: "column", gap: "12px", padding: 0, margin: 0 }}>
              {lesson.instructions.map((inst, idx) => (
                <li 
                  key={idx} 
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    borderLeft: "5px solid #ff007f",
                    fontSize: "1.1rem",
                    lineHeight: "1.55",
                    color: "#f1f5f9"
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "8px", color: "#ff007f" }}>{idx + 1}.</span>
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {showHint && (
            <div className="glass-panel" style={{
              padding: "20px",
              background: "rgba(255, 215, 0, 0.06)",
              borderColor: "rgba(255, 215, 0, 0.45)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.15)",
              borderRadius: "20px",
              animation: "float 4s ease-in-out infinite"
            }}>
              <h4 style={{ color: "#ffd700", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px", fontSize: "1.15rem", margin: 0 }}>
                💡 파이디의 마법 힌트
              </h4>
              <p style={{ fontSize: "1.08rem", color: "#fef08a", lineHeight: "1.6", whiteSpace: "pre-wrap", margin: "8px 0 0 0" }}>
                {getHintText()}
              </p>
            </div>
          )}

          {/* Quick Keyboard Panel (이론 전용 레슨이 아닐 때만 노출합니다.) */}
          {!isTheoryOnly && (() => {
            const quickKeys = [
              { code: "print(\"\")", label: 'print("✍️")', offset: 2, isBasic: true, style: { borderColor: "#00f0ff" } },
              { code: "\"\"", label: '"글자 따옴표"', offset: 1, isBasic: true },
              { code: " + ", label: "+", offset: 0, isBasic: true },
              { code: " - ", label: "-", offset: 0, isBasic: true },
              { code: " = ", label: "= (상자에 담기)", offset: 0, isBasic: true },
              { code: ":", label: ":", offset: 0, isBasic: true },
              { code: "if ", label: "if (만약)", offset: 0, requiredLesson: 8, style: { color: "#ff007f" } },
              { code: "else:\n    ", label: "else (아니면)", offset: 0, requiredLesson: 9, style: { color: "#ff007f" } },
              { code: "for i in range(5):\n    ", label: "for (반복)", offset: 0, requiredLesson: 10, style: { color: "#bd00ff" } },
              { code: "magic.get_weather()", label: "magic.get_weather()", offset: 0, requiredLesson: 11, style: { borderColor: "#ffd700", color: "#ffd700" } },
              { code: "magic.show_cat()", label: "magic.show_cat()", offset: 0, requiredLesson: 12, style: { borderColor: "#ffd700", color: "#ffd700" } },
              { code: "{}", label: "{ } (짝꿍 사전)", offset: 1, requiredLesson: 24, style: { color: "#e879f9", borderColor: "#e879f9" } },
              { code: "def ", label: "def (마법 선언)", offset: 0, requiredLesson: 27, style: { color: "#9966ff" } },
              { code: "return ", label: "return (보답)", offset: 0, requiredLesson: 29, style: { color: "#9966ff" } }
            ];

            const unlockedKeys = quickKeys.filter(
              (key) => key.isBasic || (completedLessons && completedLessons.includes(key.requiredLesson))
            );

            return (
              <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h4 style={{ fontSize: "1.1rem", color: "#a5b4fc", margin: 0, fontWeight: "bold" }}>
                  ⚡ 마법 퀵 키보드 (클릭하면 바로 코드가 적혀요!)
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {unlockedKeys.map((key, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleInsertCode(key.code, key.offset)}
                      className="magic-key-btn"
                      style={{ padding: "8px 14px", fontSize: "1.05rem", ...key.style }}
                    >
                      {key.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* RIGHT COLUMN */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {isTheoryOnly ? (
            /* 이론 전용 레슨일 때는 코딩 에디터 대신 유튜브 동영상을 우측에 크게 바로 임베드하여 시청할 수 있게 띄워줍니다. */
            <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", background: "#0e0f24", borderRadius: "24px", borderColor: "rgba(0, 240, 255, 0.2)" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#00f0ff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                📺 동영상으로 개념 익히기
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "1.1rem", margin: 0, lineHeight: "1.6" }}>
                파이디가 우주 모험에 필요한 마법 영상을 준비했어요. 아래 강의를 차분히 시청해 보세요!
              </p>
              
              {lesson.youtubeId ? (
                <div style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#000000",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(0, 240, 255, 0.2)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div style={{ padding: "60px", textAlign: "center", color: "#6b7280", fontStyle: "italic" }}>
                  이 레슨은 설명 영상이 제공되지 않습니다.
                </div>
              )}
            </div>
          ) : (
            /* 실습 레슨일 때는 기존의 파이썬 코드 창과 콘솔 결과 창을 그대로 띄워 줍니다. */
            <>
              {/* Code Editor Panel */}
              <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", background: "#0e0f24", borderRadius: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "1.6rem", color: "#00f0ff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    💻 지안이의 파이썬 코드 창
                  </h3>
                  <button onClick={handleResetCode} className="btn-cosmic btn-outline" style={{ padding: "6px 14px", fontSize: "0.9rem" }}>
                    <RefreshCw size={14} /> 처음으로 돌리기
                  </button>
                </div>

                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={handleEditorFocus}
                  onBlur={handleEditorBlur}
                  style={{
                    width: "100%",
                    height: "220px",
                    background: "#050614",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    color: "#f1f5f9",
                    fontFamily: "monospace",
                    fontSize: "1.2rem",
                    padding: "20px",
                    resize: "none",
                    outline: "none",
                    lineHeight: "1.6",
                  }}
                  placeholder="# 여기에 코드를 마음대로 적어 테스트해보세요!"
                />

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="btn-cosmic btn-cyan"
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "1.35rem",
                    fontWeight: "900",
                    borderRadius: "50px",
                    boxShadow: isRunning ? "none" : "0 0 20px rgba(0, 240, 255, 0.35)"
                  }}
                >
                  {isRunning ? (
                    <>Pydi가 계산하는 중...</>
                  ) : (
                    <>
                      <Play size={22} fill="white" /> 주문 외우기 (코드 실행)
                    </>
                  )}
                </button>
              </div>

              {/* Real-time Console Terminal */}
              <div className="glass-panel" style={{ flexGrow: 1, minHeight: "230px", display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "24px" }}>
                <div style={{
                  display: "flex",
                  background: "rgba(0,0,0,0.25)",
                  borderBottom: "1.5px solid var(--color-panel-border)",
                  padding: "12px 20px",
                  alignItems: "center",
                  gap: "8px",
                  color: "#00f0ff",
                  fontSize: "1.1rem",
                  fontWeight: "bold"
                }}>
                  <Terminal size={18} /> 콘솔 결과 확인 창 (Console)
                </div>

                <div style={{ padding: "20px", flexGrow: 1, background: "rgba(5, 6, 20, 0.65)", overflowY: "auto" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {stdout && (
                      <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", color: "#10b981", fontSize: "1.25rem", lineHeight: "1.45" }}>
                        {stdout}
                      </div>
                    )}

                    {error && (
                      <div style={{
                        background: "rgba(239, 68, 68, 0.06)",
                        border: "1px solid rgba(239, 68, 68, 0.25)",
                        padding: "14px 18px",
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                      }}>
                        <div style={{ color: "#f87171", fontWeight: "900", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "6px" }}>
                          ⚠️ 파이디의 에러 해결 도우미
                        </div>
                        <div style={{ color: "#fca5a5", fontSize: "1rem", lineHeight: "1.5" }}>
                          {error}
                        </div>
                      </div>
                    )}

                    {!stdout && !error && (
                      <div style={{ color: "#4b5563", fontStyle: "italic", textAlign: "center", marginTop: "40px", fontSize: "1.05rem" }}>
                        코드 창에 마법을 적고 실행하면 결과가 여기에 나타나요! 미션 통과 후에도 마음껏 테스트해 봐요.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

      </div>
    </div>
  );
}
