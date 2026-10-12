import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Play, RefreshCw, Terminal, HelpCircle, BookOpen, ExternalLink, Eye } from "lucide-react";
import { runPythonCode, initPyodide } from "../utils/pyodideRunner";
import { audioSynth } from "../utils/audioSynth";
import { getLesson, getChapter, gradeLesson, quickKeys } from "../data/lessons";

const INDENT = "    ";

const SANDBOX_LESSON = {
  id: 0,
  planet: "무한 자유 연습 행성",
  title: "자유 코딩 연습실 🚀",
  goal: "배운 파이썬 주문을 마음껏 실험해 봐요.",
  keyPoints: [
    "print(magic.get_weather()) : 오늘의 우주 날씨",
    "magic.show_cat() : 우주 고양이 소환",
    "Ctrl + Enter 로 바로 실행할 수 있어요.",
  ],
  instructions: [
    "자유롭게 코드를 적고 [▶ 실행]을 눌러 봐요.",
    "레슨에서 해 본 도전 과제를 여기서 이어서 해도 좋아요!",
  ],
  starterCode: "# 지안이의 자유 파이썬 연습장\nprint(\"안녕 지안! 어떤 마법을 부려볼까요?\")\nprint(magic.get_weather())\n",
};

// 스크래치를 잘하는 지안이를 위한 파이썬 문법 대조 사전
const scratchCompareData = [
  { category: "🗣️ 화면에 보여주기", scratch: "[안녕! 라고 말하기]", color: "#9966ff", python: "print(\"안녕!\")", desc: "글자는 따옴표로 감싸요." },
  { category: "📦 변수", scratch: "[점수 을(를) 10 로 정하기]", color: "#ff8c1a", python: "score = 10", desc: "= 는 오른쪽 값을 왼쪽 상자에 넣어요." },
  { category: "💬 묻고 기다리기", scratch: "[이름이 뭐야? 묻고 기다리기]\n(대답)", color: "#5cb1d6", python: "name = input(\"이름이 뭐야? \")", desc: "입력받은 값은 항상 글자(str)예요." },
  { category: "🧮 계산", scratch: "[(5) + (3)]  [(10) 나누기 (3) 의 나머지]", color: "#59c059", python: "5 + 3\n10 % 3", desc: "곱하기 *, 나누기 /, 나머지 % 를 써요." },
  { category: "🧭 만약 ~ 라면 / 아니면", scratch: "[만약 <점수 > 90> (이)라면]\n  [A 라고 말하기]\n[아니면]\n  [B 라고 말하기]", color: "#ffab19", python: "if score > 90:\n    print(\"A\")\nelse:\n    print(\"B\")", desc: "줄 끝 콜론(:) + 안쪽은 스페이스 4칸 들여쓰기." },
  { category: "🌀 반복하기", scratch: "[(5) 번 반복하기]\n  [★ 라고 말하기]", color: "#ffab19", python: "for i in range(5):\n    print(\"★\")", desc: "range(5)는 0~4, 다섯 번 반복해요." },
  { category: "🧺 리스트", scratch: "[과일 리스트의 (1) 번째 항목]", color: "#ff661a", python: "fruits = [\"사과\", \"바나나\"]\nfruits[0]", desc: "파이썬은 0번부터 세요!" },
  { category: "🛠️ 나만의 블록", scratch: "[정의하기 인사하기]\n  [안녕! 라고 말하기]", color: "#ff6680", python: "def greeting():\n    print(\"안녕!\")", desc: "def 로 만들고 greeting() 으로 불러요." },
];

function VideoPlayer({ youtubeId, title }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={`${title} 강의 영상`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#a5b4fc", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "6px", alignSelf: "flex-end" }}
      >
        <ExternalLink size={15} /> 영상이 안 나오면 유튜브에서 열기
      </a>
    </div>
  );
}

function QuizPanel({ quizzes, onSolved }) {
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState(null);
  const [feedback, setFeedback] = useState("");
  const quiz = quizzes[step];

  const handleAnswer = (option) => {
    if (feedback) return;
    if (option === quiz.answer) {
      audioSynth.playCoin();
      setWrong(null);
      setFeedback(quiz.feedback);
    } else {
      audioSynth.playError();
      setWrong(option);
    }
  };

  const handleNext = () => {
    audioSynth.playBeep(660, 0.06);
    setFeedback("");
    if (step + 1 >= quizzes.length) onSolved();
    else setStep(step + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "1.6rem" }}>🤖❓</span>
        <strong style={{ fontSize: "1.25rem", color: "#ffd700" }}>파이디의 개념 퀴즈</strong>
        <span className="pill">{step + 1} / {quizzes.length}</span>
      </div>
      <p style={{ color: "white", fontSize: "1.15rem", fontWeight: "bold" }}>Q. {quiz.question}</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", animation: wrong ? "shake 0.3s" : "none" }} key={wrong || "q"}>
        {quiz.options.map((opt) => {
          const isAnswer = feedback && opt === quiz.answer;
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="btn-cosmic quiz-option"
              style={{
                borderColor: isAnswer ? "#10b981" : wrong === opt ? "#ef4444" : "#ffd700",
                background: isAnswer ? "rgba(16,185,129,0.35)" : wrong === opt ? "rgba(239,68,68,0.25)" : "rgba(255,215,0,0.08)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {wrong && !feedback && (
        <span style={{ color: "#fca5a5", fontWeight: "bold" }}>아쉬워요! 핵심 정리를 다시 읽고 다른 답을 골라 봐요.</span>
      )}
      {feedback && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <span style={{ color: "#6ee7b7", fontSize: "1.1rem", fontWeight: "bold" }}>{feedback}</span>
          <button onClick={handleNext} className="btn-cosmic btn-cyan" style={{ padding: "8px 22px" }}>
            {step + 1 >= quizzes.length ? "퀴즈 완료!" : "다음 문제 →"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Workspace({ lessonId, maxUnlockedLesson = 1, isCompleted = false, onBack, onCompleteLesson }) {
  const isSandbox = lessonId === 0;
  const lesson = isSandbox ? SANDBOX_LESSON : getLesson(lessonId);
  const chapter = lesson && !isSandbox ? getChapter(lesson.chapter) : null;
  const isTheoryOnly = !!lesson?.isTheoryOnly;

  const [code, setCode] = useState(lesson?.starterCode || "");
  const [stdout, setStdout] = useState("");
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState(isTheoryOnly ? "skipped" : "loading"); // loading | ready | failed | skipped
  const [codePassed, setCodePassed] = useState(isTheoryOnly);
  const [quizSolved, setQuizSolved] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(!isSandbox);
  const [showScratchModal, setShowScratchModal] = useState(false);
  const [showVideo, setShowVideo] = useState(isTheoryOnly);
  const [loadAttempt, setLoadAttempt] = useState(0);

  const editorRef = useRef(null);
  const focusedOnce = useRef(false);

  useEffect(() => {
    if (isTheoryOnly) return undefined;
    let active = true;
    initPyodide()
      .then(() => active && setPyodideStatus("ready"))
      .catch((err) => {
        console.error(err);
        if (active) setPyodideStatus("failed");
      });
    return () => {
      active = false;
    };
  }, [isTheoryOnly, loadAttempt]);

  if (!lesson) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>레슨을 찾을 수 없어요.</p>
        <button onClick={onBack} className="btn-cosmic btn-outline">지도로 돌아가기</button>
      </div>
    );
  }

  // textarea 에 직접 글자를 넣고(커서도 즉시 이동) 그 값을 상태에 반영합니다.
  // 상태를 먼저 바꾸면 빠르게 타이핑할 때 커서가 뒤엉키기 때문이에요.
  const replaceRange = (textarea, text, start, end, cursor) => {
    textarea.setRangeText(text, start, end, "end");
    if (cursor !== undefined) textarea.setSelectionRange(cursor, cursor);
    setCode(textarea.value);
  };

  // 처음 코드 창을 누르면 코드를 채워 넣을 자리로 커서를 옮겨 줍니다.
  // (들여 쓴 빈 칸이 있으면 그곳, 없으면 맨 끝)
  const handleEditorFocus = (e) => {
    if (focusedOnce.current) return;
    focusedOnce.current = true;
    const textarea = e.target;
    const value = textarea.value;
    const blank = value.match(/\n( {4,})(?=\n)/);
    const target = blank ? blank.index + blank[0].length : value.length;
    setTimeout(() => textarea.setSelectionRange(target, target), 0);
  };

  const handleEditorKeyDown = (e) => {
    const textarea = e.target;
    const { selectionStart: start, selectionEnd: end, value } = textarea;

    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunCode();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      if (e.shiftKey) {
        const removable = value.slice(lineStart, lineStart + 4).match(/^ */)[0].length;
        if (removable > 0) replaceRange(textarea, "", lineStart, lineStart + removable, Math.max(lineStart, start - removable));
      } else {
        replaceRange(textarea, INDENT, start, end);
      }
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLine = value.slice(lineStart, start);
      let indent = currentLine.match(/^ */)[0];
      if (currentLine.replace(/#.*$/, "").trimEnd().endsWith(":")) indent += INDENT;
      replaceRange(textarea, "\n" + indent, start, end);
    }
  };

  const handleInsertCode = (text, cursorOffset) => {
    audioSynth.playBeep(700, 0.05);
    const textarea = editorRef.current;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end } = textarea;
    textarea.focus();
    replaceRange(textarea, text, start, end, start + text.length - cursorOffset);
  };

  const handleRunCode = async () => {
    if (isRunning || pyodideStatus !== "ready") return;
    setIsRunning(true);
    setStdout("");
    setError(null);
    audioSynth.playBeep(523.25, 0.08);

    const result = await runPythonCode(code, {
      readInput: (promptText) => window.prompt(promptText.trim() || "파이디가 입력을 기다려요. 값을 적어 주세요!", ""),
    });

    setIsRunning(false);
    setStdout(result.stdout);

    if (!result.success) {
      setError(result.error);
      if (!codePassed) {
        audioSynth.playError();
        setFailCount((n) => n + 1);
      }
      return;
    }

    if (isSandbox || codePassed) return;

    const grade = gradeLesson(lesson, code, result.stdout);
    if (grade.passed) {
      audioSynth.playWin();
      setCodePassed(true);
    } else {
      audioSynth.playError();
      setError(`코드는 실행됐지만 아직 임무를 다 못 했어요. ${grade.message}`);
      setFailCount((n) => n + 1);
    }
  };

  const handleResetCode = () => {
    audioSynth.playBeep(300, 0.1);
    if (window.confirm("코드를 처음 상태로 되돌릴까요?")) {
      setCode(lesson.starterCode);
      setStdout("");
      setError(null);
    }
  };

  const handleCopySolution = () => {
    if (window.confirm("모범 답안으로 코드 창을 바꿀까요? 직접 적어 보는 게 가장 좋은 연습이에요!")) {
      setCode(lesson.solution);
    }
  };

  const visibleKeys = quickKeys.filter((k) => k.unlockAt <= (isSandbox ? maxUnlockedLesson : lesson.id));
  const hints = lesson.hints || [];

  if (!isTheoryOnly && pyodideStatus !== "ready") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "20px", textAlign: "center" }}>
        <div className="animate-float" style={{ fontSize: "6rem" }}>{pyodideStatus === "failed" ? "🛰️" : "🚀"}</div>
        {pyodideStatus === "failed" ? (
          <>
            <div style={{ fontSize: "1.8rem", color: "#f87171", fontWeight: "900" }}>파이썬 엔진을 불러오지 못했어요</div>
            <p style={{ color: "#a5b4fc" }}>인터넷 연결을 확인한 뒤 다시 시도해 주세요.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={onBack} className="btn-cosmic btn-outline">지도로 돌아가기</button>
              <button onClick={() => { setPyodideStatus("loading"); setLoadAttempt((n) => n + 1); }} className="btn-cosmic btn-cyan">다시 시도</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "2rem", color: "#00f0ff", fontWeight: "900" }} className="neon-text-cyan">파이디가 우주선 엔진 시동 거는 중...</div>
            <p style={{ color: "#a5b4fc", fontSize: "1.1rem" }}>처음에는 파이썬을 내려받느라 조금 걸려요. 잠시만 기다려 주세요!</p>
            <div className="loading-bar"><div /></div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="workspace">
      {/* 스토리 팝업 */}
      {showStoryModal && (
        <div className="modal-backdrop">
          <div className="glass-panel neon-cyan-glow modal-card" style={{ maxWidth: "640px", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4.5rem" }} className="animate-float">{lesson.emoji || "🤖"}</div>
            <div>
              <span style={{ color: "#bd00ff", fontWeight: "bold" }}>
                {chapter ? `${chapter.id}단원 ${chapter.title} · ` : ""}{lesson.id}강 · {lesson.planet}
              </span>
              <h2 style={{ fontSize: "2.4rem", color: "white", marginTop: "4px" }}>{lesson.title}</h2>
            </div>
            <div className="goal-box">🎯 <strong>오늘의 목표</strong> · {lesson.goal}</div>
            <div className="story-box">{lesson.story}</div>
            <button
              onClick={() => { audioSynth.playBeep(660, 0.08); setShowStoryModal(false); }}
              className="btn-cosmic btn-cyan"
              style={{ padding: "16px 40px", fontSize: "1.3rem", width: "100%" }}
            >
              🚀 모험 시작하기!
            </button>
          </div>
        </div>
      )}

      {/* 스크래치 vs 파이썬 사전 */}
      {showScratchModal && (
        <div className="modal-backdrop" onClick={() => setShowScratchModal(false)}>
          <div className="glass-panel modal-card" style={{ maxWidth: "880px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "2rem", color: "#e879f9" }}>🐱 스크래치 vs 파이썬 사전</h3>
              <button onClick={() => setShowScratchModal(false)} className="btn-cosmic btn-outline">사전 닫기</button>
            </div>
            {scratchCompareData.map((item) => (
              <div key={item.category} className="compare-row">
                <div>
                  <strong style={{ display: "block", color: "white", fontSize: "1.1rem" }}>{item.category}</strong>
                  <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{item.desc}</p>
                </div>
                <div className="scratch-block" style={{ background: item.color }}>{item.scratch}</div>
                <pre className="code-chip">{item.python}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 헤더 */}
      <header className="workspace-header">
        <button onClick={onBack} className="btn-cosmic btn-outline">
          <ArrowLeft size={18} /> 지도로
        </button>
        <div style={{ textAlign: "center", flex: 1, minWidth: "220px" }}>
          <span style={{ color: "#bd00ff", fontWeight: "bold" }}>
            {isSandbox ? "FREE SPACE" : `${chapter ? `${chapter.id}단원 · ` : ""}${lesson.id}강 · ${lesson.planet}`}
          </span>
          <h2 style={{ fontSize: "2.1rem", color: "white" }}>{lesson.title}</h2>
        </div>
        {!isSandbox && (
          <button onClick={() => { audioSynth.playBeep(660, 0.08); setShowStoryModal(true); }} className="btn-cosmic btn-outline" style={{ color: "#00f0ff", borderColor: "#00f0ff" }}>
            <BookOpen size={18} /> 설명 다시보기
          </button>
        )}
      </header>

      {/* 퀴즈 / 완료 배너 */}
      {!isSandbox && codePassed && (
        <div className="glass-panel neon-cyan-glow result-banner">
          {!isTheoryOnly && !quizSolved && (
            <div style={{ color: "#6ee7b7", fontWeight: "bold", fontSize: "1.1rem" }}>🎉 코드 임무 성공! 이제 퀴즈를 풀면 레슨 완료예요.</div>
          )}
          {!quizSolved ? (
            <QuizPanel quizzes={lesson.quizzes} onSolved={() => { audioSynth.playWin(); setQuizSolved(true); }} />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "2.5rem" }}>🎉⭐</span>
                <div>
                  <strong style={{ fontSize: "1.4rem", color: "#00f0ff" }}>
                    {isCompleted ? "복습 완료! 정말 잘했어요." : "레슨 완료! 별 연료 +1, 다음 행성이 열렸어요!"}
                  </strong>
                  {lesson.challenge && (
                    <p style={{ color: "#e2e8f0", marginTop: "4px", lineHeight: "1.6" }}>
                      💪 <strong>도전 과제(선택):</strong> {lesson.challenge}
                    </p>
                  )}
                </div>
              </div>
              <button onClick={() => onCompleteLesson(lesson.id)} className="btn-cosmic btn-pink animate-pulse-cyan" style={{ padding: "14px 30px", fontSize: "1.15rem" }}>
                {lesson.miniGame ? "🎮 복습 미니게임 하러 가기" : "🎖️ 배지 받고 지도로"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="workspace-grid">
        {/* 왼쪽: 목표 · 핵심 정리 · 임무 · 영상 */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: 0 }}>
          <div className="glass-panel panel" style={{ borderColor: "rgba(255, 0, 127, 0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#ff007f" }}>🛸 이번 임무</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {!isTheoryOnly && (
                  <button onClick={() => { audioSynth.playBeep(800, 0.05); setShowScratchModal(true); }} className="btn-cosmic btn-outline btn-small" style={{ borderColor: "#bd00ff", color: "#e879f9" }}>
                    🐱 스크래치 사전
                  </button>
                )}
                {hints.length > 0 && (
                  <button onClick={() => { audioSynth.playBeep(900, 0.05); setShowHint(!showHint); }} className="btn-cosmic btn-outline btn-small" style={{ borderColor: showHint ? "#ffd700" : undefined, color: showHint ? "#ffd700" : undefined }}>
                    <HelpCircle size={15} /> {showHint ? "힌트 접기" : "힌트 보기"}
                  </button>
                )}
              </div>
            </div>

            {!isSandbox && <div className="goal-box">🎯 <strong>목표</strong> · {lesson.goal}</div>}

            {lesson.scratch && (
              <div className="scratch-relation">
                <div className="scratch-block" style={{ background: lesson.scratch.color }}>{lesson.scratch.block}</div>
                <div style={{ fontSize: "0.95rem", color: "#cbd5e1", lineHeight: "1.5" }}>🤖 {lesson.scratch.text}</div>
              </div>
            )}

            <ol className="mission-list">
              {lesson.instructions.map((inst, idx) => (
                <li key={idx}><span>{idx + 1}</span>{inst}</li>
              ))}
            </ol>

            {showHint && (
              <div className="hint-box">
                <strong>💡 파이디의 힌트</strong>
                <ul>{hints.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
            )}
          </div>

          {lesson.keyPoints && (
            <div className="glass-panel panel">
              <h4 style={{ fontSize: "1.2rem", color: "#ffd700" }}>📌 핵심 정리</h4>
              <ul className="key-points">
                {lesson.keyPoints.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          )}

          {!isSandbox && !isTheoryOnly && lesson.youtubeId && (
            <div className="glass-panel panel">
              <button
                onClick={() => { audioSynth.playBeep(880, 0.06); setShowVideo(!showVideo); }}
                className="btn-cosmic"
                style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "white", alignSelf: "flex-start" }}
              >
                📺 {lesson.id}강 강의 영상 {showVideo ? "접기" : "보기"}
              </button>
              {showVideo && <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} />}
            </div>
          )}

          {!isTheoryOnly && visibleKeys.length > 0 && (
            <div className="glass-panel panel">
              <h4 style={{ fontSize: "1.05rem", color: "#a5b4fc" }}>⚡ 퀵 키보드 (누르면 커서 위치에 코드가 들어가요)</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {visibleKeys.map((key) => (
                  <button key={key.label} onClick={() => handleInsertCode(key.code, key.offset)} className="magic-key-btn">
                    {key.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 오른쪽: 영상(이론) 또는 코드 창 + 결과 창 */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: 0 }}>
          {isTheoryOnly ? (
            <div className="glass-panel panel" style={{ background: "#0e0f24" }}>
              <h3 style={{ fontSize: "1.6rem", color: "#00f0ff" }}>📺 {lesson.id}강 강의 영상</h3>
              <p style={{ color: "#cbd5e1" }}>영상을 보고 나서 위의 퀴즈를 풀어 보세요!</p>
              <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} />
            </div>
          ) : (
            <>
              <div className="glass-panel panel" style={{ background: "#0e0f24" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1.6rem", color: "#00f0ff" }}>💻 코드 창</h3>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {!isSandbox && lesson.solution && (failCount >= 3 || codePassed) && (
                      <button onClick={() => setShowSolution(!showSolution)} className="btn-cosmic btn-outline btn-small" style={{ color: "#fcd34d", borderColor: "#fcd34d" }}>
                        <Eye size={14} /> {showSolution ? "답안 접기" : "모범 답안"}
                      </button>
                    )}
                    <button onClick={handleResetCode} className="btn-cosmic btn-outline btn-small">
                      <RefreshCw size={14} /> 처음으로
                    </button>
                  </div>
                </div>

                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={handleEditorFocus}
                  onKeyDown={handleEditorKeyDown}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  className="code-editor"
                  aria-label="파이썬 코드 입력 창"
                />
                <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>Tab = 들여쓰기 4칸 · Shift+Tab = 내어쓰기 · Ctrl+Enter = 실행</p>

                <button onClick={handleRunCode} disabled={isRunning} className="btn-cosmic btn-cyan" style={{ width: "100%", padding: "16px", fontSize: "1.35rem" }}>
                  {isRunning ? "파이디가 계산하는 중..." : (<><Play size={22} fill="white" /> 실행 (주문 외우기)</>)}
                </button>

                {showSolution && (
                  <div className="hint-box">
                    <strong>📗 모범 답안</strong>
                    <pre className="code-chip" style={{ marginTop: "8px" }}>{lesson.solution}</pre>
                    {!codePassed && (
                      <button onClick={handleCopySolution} className="btn-cosmic btn-outline btn-small" style={{ marginTop: "8px" }}>코드 창에 넣기</button>
                    )}
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ minHeight: "230px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div className="console-header"><Terminal size={18} /> 결과 창 (Console)</div>
                <div style={{ padding: "20px", flexGrow: 1, background: "rgba(5, 6, 20, 0.65)", overflowY: "auto", maxHeight: "420px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {stdout && <pre className="console-output">{stdout}</pre>}
                  {error && (
                    <div className="error-box">
                      <strong>⚠️ 파이디의 도움말</strong>
                      <div>{error}</div>
                      {!isSandbox && failCount >= 3 && !codePassed && !showSolution && (
                        <div style={{ color: "#fcd34d", marginTop: "4px" }}>여러 번 막혔나요? 힌트를 보거나 오른쪽 위 [모범 답안]을 참고해 봐요.</div>
                      )}
                    </div>
                  )}
                  {!stdout && !error && (
                    <div style={{ color: "#4b5563", fontStyle: "italic", textAlign: "center", marginTop: "40px" }}>
                      코드를 적고 실행하면 결과가 여기에 나타나요!
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
